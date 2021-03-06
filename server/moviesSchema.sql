DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id INT NOT NULL PRIMARY KEY,
  vote_average INT,
  title VARCHAR(100),
  poster_path VARCHAR(250),
  release_date VARCHAR(250)
);

