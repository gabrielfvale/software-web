CREATE TYPE LIST_TYPE AS ENUM ('private', 'public', 'admin', 'watch', 'favorites');

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    country CHAR(2) DEFAULT '',
    bio VARCHAR(280) DEFAULT '',
    token VARCHAR(250) NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_api_id BIGINT NOT NULL,
    score DEC(2, 1) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user_review FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT unq_user_movie UNIQUE (user_id, movie_api_id)
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    review_id BIGINT NOT NULL,
    description VARCHAR(280) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user_comment FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_review_comment FOREIGN KEY(review_id) REFERENCES reviews(review_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lists (
    list_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    list_type LIST_TYPE NOT NULL DEFAULT 'private',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user_list FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS like_list(
    user_id BIGINT NOT NULL,
    list_id BIGINT NOT NULL,
    CONSTRAINT pk_like_list PRIMARY KEY(user_id, list_id),
    CONSTRAINT fk_user_like FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_list_like FOREIGN KEY(list_id) REFERENCES lists(list_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS like_review(
    user_id BIGINT NOT NULL,
    review_id BIGINT NOT NULL,
    CONSTRAINT pk_like_review PRIMARY KEY(user_id, review_id),
    CONSTRAINT fk_user_like FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_review_like FOREIGN KEY(review_id) REFERENCES reviews(review_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movies_list(
    list_id BIGINT NOT NULL,
    movie_api_id BIGINT NOT NULL,
    CONSTRAINT pk_list_movie PRIMARY KEY(list_id, movie_api_id),
    CONSTRAINT fk_list_movie FOREIGN KEY(list_id) REFERENCES lists(list_id) ON DELETE CASCADE
);

INSERT INTO users ("admin", "bio", "country", "email", "first_name", "last_name", "password", "token", "user_id", "username") values (true, NULL, NULL, 'admin@admin.com', 'Admin', 'User', '$2b$10$Zf91S48IryHudiYGa8F4/.3rRkmAledpFvvo9GZC73WomuirB7y1i', NULL, 6, 'admin')
