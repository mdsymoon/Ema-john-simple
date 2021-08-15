import React, { useEffect } from "react";
import { useState } from "react";

import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import image from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";
const Review = () => {
  document.title = "Review";
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const saveData = getDatabaseCart();
    const productKeys = Object.keys(saveData);

    fetch("https://whispering-hamlet-71127.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={image} alt="" />;
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {thankyou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">
            Procced Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
