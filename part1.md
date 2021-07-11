# Extra Practice
## Notice that we can create an actionTypes folder to hold all of our constants (the ones that refer to a specific action type).
- In our action creators we can import all of named constants and utilize them.
```
import * as types from '../actionTypes/action-types';
```
<hr />

## Creating our Action Creators (productActions.js)
- Recall that actions, should report things that happened, not MAKE things happen. An action is a plain JS object that explains what just happened.
- At the end of the day, **we are just following DRY principle**. It is much easier to call a function that returns an action to be dispatched rather than retype a specific action over and over again.
```
export const setProducts = (products) => ({
  type: types.SET_PRODUCTS,
  payload: products,
});

export const selectedProduct = (product) => ({
  type: types.SELECTED_PRODUCT,
  payload: product,
});
```

<hr />

## Creating our Reducers (productReducer.js)
- Recall that action, explains what just happened. Yet, an action alone does not change anything in the application state.
- Once an action is dispatched by the store (the store includes application state), the reducer (a pure JS function) will take in the inital state and an action.
- The reducer will then perform some computation and return a new state without mutating the original state.
```
const initialState = {};
export const productReducer = (state = initialState, action) => {

}
```
<hr />

## When you create an application, you are going to have many reducers. (index.js)
- We are going to combine our reducers inside of the index.js file of reducers.
```
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
```

- Then we can combine them with combineReducers.
```
const reducers = combineReducers({
    allProducts: productReducer
})
```

- Recall that combineReducers will **take in an object whose values are different reducing functions** and **returns a single reducing function.**
- This single reducing funnction can then be passed into createStore.
- **NOTE. The resulting reducer calls every child reducer and gathers their results into a single state object. Whatever the initialState is, that is what will be collected into the single state object.**
<hr />

## Creating the store. (store.js)

```
import { createStore } from "redux";
import { reducer } from "./reducers/index";

const initialApplicationState = {};
const store = createStore(reducer, initialApplicationState);

export default store;
```

- Recall that a Redux store holds the complete state of your app. It is also a JS object.
- **NOTE: The only way to change the state in our store is to dispatch actions.**
- Our createStore function takes in a reducer, an optional preloadedState, and an enhancer (applyMiddleware()).

### Tips on Redux Store.
> Redux state is normally plain JS objects and arrays.

> If your state is a plain object, make sure you never mutate it! Immutable updates require making copies of each level of data, typically using the object spread operator ( return { ...state, ...newData } ).

> When a store is created, Redux dispatches a dummy action to your reducer to populate the store with the initial state. You are not meant to handle the dummy action directly. Just remember that your reducer should return some kind of initial state if the state given to it as the first argument is undefined, and you're all set.

> To apply multiple store enhancers, you may use compose().

<hr />

## Linking React Application with Redux (index.js in Home)
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
+ import { Provider } from 'react-redux';
+ import store from './redux/store';

ReactDOM.render(
 + <Provider store={store}>
     <App />
 + </Provider>,
  document.getElementById('root')
);
```
- We utilize the Provider component to wrap our App. We pass Provider the store that we just created from the reducers.
- ### In Redux DevTools, we can see our state. We can see our initalState in devTools.
```
const initialState = {
    products: [{
        id: 1,
        title: "Chukwudi",
        category: "Programmer In Progress"
    }]
};
```

```
export const reducers = combineReducers({
    allProducts: productReducer
})
```
### Our DevTools will display allProducts, with the products array inside of it, followed by an object at index 0 with our id, title, and category.
![title](images/redux.jpg)
### Recall that the resulting reducer from combineReducers will call every child reducer and gathers their results into a single state object. Whatever the initialState is, that is what will be collected into the single state object.
<hr />

## Creating React Components
- We created a Header, ProductList, ProductDetail, and Product component. You are mostly familiar with React so we can just provide example code.
```
import './App.css';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
```

```
import React from 'react';
const Header = () => {
    return (
        <div className="ui fixed menu">
            <div className="ui container center">
                <h2>Shopper.io</h2>
            </div>
        </div>
    );
}
export default Header;
```
<hr />

## Add Routing to Project
```
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/product/:productId" exact component={ProductDetail} />
          <Route>404 Not Found</Route>
        </Switch>
      </Router>
    </div>
  );
}
```
* Once we have imported HashRouter, Route, and Switch. We can then setup some logic.
* <Switch> | Renders the first child <Route> or <Redirect> that matches the location.

<hr />

## Accessing State (functional components) (ProductList.js,)
```
import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {
    const products = useSelector((state) => state);
    console.log(products);
    return(
        <div className="ui grid container">
            <h1>Product List</h1>
        </div>
    );
}
```
- ## **useSelector() hook in Functional Components, connect() in class components.**
- As with connect(), you should start by wrapping the entire application in a <Provider> component to make the store available to entire component tree.
- ### useSelector() allows you to extract data from the Redux store state. This hook takes in one mandatory and one optional argument.
```
const result = useSelector(selector: Function, equalityFn?: Function)
```
- ### The selector is approximately equivalent to the mapStateToProps argument to connect conceptually.
<hr />

- ### Recall, connect() is a function that connects a React component to a Redux store.
```
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```
## mapStateToProps
- ## **The mapStateToProps and mapDispatchToProps deals with your Redux store's state and dispatch.** 
- ### If a mapStateToProps function is specified, the wrapper component will subscribe to Redux store updates, it will get called everytime the state changes.
- ## **A mapStateToProps function takes a maximum of two parameters, state (obj) and 'ownProps' (obj, optional).**
- ### If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

> `const mapStateToProps = (state) => ({ todos: state.todos })`
- ### If your mapStateToProps function is declared as taking two parameters, it will be called whenever the store state changes or when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.

## **NOTE: Your mapStateToProps function is expected to return an object, this object is merged as props to your connected component**
<hr />

## mapDispatchToProps
- ## If your mapDispatchToProps is declared as a function taking one parameter, it will be given the dispatch of your store, meaning it can dispatch actions that will change the state of the component.
```
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
```

## **NOTE: Your maptDispatchToProps function is expected to return an object, each property of the object should be a function that dispatchs an action to the store when called**

## **NOTE: The return of connect() is a wrapper function that takes your component and returns a wrapper component with the additional props it injects.**
<hr />

## **Back to useState()**
- useState is how you can get access to states coming from our Redux store.
## Note how every component has access to the same data.

```
import React from 'react';
import { useSelector } from 'react-redux';

const Product = () => {
    const products = useSelector((state) => state);
    console.log(products);
    return(
        <div>
            <h1>Product</h1>
        </div>
    );
}
export default Product;
```

```
import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const ProductList = () => {
    const products = useSelector((state) => state);
    console.log(products);
    return(
        <div className="ui grid container">
            <Product />
        </div>
    );
}
export default ProductList;
```
## **BEAUTY OF REDUX**
<hr />

## Accessing state (dot) && destructuring
```
const Product = () => {
  + const products = useSelector((state) => state.allProducts.products);
  + const {id, title} = products[0];
  return (
    <>
      <div className="four wide column">
        <div className="ui link cards">
          <div className="card">
            <div className="image"></div>
            <div className="content">
  +           <div className="header">{title}</div>
            </div>
          </div>
        </div>
        <h1>Product</h1>
      </div>
    </>
  );
};
```

<hr />

## Let's add some APIs to it now. useEffect for functional components, componentDidMount (lifecycle methods) for class components

## **RECALL, useEffect() is effectively componentDidMount, componentDidUpdate, and componentWillUnmount combined.**
- By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
- By default, it runs both after the first render and after every update.

# Very Important Snippet
```
import React, { useEffect } from "react";
import axios from "axios";
+ import { useDispatch, useSelector } from "react-redux";
+ import {setProducts} from '../redux/actions/productActions';
import Product from "./Product";

const ProductList = () => {
  const products = useSelector((state) => state);
  + const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
  +   dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
  + useEffect(() => {
  + fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="ui grid container">
      <Product />
    </div>
  );
};
export default ProductList;
```
> ### We have a useEffect() hook that will run after the first render, this will call fetchProducts() an asynchronous function that makes an api call to fakestoreapi. In this fetchProducts function, we will dispatch an action (need to import useDispatch first). We have an action creator (we created it early) that expects a list of products (we will get after axios.get()). 
>> ### We can go ahead and import the action creator then. then we can call dispatch(action_creator(expected data));
>> ### The store handles our dispatch and sends it to the reducer, on a given action.type we will create a new state and return it to the store.

## Product Component
```
import React from "react";
+ import { useSelector } from "react-redux";
+ import { Link } from "react-router-dom";
const Product = () => {
  const products = useSelector((state) => state.allProducts.products);
+ const renderList = products.map((product) => (
    <div className="four wide column" key={product.id}>
+    <Link to={`/product/${product.id}`}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="content">
              <div className="header">{product.title}</div>
              <div className="meta price">{product.price}</div>
              <div className="meta">{product.category}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));

  return <>{renderList}</>;
};
export default Product;
```
- Notice our Link Component. This allows us to Link to one of the urls we specified in the Router component in App.js.

## ProductDetail
```
import React, {useEffect} from 'react';
+ import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    + const {productId} = useParams();
    console.log(productId);
    return(
        <div>
            <h1>ProductDetail</h1>
        </div>
    );
}
export default ProductDetail;
```
- useParams() is the equivalent of req.params.id

# Important Snippet of ProductDetail
```
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../redux/actions/productActions";

const ProductDetail = () => {
  const producer = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const fetchProductDetail = async () => {
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/${productId}`);
      dispatch(selectedProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>ProductDetail</h1>
    </div>
  );
};
export default ProductDetail;
```
- We need useDispatch in order to dispatch our action.
- We need useSelector to get some value from our store. **state.product comes from the key value of our combined reducer, check below**
- We need useParams to get the id that the user is trying to access.

```
export const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer
})
```



