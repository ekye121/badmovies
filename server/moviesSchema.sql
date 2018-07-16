DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id INT NOT NULL PRIMARY KEY,
  vote_average INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  poster_path VARCHAR(250) NOT NULL,
  release_date VARCHAR(250) NOT NULL
);

