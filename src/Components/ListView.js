import React from 'react';

class ListView extends React.Component {

    render() {
        return (
            <ol>
                {this.props.listItems.map(item => (
                    <li key = {item.location.lat + item.location.lng}>
                        <a href='#'> {item.title} </a>
                    </li>
                 ))}
            </ol>
        )
    }
}

export default ListView;