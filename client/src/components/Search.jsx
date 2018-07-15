import React from 'react';
import axios from 'axios';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genreId: ''
    };
    this.getGenres = this.getGenres.bind(this);
    // this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount() {
    this.getGenres()
    // this.getMovies()
  }

  
  getGenres() {
    //make an axios request in this component to get the 
    // list of genres from your endpoint GET GENRES
    
    axios.get('/genres')
    .then((response) => {
      // console.log('THIS IS RES FROM SEARCH',response.data.genres)
      this.setState({
        genres: response.data.genres
      })
    })
    .catch((err) => console.log('GENRES IN SEARCH', err))
  }
  
  // getMovies(id) {
  //   this.props.getMovies
  // }

  onChange(e) {
    e.preventDefault();
    this.props.getMovies()
  }
 
  render() {
    // let searchGenre = ;
    return (
      <div className="search">

        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
        
        <select>
          {this.state.genres.map((genre) => {
            return <option value={genre.id}>{genre.name}</option>
              
          })}
        </select>
        
        

        <br/><br/>

        <button onClick={this.onChange}>Search</button>

      </div>
    );
  }
}

export default Search;