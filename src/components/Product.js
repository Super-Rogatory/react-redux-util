import React from "react";
import { useSelector } from "react-redux";

const Product = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => (
    <div className="four wide column" key={product.id}>
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
  </div>
  ))
//   const {id, title} = products[0];
  return (
    <>
      {renderList}
    </>
  );
};
export default Product;
