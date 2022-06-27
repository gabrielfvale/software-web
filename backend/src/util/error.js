function errorHandler(err) {
  let status = 500;
  let error = "A server error has ocurred";

  /* API related errors */
  if (err?.code === "ECONNABORTED") {
    error = "Unable to reach TMDB API";
  }

  if (err?.response?.status === 404) {
    status = 404;
    error = "Not found";
  }

  if (err?.response) {
    switch (err.response.status) {
      case 404:
        status = 404;
        error = "Not found";
        break;
      default:
        status = 500;
        error = "Unable to reach TMDB API";
        break;
    }
  }

  /* Postgres related errors */
  if (err?.table) {
    if (err.detail.includes("already exists")) {
      status = 400;
      error = "Requested item already exists";
    }
  }

  return { status, body: { error } };
}

module.exports = { errorHandler };
