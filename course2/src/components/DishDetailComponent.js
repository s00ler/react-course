import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

import {Link} from 'react-router-dom';

import {Control, LocalForm, Errors} from 'react-redux-form';

import {required, maxLength, minLength} from '../utils/utils.js'

function RenderDish({dish}) {
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

function RenderComments({comments, addComment, dishId}) {
    if (comments != null) {
        return (<div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comments.map(comment => renderComment(comment))}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>);
    } else {
        return <div></div>
    }
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
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
        </div>

    </div>)
}

export default DetailDish;

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (<div>
            <Button outline="outline" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg">
                    &nbsp;Submit comment
                </span>
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                <ModalBody className="col-12">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label className="col-12" htmlFor="rating">Rating</Label>
                            <Col className="col-12">
                                <Control.select model=".rating" name="rating" id="rating" className="form-control" defaultValue="5">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Control.select>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label className="col-12" htmlFor="author">Your Name</Label>
                            <Col className="col-12">
                                <Control.text model=".author" name="author" id="author" placeholder="Your Name" className="form-control" validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}/>
                                <Errors className="text-danger" model=".author" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 charaters or less'
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label className="col-12" htmlFor="feedback">Comment</Label>
                            <Col className="col-12">
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{
                                        required
                                    }}/>
                                <Errors className="text-danger" model=".comment" show="touched" messages={{
                                        required: 'Required'
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>);
    }
}
