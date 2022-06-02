const { pool } = require("../services/db");

// TODO: Curated lists
// TODO: Add movie to list

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

async function user(req, res, next) {
  // TODO
  res.status(200).send({});
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

async function create(req, res, next) {
  try {
    const { body } = req;
    const { user_id, name, description, list_type, movies } = body;

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
    res.status(400).send(e);
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
      res.status(404).send({ error: "List not found" });
      return;
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
    res.status(400).send(e);
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

module.exports = { details, user, popular, create, update, deleteList };
