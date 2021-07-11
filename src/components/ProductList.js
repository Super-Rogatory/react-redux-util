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
export default ProductList;