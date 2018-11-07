import React from 'react'

class Search extends React.Component {

  componentDidMount(){
    // initial marker results
    this.getData('coffee','NY');

  }

  // This function creates a query string from the search results and makes a GET request to a local server.
  // The local server will request the data from the Yelp API and return it here. Once the response is recieved,
  // It will be sent back to <App /> to update the app state
  getData = (keyword='',location='') => {

    fetch(`http://localhost:3002/search?keyword=${keyword.toLowerCase()}&location=${location.toLowerCase()}`,
    {
      headers: {
        'content-type' : 'application/json'
      }

    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error){
        window.alert(`YELP API ERROR: ${resp.error.code} : ${resp.error.description}`);
      } 
      else return this.props.updateAppState({businessData: resp})})
    
    .catch(error => this.props.updateAppState({error:error}));
  }

  handleClick = () => {

    let keyword = document.getElementById('keyword').value.trim();
    let location = document.getElementById('location').value.trim();

    keyword && location && this.getData(keyword,location);  
  } 


  render(){
      
    return ( 
      <div id='search-container'>
        <h2>Search</h2>
        
        <label className='label'> Keyword
          <input
          defaultValue='Coffee' 
          type='text'
          id='keyword' 
          />
        </label> 

        <label className='label'> Location
          <input 
          defaultValue='NY' 
          type='text'
          id='location' 
          /> 
        </label>

        <button id='submit-search-button' onClick = {this.handleClick}>
          SEARCH
        </button> 
      </div>
        
    )
  }
}

export default Search