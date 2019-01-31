import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {connect} from 'react-redux';
import {actions} from 'react-redux-form';

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DetailDish from './DishDetailComponent';
import About from './AboutComponent';

import {LEADERS} from '../shared/leaders';

import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {dishes: state.dishes, comments: state.comments, promotions: state.promotions, leaders: state.leaders}
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leaders: LEADERS
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    onDishSelect(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
        const HomePage = () => {
            const dish = this.props.dishes.dishes.filter((dish) => dish.featured)[0]
            const dishesLoading = this.props.dishes.isLoading
            const dishesErrMess = this.props.dishes.errMess

            const promotion = this.props.promotions.promotions.filter((promo) => promo.featured)[0]
            const promoLoading = this.props.promotions.isLoading
            const promoErrMess = this.props.promotions.errMess

            const leader = this.props.leaders.leaders.filter((leader) => leader.featured)[0]
            const leaderLoading = this.props.leaders.isLoading
            const leaderErrMess = this.props.leaders.errMess

            return (<Home
                dish={dish}
                dishesLoading={dishesLoading}
                dishesErrMess={dishesErrMess}

                promotion={promotion}
                promoLoading={promoLoading}
                promoErrMess={promoErrMess}

                leader={leader}
                leaderLoading={leaderLoading}
                leaderErrMess={leaderErrMess}
            />);
        };

        const DishWithId = ({match}) => {
            const dish = this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]
            const comments = this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))

            return (<DetailDish dish={dish} comments={comments} postComment={this.props.postComment} commentsErrMess={this.props.comments.errMess} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>);
        };

        return (<div>
            <Header/>
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch location={this.props.location}>
                        <Route path='/home' component={HomePage}/>
                        <Route exact="exact" path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>} />
                        <Route exact="exact" path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
                        <Route path='/menu/:dishId' component={DishWithId}/>
                        <Route exact="exact" path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                        <Redirect to="/home"/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
