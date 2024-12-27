import React, { useContext } from 'react';
import './View.css';
import { ProductContext } from '../../context/context';

function View() {
  const {product} = useContext(ProductContext);
  console.log(product)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
