import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import {Link} from 'react-router-dom';

function renderDish(dish) {
    return (<Card>
        <CardImg className="top" src={dish.image} alt={dish.name}/>
        <CardBody>
            <CardTitle>
                <h5>{dish.name}</h5>
            </CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>);
}

function renderComment(comment) {
    return (<div key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author}, {
                new Date(comment.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                })
            }</p>
    </div>)
}

const DetailDish = (props) => {
    if (props.dish === undefined) {
        return (<div></div>);
    }
    const dish = renderDish(props.dish)
    const comments = props.comments.map(comment => renderComment(comment))

    return (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr/>
            </div>
        </div>
        <div className="row text-left">
            <div className="col-12 col-md-5 m-1">
                {dish}
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments}
            </div>
        </div>
    </div>)
}

export default DetailDish;
