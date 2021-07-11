import * as types from '../actionTypes/action-types';

const initialState = {
    products: []
};
export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_PRODUCTS:
            return {...state, products: action.payload};
        default:
            return state;
    }
}