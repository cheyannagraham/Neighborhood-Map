import React from 'react'

class Search extends React.Component {

  handleChange = (input,field) => {
    this.setState({[field] : input})

    let keyword = field === 'keyword' ? input : (this.state && this.state.keyword)
    let location = field === 'location' ? input : (this.state && this.state.location )

    this.props.getData(keyword,location);      
  } 


  render(){
      
    return ( 
      <div>
        Keyword <input type='text' onChange = {(e) => this.handleChange(e.target.value,'keyword')} />
        Location <input type='text' onChange = {(e) => this.handleChange(e.target.value,'location')} /> 
      </div>
        
    )
  }
}

export default Search