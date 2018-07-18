import React from 'react';
import axios from 'axios';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getGenres()
    this.handleClick()
  }
  
  getGenres() {
    //make an axios request in this component to get the 
    // list of genres from your endpoint GET GENRES
    
    axios.get('/genres')
      .then((response) => {
        // console.log('THIS IS RES FROM SEARCH',response.data.genres.id)
        this.setState({
          genres: response.data.genres
        })
      })
      .catch((err) => console.log('GENRES IN SEARCH', err))
  }

  handleClick() { 
    this.props.getMovies()
  } 
 
  render() {
  
    return (
      <div className="search">
        
        <button onClick={() => {
          this.props.swapFavorites();
          this.props.getFavorites()
          }}>
          {this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
        
        <select onChange={this.props.handleChange}>
          {this.state.genres.map((genre, i) => {
            return <option value={genre.id} key={genre.id}>{genre.name}</option>
          })}
        </select>

        <br/><br/>

        <button onClick={this.handleClick}>Search</button>

      </div>
    );
  }
}

export default Search;