import react,{ useEffect } from "react";
import './Checkout.css';
function Checkout(){
    const [checkout, setCheckout] = react.useState([]);
    const [cart, setCart] =react.useState([]);
    const CheckoutURL='http://localhost:8080/supermarket/checkout';
    const CartURL = "http://localhost:8080/supermarket/cart";
    const CheckoutPDF = "http://localhost:8080/supermarket/receipt";
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
    
const handleProceedToPay = async () => {
    try {
      const res = await fetch(CheckoutPDF); // or an absolute URL
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Convert to a Blob (application/pdf)
      const blob = await res.blob();

      // Create a temporary object URL and open in a new tab
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");

      // Optional: if you want to download instead of open:
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "checkout.pdf";
      // document.body.appendChild(a);
      // a.click();
      // a.remove();

      // Revoke after a short delay (allow the tab/download to start)
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (err) {
      console.error("Failed to fetch PDF:", err);
    }
  };

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
<div className="checkout">
 <button className="checkout-button" onClick={handleProceedToPay}>Proceed to Pay</button>
</div>

        </>
    );
}
export default Checkout;