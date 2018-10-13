import React from 'react';

class ListView extends React.Component {

    render() {
        return (
            this.props.listItems &&
            
            <ol>
                {this.props.listItems.map(item => {
                    let className = '';
                    
                    this.props.markerClicked && item.title === this.props.markerClicked.title ?
                    className = 'clicked' : className = '';

                    return (
                        <li  key = {item.location.lat + item.location.lng}>
                            <a className = {className} href='#'> {item.title} </a>
                        </li>
                    )
                    
                })}
            </ol>
        )
    }
}

export default ListView;