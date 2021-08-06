import React, { useEffect } from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from 'react-router-dom';

const Shop = () => {
  const first10 = fakeData.slice(0, 15);
  
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() =>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map (existingkey =>{
      const product = fakeData.find(pd => pd.key === existingkey);
      product.quantity = savedCart[existingkey];
      return product;
    })
    setCart(previousCart);
  },[])

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
       count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    
    
    setCart(newCart);
    
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
          key = {pd.key}
            addToCart={true}
            product={pd}
            addproduct={handleAddProduct}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
        <Link to="/review">
        <button className="main-button" >Review Order</button>
        </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
