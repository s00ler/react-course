import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label
} from 'reactstrap';

import {Control, LocalForm, Errors} from 'react-redux-form';

import {required, maxLength, minLength} from '../utils/utils.js'

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
        this.toggleModal()
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
                                <Control.select model=".rating" name="rating" className="form-control">
                                    {[5, 4, 3, 2, 1].map(val => <option>{val}</option>)}
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

export default CommentForm;
