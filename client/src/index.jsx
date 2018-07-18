import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
      currentGenre: 28
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }


  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search', { params: { genre_id: this.state.currentGenre } })
      .then((response) => {
        // console.log('what is response in getmovies', response.data[0])
        this.setState({
          movies: response.data
        })
      })
      .catch((err) => console.log('getMovies ERR in index.jsx', err))
  }

  handleChange(e) {
    this.setState({ currentGenre: e.target.value })
  }

  getFavorites() {
    axios.get('/favs')
      .then((response) => {
        this.setState({
          favorites: response.data
        })
      })
  }

  saveMovie(movie) { 
    axios.post('/save', {movie: movie})
      .catch((err) => console.log('error in saveMovie', err))
  }

  deleteMovie(movie) {
    console.log('this is movie id', movie.id);
    axios.delete('/movie', { params: {id: movie.id} })
      .then((response) => {
        console.log('what is response in deleteMovie', response)
        this.setState({
          favorites: response.data
        })
      })
      .catch(err => console.log('error deleting movie from index.jsx', err))
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search 
            swapFavorites={this.swapFavorites} 
            showFaves={this.state.showFaves} 
            getMovies={this.getMovies} 
            handleChange={this.handleChange} 
            getFavorites={this.getFavorites}
          />
          <Movies 
            movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
            showFaves={this.state.showFaves} 
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));