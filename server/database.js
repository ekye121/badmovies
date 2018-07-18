const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM favorites', (err, result) => {
    if (err) callback(err)
    else callback(null, result);
  })
};

const saveFavorite = function(movie, callback) {
  // save movie to favorites in the database
  let insertFav = 'INSERT INTO favorites SET ?';
  let values = {
    id: movie.id,
    vote_average: movie.vote_average,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date
  };
  connection.query(insertFav, values, function(err, result) {
    if (err) callback(err)
    else callback(null, result)
  })
};

const deleteFavorite = function(id, callback) {
  // delete a movie from favorites in the database
  connection.query(`DELETE FROM favorites WHERE id=${id}`, (err, result) => {
    if (err) console.log(err)
    else connection.query('SELECT * FROM favorites', (err2, res2) => {
      if (err2) console.log(err2)
      else callback(null, res2)
    })
  })
  
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};