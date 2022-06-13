const { pool } = require("../services/db");
const { getPages, paginateQuery } = require("../util/paginate");

// TODO: Treat conflicting primary key errors
async function details(req, res, next) {
  try {
    const { params } = req;

    const { rows } = await pool.query(
      `SELECT * FROM lists
      WHERE list_id=$1`,
      [params.id]
    );

    // List not found
    if (rows.length !== 1) {
      res.status(404).send({ error: "List not found" });
      return;
    }

    const list = rows[0];

    const { rows: movies } = await pool.query(
      `SELECT movie_api_id FROM movies_list
      WHERE list_id=$1`,
      [params.id]
    );
    list.movies = movies.map((movie) => Number(movie.movie_api_id));

    res.status(200).send(list);
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function popular(req, res, next) {
  // TODO: pagination
  try {
    const { rows } = await pool.query(
      `SELECT lk.list_id, l.name, l.description, l.created_at, l.updated_at, likes
      FROM lists as l
      INNER JOIN (
        SELECT like_list.list_id, COUNT(*) as likes
        FROM like_list
        GROUP BY like_list.list_id
      ORDER BY COUNT(*) DESC) as lk on l.list_id = lk.list_id
      WHERE l.list_type = 'public'`
    );

    const lists = [];
    for (listIndex in rows) {
      const { rows: movies } = await pool.query(
        `SELECT movie_api_id
      FROM movies_list
      WHERE list_id=$1`,
        [rows[listIndex].list_id]
      );

      lists.push({
        ...rows[listIndex],
        movies: movies.map((movie) => Number(movie.movie_api_id)),
      });
    }

    res.status(200).send({
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: lists,
    });
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function curated(req, res, next) {
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
      return res.status(400).send({ error: "Page exceeds limit" });
    }

    const { rows } = await pool.query(
      paginateQuery(
        `SELECT * FROM lists 
        WHERE list_type = 'admin'`,
        page,
        per_page
      )
    );
    res.status(200).send({ page, total_pages, total_results, results: rows });
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function user(req, res, next) {
  try {
    const { username } = req.params;
    const user_id = req?.user?.user_id || -1;
    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    const { rows } = await pool.query(
      `SELECT user_id FROM users
      WHERE username = $1`,
      [username]
    );

    if (rows.length !== 1) {
      return res.status(404).send({ error: "User not found" });
    }

    const { total_results, total_pages } = await getPages(
      "lists",
      "user_id",
      rows[0].user_id,
      per_page
    );

    // If the user is logged in, display all lists. If not, display only public lists.
    const { rows: userList } = await pool.query(
      paginateQuery(
        `SELECT * FROM lists WHERE user_id = $1 ${
          rows[0].user_id === user_id ? `` : `AND list_type = 'public'`
        }`,
        page,
        per_page
      ),
      [rows[0].user_id]
    );

    res
      .status(200)
      .send({ page, total_pages, total_results, results: userList });
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const { name, description, list_type, movies } = req.body;
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
        .send({ error: "User does not have admin privileges" });
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
      res.status(201).send({ list_id });
    } else {
      res.status(500).send({});
    }
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

// Add movie to list
async function addMovie(req, res, next) {
  try {
    const { body } = req;
    const { list_id, movie_api_id } = body;

    const { rows: exists } = await pool.query(
      `
       SELECT * FROM movies_list WHERE list_id = $1
       `,
      [list_id]
    );

    if (exists.length === 0) {
      return res.status(404).send({ error: "List not found" });
    }

    await pool.query(
      `INSERT INTO movies_list (list_id, movie_api_id) 
      VALUES ($1,$2)
      `,
      [list_id, movie_api_id]
    );

    return res.status(200).send({});
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const { body } = req;
    const { list_id, name, description, movies } = body;

    const { rows } = await pool.query(
      `SELECT list_id FROM lists
      WHERE list_id=$1`,
      [list_id]
    );

    // List not found
    if (rows.length !== 1) {
      return res.status(404).send({ error: "List not found" });
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
      res.status(200).send({});
    } else {
      res.status(500).send({});
    }
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
}

async function deleteList(req, res, next) {
  try {
    const { body } = req;
    const { list_id } = body;

    const { rowCount } = await pool.query(
      `DELETE FROM lists
      WHERE list_id=$1`,
      [list_id]
    );

    if (rowCount == 1) {
      res.status(200).send({});
    } else {
      res.status(404).send({ error: "List does not exist" });
    }
  } catch (e) {
    res.status(400).send(e);
    next(e);
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
  deleteList,
};
