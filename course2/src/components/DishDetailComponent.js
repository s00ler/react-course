import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DetailDish extends Component {
    renderDish(dish) {
        return (<Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>
                    <h5>{dish.name}</h5>
                </CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>);
    }

    renderComment(comment) {
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

    render() {
        if (this.props.selectedDish === null) {
            return (<div></div>);
        }
        const dish = this.renderDish(this.props.selectedDish)
        const comments = this.props.selectedDish.comments.map(comment => this.renderComment(comment))

        return (<div className="row text-left">
            <div className="col-12 col-md-5 m-1">
                {dish}
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments}
            </div>
        </div>)
    }
}

export default DetailDish;
