import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2'

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/");
      setProducts(response.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      swal.fire({
        title: 'Esta seguro?',
        text: 'Se eliminar este producto!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar !',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          axios.delete(`http://localhost:3000/products/${id}`).then(response =>{
            if (response.data.success) {
              fetchProducts();
              swal.fire(
                'Eliminado!',
                'Tu product se elimino correctamnete',
                'success'
              )
            }})
            .catch ( error => {
              swal.fire(
                'Error',
                error,
                'error'
              )
            })
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire(
            'Cancelado',
            'Se cancela',
            'error'
          )
        }
      })
      
    } catch (error) {
      alert(error);
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/view/${id}`);
  };

  const handleEditProduct = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h2>Listado de Productos</h2>
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Referencia</th>
            <th scope="col">Precio</th>
            <th scope="col">Peso</th>
            <th scope="col">Stock</th>
            <th scope="col">Categoría</th>
            <th scope="col">Fecha Ultima Venta</th>
            <th scope="col">Fecha Creación</th>
            <th colspan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.reference}</td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.date_of_last_sale}</td>
              <td>{product.created_at}</td>
              <td>
                <button class="btn btn-outline-info" onClick={() => handleViewProduct(product.id)}>Ver</button>
                <button class="btn btn-outline-warning" onClick={() => handleEditProduct(product.id)}>Editar</button>
                <button class="btn btn-outline-danger" onClick={() => deleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
