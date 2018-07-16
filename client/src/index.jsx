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

  saveMovie(movie) {
    axios.post('/save')
      .then((response) => {
        let newFav = this.state.favorites.slice();
        newFav.push(response.data)
        this.setState({
          favorites: newFav
        })
      })
  }

  deleteMovie() {
    // same as above but do something diff
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
          />
          <Movies 
            movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
            showFaves={this.state.showFaves} 
            saveMovie={this.saveMovie}
          />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));