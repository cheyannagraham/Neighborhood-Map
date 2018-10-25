import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: 'Coffee', location : 'NY'}
  }

  handleChange = (input,field) => {
    this.setState({[field] : input})

    let keyword = field === 'keyword' ? input : (this.state && this.state.keyword)
    let location = field === 'location' ? input : (this.state && this.state.location )

    keyword && location && this.props.getData(keyword,location);      
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