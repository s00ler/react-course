import React, {Component} from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Jumbotron
} from 'reactstrap';

import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (<div>
            <Navbar dark="dark" expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion'/></NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar="navbar">
                        <Nav navbar="navbar">
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="fa fa-home fa-lg"></span>
                                    <span> Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'>
                                    <span className="fa fa-info fa-lg"></span>
                                    <span> About Us</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/menu'>
                                    <span className="fa fa-list fa-lg"></span>
                                    <span> Menu</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'>
                                    <span className="fa fa-address-card fa-lg"></span>
                                    <span> Contact Us</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron className="myjumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </div>);
    }
}

export default Header;
