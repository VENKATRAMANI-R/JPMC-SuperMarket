import React, { useState, useEffect } from 'react';
import './Supermarket.css';
const URL = 'http://localhost:8080/supermarket/items';

function Supermarket() {
  const [items, setItems] = useState([]);
  const [msg,setMsg] = useState("");
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);
  const addToCart = async(item) => {
    try{
      // item.quantity = (item.quantity!=null) ? item.quantity + 1 : 1;
      const nos = 1;
      const response = await fetch(`http://localhost:8080/supermarket/cart/${item.itemNo}/${nos}`, {
        method: 'POST',
        headers :{
          "content-type" : "application/json"
        }
      });
      if(!response.ok){
        setMsg("Failed to add item to cart");
            setTimeout(()=>{
                setMsg("");
            },5000)
        throw new Error ('Failed to add item to cart');
        
      }
      const data = await response.json();
      console.log('Item added to cart:', data);
      setMsg("Item added successfully!");
            setTimeout(()=>{
                setMsg("");
            },5000)
      
    }
    catch (error){
      console.error('Error adding item to cart:', error.message);
      setMsg("Failed to add item to cart");
            setTimeout(()=>{
                setMsg("");
            },5000)
    }
  };
  if(items.length ===0){
    return <div className="card-container">No items Available!</div>
  }
  return (
    <>
    {msg && <div className="message-box">{msg}</div>}
    <div className="card-container">
      {items.map((item) => (
        <div className="card" key={item.itemNo}>
          {/* Placeholder for image */}
          <div className="card-image">
            <img src={item.imageUrl} alt={item.itemName} />
          </div>
          <div className="card-content">
            <h3>{item.itemName}</h3>
            <p>${item.price}</p>
          </div>
          <div className='card-action'>
            <button onClick={() => addToCart(item)}>Add To Cart</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Supermarket;
