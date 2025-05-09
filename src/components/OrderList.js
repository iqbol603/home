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
        // console.log(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
      }
    };
    fetchOrders();
  }, []);

  // Фильтрация заказов на текущий месяц
  // const now = new Date();
  // const currentMonth = now.getMonth();  // 0-янв, 11-дек
  // const currentYear = now.getFullYear();
  // const monthlyOrders = orders.filter(order => {
  //   const date = new Date(order.orderDate);
  //   return (
  //     date.getMonth() === currentMonth &&
  //     date.getFullYear() === currentYear
  //   );
  // });
  
  const now = new Date();
const currentMonth = now.getMonth();   // 0–январь … 11–декабрь
const currentYear  = now.getFullYear();

// фильтруем только заказы этого месяца, сортируем по дате DESC и берём первые 5
const monthlyOrders = orders
  .filter(order => {
    const d = new Date(order.orderDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  })
  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
  .slice(0, 5);

  return (
    <div>
      <h2>Заказы за текущий месяц</h2>
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
          {/* {monthlyOrders.slice().reverse().map(order => ( */}
          {monthlyOrders.map(order => (
            <tr key={order.orderId} className="myTr">
              <td><b>{order.orderId}</b></td>
              <td><b>{order.totalAmount}</b> TJS</td>
              <td>
                <table>
                  <thead>
                    <tr className="two">
                      <th>Название</th>
                      <th>Количество</th>
                      <th>Цена (TJS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price} TJS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              {/* <td>{new Date(order.orderDate).toLocaleString()}</td> */}
              <td>{new Date(order.orderDate).toISOString().replace('T', ' ').slice(0, 19)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;

// import React, { useEffect, useState } from "react";
// import { getOrders } from "../api";
// import './OrderList.css';

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await getOrders();
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке заказов:", error);
//         // alert("Не удалось загрузить заказы");
//       }
//     };
//     fetchOrders();
//   }, []);

//   console.log(orders);
//   return (
//     <div>
     

// <div>
//   <h2>Все заказы</h2>
//   <table>
//     <thead>
//       <tr className="one">
//         <th>Заказ ID</th>
//         <th>Сумма заказа (TJS)</th>
//         <th>Продукты</th>
//         <th>Дата</th>
//       </tr>
//     </thead>
//     <tbody>
//       {orders.slice().reverse().map((order) => (
//         <tr key={order.id} className="myTr" >
//           <td> <b>{order.orderId}</b></td>
//           <td> <b>{order.totalAmount}</b> TJS</td>
//           <td>
//             <table>
//               <thead>
//                 <tr  className="two">
//                   <th>Название</th>
//                   <th>Количество</th>
//                   <th>Цена (TJS)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.products.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.quantity}</td>
//                     <td>{item.price} TJS</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </td>
//           <td>{new Date(order.orderDate).toLocaleString()}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//     </div>
//   );
// };

// export default OrderList;
