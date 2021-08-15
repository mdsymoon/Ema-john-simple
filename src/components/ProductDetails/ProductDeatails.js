import React from "react";
import { useParams } from "react-router-dom";

import Product from "./../Product/product";
import { useState } from "react";
import { useEffect } from "react";

const ProductDeatails = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("https://whispering-hamlet-71127.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  return (
    <div>
      <h1> {productKey} coming sooon</h1>
      <Product addToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDeatails;
