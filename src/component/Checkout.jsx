import react,{ useEffect } from "react";
import './Checkout.css';
function Checkout(){
    const [checkout, setCheckout] = react.useState([]);
    const [cart, setCart] =react.useState([]);
    const CheckoutURL='http://localhost:8080/supermarket/checkout';
    const CartURL = "http://localhost:8080/supermarket/cart";
    useEffect(()=>{
        fetch(CheckoutURL)
        .then(response => response.json())
        .then(data => setCheckout(data))
        .catch(err => console.log(err));
        
    }, []);

    useEffect(()=>{
        fetch(CartURL)
        .then(response=>response.json())
        .then(data=>setCart(data))
        .catch(err=>console.log(err));
    },[])
    console.log("Cartdetails",cart);
    console.log("checkout details", checkout);
    if(cart.length ===0){
        return <div className="cart-container">
            <div className="cart-header">
                <p>sNo</p>
                <p>Item</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total Price</p>
            </div>
            <h3>Cart is empty! Please add items to the cart to checkout.</h3>
        </div>;
    }
    return(
        <>
        <h2 className="checkout-title">Checkout Page</h2>
<div className="cart-container">
  <h3>Items in your Cart</h3>
  <div className="cart-header">
    <p>sNo</p>
    <p>Item</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total Price</p>
  </div>
  {cart.map((cartItem) => (
    <div className="cart-row" key={cartItem.id}>
      <div>{cartItem.id}</div>
      <div>{cartItem.item.itemName}</div>
      <div>₹{cartItem.item.price}</div>
      <div>{cartItem.quantity}</div>
      <div>₹{cartItem.item.price * cartItem.quantity}</div>
    </div>
  ))}
</div>

<div className="checkout-details">
  <span><p>Sub Total : </p><p>&nbsp;₹{checkout[0]}</p></span>
  <span><p>GST : </p><p>&nbsp;₹{checkout[1]}</p></span>
  <span><p>Grand Total : </p><p>&nbsp;₹{checkout[2]}</p></span>
</div>

        </>
    );
}
export default Checkout;