import React,{useState} from 'react';
import Carts from './carts';
import Base from'./Base';


const CartPage = () => {    
    var local = JSON.parse(localStorage.getItem("cart")).length;
    const [cartItemscount, setCartItemsCount] = useState({local})
    return (
    <Base>
        <Carts count={local}/>
    </Base> );
}
 
export default CartPage;


