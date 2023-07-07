import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams, Redirect  } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      const product = response.data.data[0];
      setName(product.name);
      setReference(product.reference);
      setPrice(product.price);
      setWeight(product.weight);
      setStock(product.stock);
      setCategory(product.category);
    } catch (error) {
      alert(error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      id,
      name,
      reference,
      price,
      weight,
      stock,
      category,
    };

    try {
      const response = await axios.put(`http://localhost:3000/products/`, updatedProduct);
      alert(response.data.message);
      document.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" class = "form-control" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div>
          <label>Referencia:</label>
          <input type="text" class = "form-control" value={reference} onChange={(event) => setReference(event.target.value)} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" class = "form-control" value={price} onChange={(event) => setPrice(Number(event.target.value))} required />
        </div>
        <div>
          <label>Peso:</label>
          <input type="number" class = "form-control" value={weight} onChange={(event) => setWeight(Number(event.target.value))} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" class = "form-control" value={stock} onChange={(event) => setStock(Number(event.target.value))} required />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" class = "form-control" value={category} onChange={(event) => setCategory(event.target.value)} required />
        </div>
        <button class="btn btn-outline-warning" type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditProduct;
