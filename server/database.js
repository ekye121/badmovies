const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  // get favorites from the database
};

const saveFavorite = function(movie, callback) {
  // save movie to favorites in the database
  let sql = "INSERT INTO favorites (id, vote_average, title, poster_path, release_date) VALUES (movie.id, movie.vote_average, movie.title, movie.poster_path, movie.release_date)";
  connection.query(sql, function(err, result) {
    console.log('RESULT!', result)
    if (err) callback(err)
    else callback(null, result)
  })
};

const deleteFavorite = function(callback) {
  // delete a movie from favorites in the database
  let sql = "INSERT INTO favorites ()";
  // connection.query(sql, function(err, result) 
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};