import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key, price} =props.product;
    const reviewStyle={
        borderBottom:'1px solid lightgray',
        marginBottom:"10px",paddingBottom:'10px',
        marginLeft:'200px'}
    return (
        <div style={reviewStyle}>
            <h3 className="product-name">
                {name}
            </h3>

            <p>
                Quentity: {quantity}
            </p>
            <p>${price}</p>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;