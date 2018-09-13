import React, { Component } from 'react';

class Header extends Component {

    render () {

        return (
            <div>
                {this.props.items.map((item, index) =>
                    <a href={item.link} key={index}>{item.label}</a>
                )}
            </div>
        )
    }

}

export default Header;