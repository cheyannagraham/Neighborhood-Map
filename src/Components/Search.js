import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: 'Coffee', location : 'NY'}
  }

  componentDidMount(){
    //this.getData('coffee','NY');
  }

  getData = (keyword='',location='') => {
    fetch('http://localhost:3002',
    {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({
        keyword: keyword,
        location: location
      })
    })
    .then(resp => resp.json())
    .then(resp => this.props.updateAppState({businessData: resp}))
    .catch(error => this.props.updateAppState({error:error}));
  }

  handleChange = (input,field) => {
    this.setState({[field] : input})

    let keyword = field === 'keyword' ? input : this.state.keyword;
    let location = field === 'location' ? input : this.state.location;

    keyword && location && this.getData(keyword,location);      
  } 


  render(){
      
    return ( 
      <div id='search-container'>
        <h2 tabIndex='0'>Search</h2>
        
        <label className='label'> Keyword
          <input 
          defaultValue='Coffee' 
          type='text' 
          onChange = {(e) => this.handleChange(e.target.value,'keyword')} />
        </label> 

        <label className='label'> Location
          <input 
          defaultValue='NY' 
          type='text' 
          onChange = {(e) => this.handleChange(e.target.value,'location')} /> 
        </label>
      </div>
        
    )
  }
}

export default Search