import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Ristorante Con Fusion'
        }
    }

    render() {
        return (<Navbar dark fixed="top" color="primary">
            <div className="container">
                <NavbarBrand href="/">{this.state.name}</NavbarBrand>
            </div>
        </Navbar>);
    }
}

export default NavBar;
