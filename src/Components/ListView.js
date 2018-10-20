import React from 'react';

class ListView extends React.Component {

    componentDidUpdate = () => {
        document.querySelector('#street-view') && this.props.getStreetView();
        

    }


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
                                {/* <div id='street-view'></div> */}

                                <ol id='module-list'>
                                    <li id='street-view'></li>
                                    <li>{marker.address}</li>
                                    <li>{marker.phone}</li>
                                    <li><a href={marker.website}>Visit</a></li>
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