import * as types from "../actionTypes/action-types";

export const setProducts = (products) => ({
  type: types.SET_PRODUCTS,
  payload: products,
});

export const selectedProduct = (product) => ({
  type: types.SELECTED_PRODUCT,
  payload: product,
});

export const removeSelectedProduct = () => ({
  type: types.REMOVE_SELECTED_PRODUCT,
});
