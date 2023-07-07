import React, { useState} from "react";
import axios from "axios";

const Index = () => {

  const [product_id, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const isIntegerNumber = (value) => {
    return /^[0-9]+$/.test(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if(isIntegerNumber(product_id) && isIntegerNumber(quantity)){
      const saleProduct = {
        product_id,
        quantity,
    };

    try {
      await axios.post("http://localhost:3000/sale-products", saleProduct)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
    } catch (error) {
      alert(error);
    }
    }else{
      alert("Valide los campos")
    }
    
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleFormSubmit}>
      <div>
          <label>Producto Id:</label>
          <input type="number" class = "form-control" value={product_id} onChange={(event) => setProductId(Number(event.target.value))} required />
        </div>
        <div>
          <label>Canrtidad:</label>
          <input type="number" class = "form-control" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} required />
        </div>
       
        <button class="btn btn-outline-success" type="submit">Vender</button>
      </form>
    </div>
  );
};

export default Index;
