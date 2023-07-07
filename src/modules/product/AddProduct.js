import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const isIntegerNumber = (value) => {
    return /^[0-9]+$/.test(value);
  };

  const validateFieldData = (newproduct) => {
    if (
      newproduct.name &&
      newproduct.reference &&
      isIntegerNumber(newproduct.price) &&
      isIntegerNumber(newproduct.weight) &&
      isIntegerNumber(newproduct.stock) &&
      newproduct.category
    ) {
      return true;
    }

    return false;
  };
  const store = (newProduct) => {
    if (!validateFieldData(newProduct)) {
      alert("Valide los campos");
    } else {
      axios
        .post("http://localhost:3000/products", newProduct)
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
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      reference,
      price,
      weight,
      stock,
      category,
    };

    try {
      store(newProduct);
    } catch (error) {
      alert(error);
    }

    // Limpiar los campos del formulario después de agregar el producto
    setName("");
    setReference("");
    setPrice("");
    setWeight("");
    setStock("");
    setCategory("");
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Referencia:</label>
          <input
            type="text"
            class="form-control"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            class="form-control"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            required
          />
        </div>
        <div>
          <label>Peso:</label>
          <input
            type="number"
            class="form-control"
            value={weight}
            onChange={(event) => setWeight(Number(event.target.value))}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            class="form-control"
            value={stock}
            onChange={(event) => setStock(Number(event.target.value))}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            class="form-control"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddProduct;
