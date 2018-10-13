import React from 'react';

class ListView extends React.Component {

    render() {
        return (
            this.props.markers && 
            <ol>
                {this.props.markers.map(marker => {
                    let className = '';
                    
                    this.props.markerClicked && marker.title === this.props.markerClicked.title ?
                    className = 'clicked' : className = '';

                    return (
                        <li  key = {marker.title}>
                            <a className = {className} href='#' onClick = {() => {this.props.handleClick(marker)}}> {marker.title} </a>
                        </li>
                    )
                    
                })}
            </ol> || ''          


        )
    }
}

export default ListView;