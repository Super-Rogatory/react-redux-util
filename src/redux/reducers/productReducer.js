import * as types from '../actionTypes/action-types';

const initialState = {
    products: [{
        id: 1,
        title: "Chukwudi",
        category: "Programmer In Progress"
    }]
};
export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_PRODUCTS:
            return state;
        default:
            return state;
    }
}