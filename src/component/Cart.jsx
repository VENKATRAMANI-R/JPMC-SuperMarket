import react from "react";
import {useEffect, useState} from "react";
import './Cart.css';
function Cart(){

    const cartURL = "http://localhost:8080/supermarket/cart";
    const cartItemRemoveURL = "http://localhost:8080/supermarket/cart/remove/";
    const [cart, setCart] = useState([]);
    const [msg,setMsg] = useState("");
    useEffect(()=>{
        fetch(cartURL)
        .then(response=>response.json())
        .then(data=>setCart(data))
        .catch(err=>console.log(err));
    },[])
    const handleDelete = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        fetch(`http://localhost:8080/supermarket/cart/remove/${id}`, { method: "DELETE" })
            .then(() => console.log("Deleted from backend"))
            .catch((err) => console.error(err));
        setMsg("Item deleted successfully!");
            setTimeout(()=>{
                setMsg("");
            },5000)
        
    };

    if(cart.length ===0){
        return <div className="cart-container">
            <div className="cart-header">
                    <p>sNo</p>
                    <p>Item</p>
                    <p>Price</p>
                    <p>Quantity</p>
                </div>
            <h3>Cart is empty! Please add items to the cart.</h3>
            </div>
    }
    return(
        <>
        {msg && <div className="message-box">{msg}</div>}
            <div className="cart-container">
                <h3>Items in your Cart</h3>
                <div className="cart-header">
                    <p>sNo</p>
                    <p>Item</p>
                    <p>Price</p>
                    <p>Quantity</p>
                </div>
                {cart.map((cartItem) => (
                    <div className="cart-row" key={cartItem.id}>
                        <div>{cartItem.id}</div>
                        <div>{cartItem.item.itemName}</div>
                        <div>₹{cartItem.item.price}</div>
                        <div>{cartItem.quantity}</div>
                        <div>
                            
                            <button className="delete-btn" onClick={() => handleDelete(cartItem.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cart;