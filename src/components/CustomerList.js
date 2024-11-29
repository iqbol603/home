import React, { useEffect, useState } from "react";
import { getCustomers, updateCustomer, deleteCustomer } from "../api";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", phone: "", email: "", price: "" });


  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const handleEditClick = (customer) => {
    setEditId(customer._id);
    setEditData({ name: customer.name, phone: customer.phone, email: customer.email, price: customer.price });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCustomer(editId, editData);
    setEditId(null);
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {editId === customer._id ? (
              <form onSubmit={handleUpdate}>
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  placeholder="Phone"
                />
                <input
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  placeholder="Price"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <span>
                {customer.name} - {customer.phone} - {customer.email} - Цена {customer.price}TJS
                <button onClick={() => handleEditClick(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer._id)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
