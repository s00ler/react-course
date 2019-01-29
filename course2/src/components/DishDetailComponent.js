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
import CommentForm from './CommentFormComponent.js'

function RenderDish({dish}) {
    console.log(dish);
    return (<div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg className="top" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>
                    <h5>{dish.name}</h5>
                </CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    </div>);
}

function renderComment(comment) {
    return (<li key={comment.id}>
        {comment.comment}
        <br/><br/>
        -- {comment.author}, {
            new Date(comment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })
        }
        <br/><br/>
    </li>);
}

function RenderComments({comments}) {
    return (<div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
            {comments.map(comment => renderComment(comment))}
        </ul>
        <CommentForm/>
    </div>);
}

const DetailDish = (props) => {
    if (props.dish === undefined) {
        return (<div></div>);
    }

    return (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active="active">{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr/>
            </div>
        </div>

        <div className="row text-left">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.comments}/>
        </div>

    </div>)
}

export default DetailDish;
