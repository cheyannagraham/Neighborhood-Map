import React from 'react';

class Map extends React.Component {
    render() {
        return (
            <div>
                Map
                {this.props.markers}
            </div>
        )        
    }
}

export default Map;