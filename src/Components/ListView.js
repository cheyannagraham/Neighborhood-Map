import React from 'react';

class ListView extends React.Component {


    render() {
        return (
            <div>
                Filter Results <input 
                type='text' 
                value = {this.searchField} 
                onChange = { (e) => {this.props.findResults(e.target.value)}} />

                {this.props.markers && this.props.markers.length > 0 ? 
                
                <ol>
                    {this.props.markers.map(marker => {
                        let className, display;

                        //toggle clicked class if marker clicked
                        if(this.props.markerClicked && marker.title === this.props.markerClicked.title){
                            className = 'clicked';
                            display = 
                            <div>
                                <ol id='module-list'>
                                    <li>Address: {marker.address}</li>
                                    <li>Phone: {marker.phone}</li>
                                    <li>Website: {marker.website}</li>
                                </ol>
                            </div>
                        } 
                        else{
                            className = '';
                            display = '';

                        }

                        return (
                            <li  
                            key = {marker.id || marker.title}>
                                <a className = {className}
                                href='#' 
                                onClick = {() => {this.props.handleClick(marker)}}>
                                    {marker.title} 
                                </a>
                                {display}
                            </li>
                        )                        
                    })}
                </ol> :

                <p>No Results</p>

           }</div>
        )
    }
}

export default ListView;