import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from './../Product/product';

const ProductDeatails = () => {
    const {productKey} = useParams();
    const product =fakeData.find(pd => pd.key === productKey);
    console.log(product);


    return (
        <div>
            <h1> {productKey} coming sooon</h1>
            <Product addToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDeatails;