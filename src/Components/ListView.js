import React from 'react';

class ListView extends React.Component {

    render() {
        return (
            <div>
                ListView
                {this.props.markers}
            </div>
        )
    }
}

export default ListView;