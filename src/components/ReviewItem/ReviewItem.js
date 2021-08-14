import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key, price,img} =props.product;
    const reviewStyle={
        borderBottom:'1px solid lightgray',
        marginBottom:"10px",paddingBottom:'10px',
        marginLeft:'20px'}
    return (
        <div style={{display:"flex"}}>
         <div className="product-img">
             <img src={img} alt="" />
          </div>
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
        </div>
       
        
    );
};

export default ReviewItem;