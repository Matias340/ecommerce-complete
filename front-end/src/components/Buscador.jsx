import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import axios from "axios";

function Buscador() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/products"); // Ajusta la URL según tu backend
          setProducts(response.data);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
      fetchProducts();
    }, []);
  
    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      if (term === "") {
        setFilteredProducts([]);
        setSelectedProduct(null);
      } else {
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(term)
        );
        setFilteredProducts(results);
      }
    };
  
    const handleSelectProduct = (product) => {
      setSelectedProduct(product);
      setFilteredProducts([]); // Limpia los resultados de búsqueda
      setSearchTerm(""); // Limpia el campo de búsqueda
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
      };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Buscar Productos</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por nombre..."
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
  
        {/* Mostrar resultados de búsqueda */}
        {filteredProducts.length > 0 && (
          <div className="border border-gray-200 rounded p-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSelectProduct(product)}
              >
                <h2 className="text-lg font-semibold">{product.name}</h2>
              </div>
            ))}
          </div>
        )}
  
        {/* Mostrar producto seleccionado */}
        {selectedProduct && (
          <div className="mt-6">
            <div className="border rounded p-4 shadow-md w-64">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full mb-4"
              />
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <p className="text-lg font-semibold text-gray-700">
                ${selectedProduct.price}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" 
              onClick={() => handleAddToCart(selectedProduct)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default Buscador;
