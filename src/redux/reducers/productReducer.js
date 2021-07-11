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

export const selectedProductReducer = (state = {}, action) => {
    switch(action.type){
        case types.SELECTED_PRODUCT:
            return {...state, ...action.payload};
        case types.REMOVE_SELECTED_PRODUCT:
            return {};
        default:
            return state;
    }
}