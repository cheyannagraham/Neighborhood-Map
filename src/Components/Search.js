import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: 'Coffee', location : 'NY'}
  }

  componentDidMount(){
    this.getData('coffee','NY');
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
    //send data to app to send to map
    .then(resp => this.props.updateAppState({businessData: resp}));
  }


  handleChange = (input,field) => {
    this.setState({[field] : input})

    let keyword = field === 'keyword' ? input : (this.state && this.state.keyword)
    let location = field === 'location' ? input : (this.state && this.state.location )

    keyword && location && this.getData(keyword,location);      
  } 


  render(){
      
    return ( 
      <div id='search-container'>
        <h2>Search</h2>
        
        <label className='label'>Keyword</label>
        <input defaultValue='Coffee' type='text' onChange = {(e) => this.handleChange(e.target.value,'keyword')} />
         
        <label className='label'>Location</label>
        <input defaultValue='NY'type='text' onChange = {(e) => this.handleChange(e.target.value,'location')} /> 
      </div>
        
    )
  }
}

export default Search