import React, { useState } from "react";
import { addCustomer } from "../api";

const AddCustomer = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { name, phone, email, price: Number(price)};
    await addCustomer(newCustomer);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="цена" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomer;
