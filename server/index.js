var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var axios = require('axios');
var app = express();
var db = require('./database.js')
var apiHelpers = require('./apiHelpers.js');
const { API_KEY } = require('../server/config.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function (req, res) {
	// get the search genre     
	// https://www.themoviedb.org/account/signup
	// use this endpoint to search for movies by genres, you will need an API key
	// https://api.themoviedb.org/3/disecover/movie
	// and sort them by horrible votes using the search parameters in the API

	// console.log('THIS IS REQ QUERY',req.query.genre_id)
	
	axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${req.query.genre_id}&sort_by=vote_average.asc&api_key=${API_KEY}`)
		.then((response) => {
			res.send(response.data.results);
		})
		.catch((err) => console.log('GETTING MOVIES API ERR', err));

});

app.get('/genres', function (req, res) {
	// make an axios request to get the list of official genres
	// use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
	// send back

	axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
		.then((response) => {
			// console.log('this is genres from api', response.data.genres)
			res.send(response.data)
		})
		.catch((err) => console.log('GETTING GENRE API ERR', err))

});

app.post('/save', function (req, res) {
	console.log('REQBODY!', req.body.movie)
	db.saveFavorite(req.body.movie, (err, data) => {
		if (err) console.log(err)
		else res.status(201).send()
	})

});

app.post('/delete', function (req, res) {
	db.deleteFavorite(req.body.movie, (err, data) => {
		if (err) console.log(err)
		else res.status(201).send()
	})
});

app.listen(3000, function () {
	console.log('listening on port 3000!');
});
