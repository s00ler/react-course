import React, {Component} from 'react';

import Menu from './components/MenuComponent';
import NavBar from './components/NavbarComponent';

import {DISHES} from './shared/dishes';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    render() {
        return (<div className="App">
            <NavBar/>
            <Menu dishes={this.state.dishes}/>
        </div>);
    }
}

export default App;
