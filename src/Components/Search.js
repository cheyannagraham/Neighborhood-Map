import React from 'react'

class Search extends React.Component {

  handleChange = (input,field) => {
    this.setState({[field] : input})
      
    fetch('http://localhost:3002',
    {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({
        keyword: field === 'keyword' ? input : (this.state && this.state.keyword) || 
        'coffee',
        location: field === 'location' ? input : (this.state && this.state.location )|| 'walnut creek,ca'
      })
    })
    .then(resp => resp.json())
    .then(resp => this.props.getMarkers(resp));
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