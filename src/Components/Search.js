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
       .then(resp => resp.text())
       .then(resp => {

            if(resp){

                let markers = JSON.parse(resp).map(bus =>
                    ({
                        id :bus.id,
                        location: {
                            lat : bus.coordinates.latitude,
                            lng : bus.coordinates.longitude
                        },
                        address: bus.location.display_address.join(' '),
                        title: bus.name
                    })
                )        
                this.props.getMarkers(markers)                
            }             
        });
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