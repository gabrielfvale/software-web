CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    country CHAR(2) NULL,
    bio VARCHAR(280) NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    score DEC(2, 1) NOT NULL,
    date_review TIMESTAMP DEFAULT NOW(),
    date_update TIMESTAMP DEFAULT NOW(),
    comment TEXT NULL,
    CONSTRAINT fk_user_review FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    review_id BIGINT NOT NULL,
    comment VARCHAR(280) NOT NULL,
    CONSTRAINT fk_user_comment FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_review_comment FOREIGN KEY(review_id) REFERENCES reviews(review_id)
);

CREATE TABLE IF NOT EXISTS lists (
    list_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT NULL
);

CREATE TABLE IF NOT EXISTS movies (
    movie_id SERIAL PRIMARY KEY,
    api_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS like_list(
    user_id BIGINT NOT NULL,
    list_id BIGINT NOT NULL,
    CONSTRAINT pk_like_list PRIMARY KEY(user_id, list_id),
    CONSTRAINT fk_user_like FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_list_like FOREIGN KEY(list_id) REFERENCES lists(list_id)
);

CREATE TABLE IF NOT EXISTS like_review(
    user_id BIGINT NOT NULL,
    review_id BIGINT NOT NULL,
    CONSTRAINT pk_like_review PRIMARY KEY(user_id, review_id),
    CONSTRAINT fk_user_like FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_review_like FOREIGN KEY(review_id) REFERENCES reviews(review_id)
);

CREATE TABLE IF NOT EXISTS movies_list(
    movie_id BIGINT NOT NULL,
    list_id BIGINT NOT NULL,
    CONSTRAINT pk_movie_list PRIMARY KEY(movie_id, list_id),
    CONSTRAINT fk_movie_list FOREIGN KEY(movie_id) REFERENCES movies(movie_id),
    CONSTRAINT fk_list_movie FOREIGN KEY(list_id) REFERENCES lists(list_id)
)
