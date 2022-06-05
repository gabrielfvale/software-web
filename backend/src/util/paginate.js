const { pool } = require("../services/db");

async function getPages(table, column, value, per_page) {
  const { rows: review_count } = await pool.query(
    `
    SELECT COUNT(*) FROM ${table} WHERE ${column}=$1
    `,
    [value]
  );

  const total_results = Number(review_count[0].count);
  const total_pages = Math.ceil(total_results / per_page);

  return { total_results, total_pages };
}

function paginateQuery(query, page, per_page) {
  const offset = per_page * page - per_page;

  const pagination = ` LIMIT ${per_page} OFFSET ${offset}`;

  return query + pagination;
}

module.exports = { getPages, paginateQuery };
