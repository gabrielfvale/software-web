const { pool } = require("../services/db");
const {
  getPages,
  getPagesFromCount,
  paginateQuery,
} = require("../util/paginate");
const { errorHandler } = require("../util/error");

async function details(req, res) {
  try {
    const { params } = req;
    const user_id = req.user?.user_id || -1;

    const { rows } = await pool.query(
      `SELECT lists.*, users.username
      FROM lists LEFT JOIN users ON lists.user_id = users.user_id
      WHERE list_id=$1`,
      [params.id]
    );

    // List not found
    if (rows.length !== 1) {
      res.status(404).json({ error: "List not found" });
      return;
    }

    const list = rows[0];

    // If a list is private, check if it belongs to user
    if (
      list.list_type === "private" &&
      String(list.user_id) !== String(user_id)
    ) {
      return res.status(403).end();
    }

    const { rows: movies } = await pool.query(
      `SELECT movie_api_id FROM movies_list
      WHERE list_id=$1`,
      [params.id]
    );
    list.movies = movies.map((movie) => Number(movie.movie_api_id));

    res.status(200).json(list);
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function popular(req, res) {
  try {
    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    const { rows: count } = await pool.query(
      `
      SELECT COUNT(*) FROM (SELECT lists.*, COUNT(like_list.list_id) AS likes
      FROM lists LEFT JOIN like_list ON lists.list_id = like_list.list_id
      WHERE list_type='public'
      GROUP BY lists.list_id
      HAVING COUNT(like_list.list_id) > 0) AS count
      `
    );
    const total_results = Number(count[0].count);
    const total_pages = getPagesFromCount(total_results, per_page);

    // Get lists
    const { rows } = await pool.query(
      paginateQuery(
        `
        SELECT lists.*, COUNT(like_list.list_id) AS likes
        FROM lists LEFT JOIN like_list ON lists.list_id = like_list.list_id
        WHERE list_type='public'
        GROUP BY lists.list_id
        HAVING COUNT(like_list.list_id) > 0
        `,
        page,
        per_page
      )
    );

    // Get movies for each list
    const results = [];
    for (list of rows) {
      const { rows: movies } = await pool.query(
        `
        SELECT movie_api_id
        FROM movies_list
        WHERE list_id=$1
        `,
        [list.list_id]
      );

      results.push({
        ...list,
        movies: movies.map((movie) => Number(movie.movie_api_id)),
      });
    }

    res.status(200).json({
      page,
      total_pages,
      total_results,
      results,
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function curated(req, res) {
  try {
    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    const { total_results, total_pages } = await getPages(
      "lists",
      "list_type",
      "admin",
      per_page
    );

    if (page > total_pages) {
      return res.status(400).json({ error: "Page exceeds limit" });
    }

    const { rows } = await pool.query(
      paginateQuery(
        `SELECT * FROM lists 
        WHERE list_type = 'admin'`,
        page,
        per_page
      )
    );
    res.status(200).json({ page, total_pages, total_results, results: rows });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function user(req, res) {
  try {
    const { username } = req.params;
    const user_id = req.user?.user_id || -1;

    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    const { rows } = await pool.query(
      `SELECT user_id FROM users
      WHERE username = $1`,
      [username]
    );

    if (rows.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const { total_results, total_pages } = await getPages(
      "lists",
      "user_id",
      rows[0].user_id,
      per_page
    );

    // If the user is logged in, display all lists.
    // If not, display only public lists.
    const { rows: userLists } = await pool.query(
      paginateQuery(
        `SELECT * FROM lists WHERE user_id = $1 AND list_type ${
          rows[0].user_id === user_id
            ? `NOT IN ('watch', 'favorites')`
            : `= 'public'`
        }`,
        page,
        per_page
      ),
      [rows[0].user_id]
    );

    // Get user "special" lists: favorites and watch list
    const { rows: specialLists } = await pool.query(
      `
      SELECT * FROM lists WHERE user_id = $1
      AND (list_type = 'watch' OR list_type = 'favorites')
      `,
      [rows[0].user_id]
    );

    // Fetch movies for each list type
    const lists = { special: [], results: [] };

    for (const listType in lists) {
      // Choose which array to go over
      const iterList = listType === "special" ? specialLists : userLists;

      // Fetch movies
      for (list of iterList) {
        const { rows: movies } = await pool.query(
          `SELECT movie_api_id FROM movies_list
          WHERE list_id=$1`,
          [list.list_id]
        );
        // Push movies to list array
        delete list.user_id;
        lists[listType].push({
          ...list,
          movies: movies.map((movie) => Number(movie.movie_api_id)),
        });
      }
    }

    res.status(200).json({ page, total_pages, total_results, ...lists });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function create(req, res) {
  try {
    const { name, description, movies } = req.body;
    let { list_type } = req.body;
    const { user_id } = req.user;

    const { rows: userRows } = await pool.query(
      `SELECT admin FROM users
      WHERE user_id = $1`,
      [user_id]
    );

    // Gets returned user admin privileges
    const { admin } = userRows[0];

    if (!admin && list_type === "admin") {
      return res
        .status(400)
        .json({ error: "User does not have admin privileges" });
    }
    if (admin) {
      list_type = "admin";
    }

    // Inserts list
    const { rows, rowCount } = await pool.query(
      `INSERT INTO lists (user_id, name, description, list_type)
      VALUES ($1, $2, $3, $4)
      RETURNING list_id`,
      [user_id, name, description, list_type]
    );

    // Gets returned list_id from insert
    const { list_id } = rows[0];

    // Bulk insert movies in auxiliary table
    const { rows: insertedMovieList } = await pool.query(
      `INSERT INTO movies_list (list_id, movie_api_id)
      VALUES
      ${movies.map((movie_id) => `(${list_id}, ${movie_id})`).join(",")}
      RETURNING movie_api_id`
    );

    if (rowCount == 1 && insertedMovieList.length == movies.length) {
      res.status(201).json({ list_id });
    } else {
      throw Error("Unexpected");
    }
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function addMovie(req, res) {
  try {
    const { list_id, movie_api_id } = req.body;
    const { user_id } = req.user;

    const { rows: exists } = await pool.query(
      `
       SELECT name FROM lists WHERE list_id = $1 AND user_id=$2
       `,
      [list_id, user_id]
    );

    if (exists.length === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    await pool.query(
      `
      INSERT INTO movies_list (list_id, movie_api_id) 
      VALUES ($1,$2)
      `,
      [list_id, movie_api_id]
    );

    return res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function addSpecial(req, res) {
  try {
    const { list_type, movie_api_id } = req.body;
    const { user_id } = req.user;

    const { rows: foundList } = await pool.query(
      `
      SELECT * FROM lists WHERE list_type = $1 AND user_id=$2
      `,
      [list_type, user_id]
    );

    if (foundList.length === 0) {
      return create(
        {
          ...req,
          body: {
            ...req.body,
            name: list_type === "watch" ? "Watchlist" : "Favorites",
            description: "",
            list_type,
            movies: [movie_api_id],
          },
        },
        res
      );
    }

    // Find if movie already belongs to list.
    const { rows: listMovies } = await pool.query(
      `
      SELECT movie_api_id FROM movies_list WHERE list_id=$1
      `,
      [foundList[0].list_id]
    );

    // If movie is found, remove it
    if (
      listMovies.length !== 0 &&
      listMovies.find(
        (movie) => Number(movie.movie_api_id) === Number(movie_api_id)
      )
    ) {
      // Filter movie out of list
      const newListMovies = listMovies.filter(
        (value) => Number(value.movie_api_id) !== Number(movie_api_id)
      );
      return update(
        {
          ...req,
          body: {
            ...req.body,
            ...foundList[0],
            movies: newListMovies.map((m) => m.movie_api_id),
          },
        },
        res
      );
    }

    return addMovie(
      {
        ...req,
        body: {
          ...req.body,
          list_id: foundList[0].list_id,
        },
      },
      res
    );
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function update(req, res) {
  try {
    const { list_id, name, description, movies } = req.body;

    const { rows } = await pool.query(
      `SELECT list_id FROM lists
      WHERE list_id=$1`,
      [list_id]
    );

    // List not found
    if (rows.length !== 1) {
      return res.status(404).json({ error: "List not found" });
    }

    // Updates list
    await pool.query(
      `UPDATE lists
      SET name=$1, description=$2, updated_at=$3
      WHERE list_id=$4`,
      [name, description, new Date(), list_id]
    );

    // Delete previous movies
    await pool.query(
      `DELETE FROM movies_list
      WHERE list_id=$1`,
      [list_id]
    );

    // Bulk insert new movies in auxiliary table
    const { rows: insertedMovieList } = await pool.query(
      `INSERT INTO movies_list (list_id, movie_api_id)
      VALUES
      ${movies.map((movie_id) => `(${list_id}, ${movie_id})`).join(",")}
      RETURNING movie_api_id`
    );

    if (insertedMovieList.length == movies.length) {
      res.status(200).end();
    } else {
      throw Error("Unexpected");
    }
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function deleteList(req, res) {
  try {
    const { list_id } = req.body;
    const { user_id } = req.user;

    const { rowCount } = await pool.query(
      `DELETE FROM lists
      WHERE list_id=$1 AND user_id=$2`,
      [list_id, user_id]
    );

    if (rowCount == 1) {
      res.status(200).end();
    } else {
      res.status(404).json({ error: "List does not exist" });
    }
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function like(req, res) {
  try {
    const { user_id } = req.user;
    const { list_id } = req.body;

    // Find list
    const { rows } = await pool.query(`SELECT * FROM lists WHERE list_id=$1`, [
      list_id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    const list = rows[0];

    // If list belongs to user trying to like, return error
    if (list.user_id === String(user_id)) {
      return res
        .status(400)
        .json({ error: "Not possible to like your own list" });
    }

    const { rows: like_rows } = await pool.query(
      `SELECT * FROM like_list WHERE user_id=$1 AND list_id=$2`,
      [user_id, list.list_id]
    );

    // Like or unlike list
    if (like_rows.length === 0) {
      // User is going to like list
      await pool.query(
        `INSERT INTO like_list (user_id, list_id) VALUES ($1, $2)`,
        [user_id, list.list_id]
      );
    } else {
      // User is going to unlike list
      await pool.query(
        `DELETE FROM like_list WHERE user_id=$1 AND list_id=$2`,
        [user_id, list.list_id]
      );
    }
    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = {
  details,
  user,
  popular,
  curated,
  create,
  update,
  addMovie,
  addSpecial,
  deleteList,
  like,
};
