import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./modal"; // Import the Modal component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null); // State to manage which product is being viewed in the modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data from Fake Store API:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to open the modal with the selected product
  const openModal = (product) => {
    setModalProduct(product);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalProduct(null);
  };

  return (
    <div>
      <h2>Fake Store Products</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{ margin: "10px 0", position: "relative" }}
          >
            <img src={product.image} alt={product.title} width="100" />
            <h3>{product.title}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => openModal(product)}>Quick View</button>{" "}
            {/* Quick View Button */}
          </li>
        ))}
      </ul>

      {/* Render Modal if there is a product selected for viewing */}
      <Modal product={modalProduct} onClose={closeModal} />
    </div>
  );
};

export default Products;
