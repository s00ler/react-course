import React, {Component} from 'react';

import {Card, CardImg, CardTitle, CardImgOverlay} from 'reactstrap';

import DetailDish from './DishDetailComponent'

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    renderMenuItem(dish) {
        return (<div key={dish.id} className="col-12 col-md-5 m-1">
            <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>
                        <strong>{dish.name}</strong>
                    </CardTitle>
                </CardImgOverlay>
            </Card>
        </div>);
    }

    render() {
        const menu = this.props.dishes.map(dish => this.renderMenuItem(dish))

        return (<div className="container">
            <div className="row text-left">
                {menu}
            </div>
            <DetailDish selectedDish={this.state.selectedDish}/>
        </div>);
    }
}

export default Menu;
