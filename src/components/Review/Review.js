import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    document.title = 'Review'
    const [cart, setCart ] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()



    const handleProceedCheckout = () =>  {
        history.push('/shipment');
       
    }  

    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        

    }

    useEffect(()=> {
        const saveData = getDatabaseCart();
        const productKeys = Object.keys(saveData);
        const productCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key ===key);
            product.quantity = saveData[key];
            return product;
        });
         setCart(productCart);
    },[]);

    let thankyou;
    if(orderPlaced){
      thankyou   = <img src={image} alt="" />

    } 

    return (
        <div className="shop-container">
            <div className="product-container">

            {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                     product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Procced Checkout</button>
                </Cart>

            </div>
            
            
        </div>
    );
};

export default Review;