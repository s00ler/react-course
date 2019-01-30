import {DISHES} from '../shared/dishes';

import * as ActionTypes from './ActionTypes.js';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

export const dishesLoading = () => ({type: ActionTypes.DISHES_LOADING});

export const dishesFailed = (errmess) => ({type: ActionTypes.DISHES_FAILED, payload: errmess});

export const addDishes = (dishes) => ({type: ActionTypes.ADD_DISHES, payload: dishes});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}
