import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock,key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-title">
        <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
        <br />
        <p>
          <small>by : {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - Order soon</small>
        </p>
      {props.addToCart === true && <button
        className="main-button"
        onClick={() => props.addproduct(props.product)}
      ><FontAwesomeIcon icon={faShoppingCart} /> add to cart
      </button>}
      </div>
    </div>
  );
};

export default Product;
