import React, { Component } from 'react';
import Photos from './Photos';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      photos: {},
      isLoading: false,
      error: null
    };
  }

  handleChange = e => {
    this.setState({ searchString: e.target.value.trim().toLowerCase() });
    if (this.state.searchString.length > 0) {
      this.fetchData(e.target.value.trim().toLowerCase());
    }
  };
  fetchData = (searchValue) => {
    const API = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b3575d10435de5f010fc941f5eff94a&tags=${searchValue}&per_page=48&format=json&nojsoncallback=1`;
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data =>
        this.setState({ photos: data.photos.photo, isLoading: false })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { photos, isLoading, error, searchString } = this.state;
    return (
      <div className="wrapper">
        <div className="searchBar">
          <input
            type="text"
            value={searchString}
            onChange={this.handleChange}
            placeholder="Type here..."
          />
        </div>
        {
          Object.keys(photos).length > 1 && photos.constructor !== Object ? (<Photos photos={photos} />) :
            (error) ? (<p>{error.message}</p>) :
              (isLoading) ? (<p>Loading ...</p>) :
                ('Your results will appear here')
        }
      </div>
    );
  }
}

export default App;
