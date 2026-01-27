import {useState, useEffect} from 'react';
import './AddItem.css';
function Additems() {
    const addItemURL = "http://localhost:8080/supermarket/items";
    const [itemName,setItemName] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [price,setPrice] = useState("");
    const [msg,setMsg] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const newItem ={
            itemName,
            imageUrl,
            price: parseFloat(price)
        };

        try{
            const response = await fetch(addItemURL,{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(newItem)
            });
            const data = await response.json();
            console.log("Item added successfully:", data);
            setMsg("Item added successfully!");
            setTimeout(()=>{
                setMsg("");
            },5000)
            clearInputs();
        }
        catch(error){
            console.error("Error adding item:", error);
            setMsg("Error adding item. Please try again.");
            setTimeout(()=>{
                setMsg("");
            },5000)
        }
    };

    const clearInputs = () => {
        setItemName("");
        setImageUrl("");
        setPrice("");
    }
    return (
        <>
            {msg && <div className="message-box">{msg}</div>}
            <form onSubmit={handleSubmit} className="add-item-form">
                <h3>Add Item</h3>
                <input type="text" placeholder="Item Name" value={itemName} onChange={(e)=>setItemName(e.target.value)} required/>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                <button onClick={clearInputs}>Clear</button>
                <button type="submit">Add Item</button>
            </form>
        </>
    );
}
export default Additems;