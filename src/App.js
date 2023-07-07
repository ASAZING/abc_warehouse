import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Form from "./modules/product/AddProduct";
import List from "./modules/product/ProductList";
import Edit from "./modules/product/EditProduct";
import Sales from "./modules/sales/Index";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Lista de Productos
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="btn btn-info" to="/form">
                  Agregar Producto
                </Link>
              </li>

              <li className="nav-item active">
                <Link className="btn btn-success" to="/sales">
                  Vender
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" exact element={<List />} />
              <Route path="/view/:id" element={<Form />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
