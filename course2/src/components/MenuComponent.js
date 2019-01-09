import React from 'react';

import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

import {Link} from 'react-router-dom';

function renderMenuItem(dish, onClick) {
    return (<div key={dish.id} className="col-12 col-md-5 m-1">
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    </div>);
}

const Menu = (props) => {
    return (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>Menu</h3>
                <hr/>
            </div>
        </div>
        <div className="row text-left">
            {props.dishes.map(dish => renderMenuItem(dish, props.onClick))}
        </div>
    </div>);
}

export default Menu;
