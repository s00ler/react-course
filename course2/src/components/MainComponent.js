import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DetailDish from './DishDetailComponent';
import About from './AboutComponent';

import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';

import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {dishes: state.dishes, comments: state.comments, promotions: state.promotions, leaders: state.leaders}
}

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    onDishSelect(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
        const HomePage = () => {
            const dish = this.props.dishes.filter((dish) => dish.featured)[0]
            const promotion = this.props.promotions.filter((promo) => promo.featured)[0]
            const leader = this.props.leaders.filter((leader) => leader.featured)[0]

            return (<Home dish={dish} promotion={promotion} leader={leader}/>);
        };

        const DishWithId = ({match}) => {
            const dish = this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]
            const comments = this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))

            return (<DetailDish dish={dish} comments={comments} addComment={this.props.addComment}/>);
        };

        return (<div>
            <Header/>
            <div>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact="exact" path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>} />
                    <Route exact="exact" path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact="exact" path='/contactus' component={Contact}/>}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
            <Footer/>
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
