import React, { useEffect, useState } from "react";
import { addProduct, getProducts } from "../api";
import CryptoJS from 'crypto-js';
import axios from "axios";
// const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBUEkgS0VZIiwibmFtZSI6Imh0dHBzOi8vcnBzLmJhYmlsb24tdC5jb20vZ2V0L21hcC9jaXR5IiwiaWF0IjoxNTE2MjM5MDIyfQ.M30GnKKSjXSxx-RPGA5ctau6aBEjjTMoNMmDQAgUzv8';

const AddProductForm = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  
  
 // Загрузка списка продуктов
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
      alert("Не удалось загрузить продукты");
    }
  };
  fetchProducts();
}, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ name, price: parseFloat(price) });
      alert("Продукт добавлен успешно!");
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      // alert("Ошибка при добавлении продукта");
    }
  };

  return (
    <div>
      <h3>Добавить новый продукт</h3>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Название продукта"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Цена продукта"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Добавить продукт</button>
      </form>

      <h2>Продукты</h2>
      <div className="blockProduct">
        {products.map((product) => (
          <div key={product._id} className="product" >
            <h3>{product.name}</h3>
            <p>Цена: {product.price} TJS</p>
            {/* <p>Выбрано: {orderItems[product._id]?.quantity || 0}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProductForm;
