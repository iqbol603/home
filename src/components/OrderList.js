import React, { useEffect, useState } from "react";
import { getOrders } from "../api";
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
        // alert("Не удалось загрузить заказы");
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div>
     

<div>
  <h2>Все заказы</h2>
  <table>
    <thead>
      <tr className="one">
        <th>Заказ ID</th>
        <th>Сумма заказа (TJS)</th>
        <th>Продукты</th>
        <th>Дата</th>
      </tr>
    </thead>
    <tbody>
      {orders.slice().reverse().map((order) => (
        <tr key={order.id} className="myTr" >
          <td> <b>{order.orderId}</b></td>
          <td> <b>{order.totalAmount}</b> TJS</td>
          <td>
            <table>
              <thead>
                <tr  className="two">
                  <th>Название</th>
                  <th>Количество</th>
                  <th>Цена (TJS)</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} TJS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>{new Date(order.orderDate).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default OrderList;
