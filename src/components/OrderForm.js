import React, { useEffect, useState } from "react";
import { getProducts, getLocations, addOrder } from "../api";
import './OrderForm.css';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [orderItems, setOrderItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(0);

  // Загрузка списка продуктов
  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка при загрузке продуктов:", err));
  }, []);

  // Загрузка списка точек
  useEffect(() => {
    getLocations()
      .then(res => {
        setLocations(res.data);
        if (res.data.length) {
          setSelectedLocationId(res.data[0].id);
        }
      })
      .catch(err => console.error("Ошибка при загрузке точек:", err));
  }, []);

  // Пересчёт общей суммы и сдачи
  useEffect(() => {
    const newTotal = Object.values(orderItems).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
    setChange(paymentAmount !== "" ? paymentAmount - newTotal : 0);
  }, [orderItems, paymentAmount]);

  const handleProductClick = (product) => {
    setOrderItems(prev => {
      const qty = prev[product.id]?.quantity || 0;
      return { ...prev, [product.id]: { product, quantity: qty + 1 } };
    });
  };

  const handleIncrease = (productId) => {
    setOrderItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: prev[productId].quantity + 1
      }
    }));
  };

  const handleDecrease = (productId) => {
    setOrderItems(prev => {
      const qty = prev[productId]?.quantity || 0;
      if (qty <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return {
        ...prev,
        [productId]: { ...prev[productId], quantity: qty - 1 }
      };
    });
  };

  const handleCheckout = async () => {
    if (!selectedLocationId) {
      alert("Пожалуйста, выберите точку оформления заказа.");
      return;
    }
    const orderData = {
      products: Object.values(orderItems).map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      totalAmount,
      locationId: selectedLocationId
    };
    try {
      await addOrder(orderData);
      alert("Заказ успешно оформлен!");
      setOrderItems({});
      setTotalAmount(0);
      setPaymentAmount("");
      setChange(0);
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  return (
    <div>
      <h2>Продукты</h2>
      <div className="blockProduct">
        {products.map(product => (
          <div
            key={product.id}
            className="product"
            onClick={() => handleProductClick(product)}>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} TJS</p>
          </div>
        ))}
      </div>

      <h2>Детали заказа</h2>
      {Object.keys(orderItems).length > 0 ? (
        <>
          <div className="locationSelect">
            <label>Точка оформления: </label>
            <select
              value={selectedLocationId || ''}
              onChange={e => setSelectedLocationId(Number(e.target.value))}>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          {Object.values(orderItems).map(item => (
            <div key={item.product.id} className="orderItem">
              <h4>{item.product.name}</h4>
              <p>{item.product.price} TJS</p>
              <p>Кол-во: {item.quantity}</p>
              <div className="quantityButtons">
                <button onClick={() => handleDecrease(item.product.id)}>-</button>
                <button onClick={() => handleIncrease(item.product.id)}>+</button>
              </div>
            </div>
          ))}

          <h3>Общая сумма: {totalAmount} TJS</h3>
          <div className="paymentSection">
            <label>
              Введите сумму оплаты:
              <input
                type="number"
                value={paymentAmount}
                onChange={e => setPaymentAmount(Number(e.target.value))}
                min="0" />
            </label>
            <p>Сдача: {change < 0 ? 'Недостаточно средств' : `${change} TJS`}</p>
          </div>
          <button
            className="payButton"
            onClick={handleCheckout}
            disabled={totalAmount === 0 || change < 0}>
            Оплатить
          </button>
        </>
      ) : (
        <p>Выберите продукты для оформления заказа.</p>
      )}
    </div>
  );
};

export default OrderForm;



// import React, { useEffect, useState } from "react";
// import { getProducts, addOrder } from "../api";
// import './OrderForm.css';
// import OrderList from "./OrderList";

// const OrderForm = () => {
//   const [products, setProducts] = useState([]);
//   const [orderItems, setOrderItems] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [paymentAmount, setPaymentAmount] = useState("");
//   const [change, setChange] = useState(0);

//   // Загрузка списка продуктов
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await getProducts();
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке продуктов:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Обновление общей суммы
//   useEffect(() => {
//     const newTotal = Object.values(orderItems).reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );
//     setTotalAmount(newTotal);
//     setChange(paymentAmount ? paymentAmount - newTotal : 0);
//   }, [orderItems, paymentAmount]);

//   // Обработчик клика по продукту для увеличения количества
//   const handleProductClick = (product) => {
//     setOrderItems((prevItems) => {
//       const currentQuantity = prevItems[product.id]?.quantity || 0;
//       return {
//         ...prevItems,
//         [product.id]: {
//           product,
//           quantity: currentQuantity + 1,
//         },
//       };
//     });
//   };

//   // Увеличение количества
//   const handleIncrease = (productId) => {
//     setOrderItems((prevItems) => {
//       const currentQuantity = prevItems[productId]?.quantity || 0;
//       return {
//         ...prevItems,
//         [productId]: {
//           ...prevItems[productId],
//           quantity: currentQuantity + 1,
//         },
//       };
//     });
//   };

//   // Уменьшение количества
//   const handleDecrease = (productId) => {
//     setOrderItems((prevItems) => {
//       const currentQuantity = prevItems[productId]?.quantity || 0;
//       if (currentQuantity === 0) return prevItems;
//       const updatedItems = {
//         ...prevItems,
//         [productId]: {
//           ...prevItems[productId],
//           quantity: currentQuantity - 1,
//         },
//       };
//       if (updatedItems[productId].quantity === 0) {
//         delete updatedItems[productId];
//       }
//       return updatedItems;
//     });
//   };

//   // Обработчик для оформления заказа
//   const handleCheckout = async () => {
//     const orderData = {
//       products: Object.values(orderItems).map((item) => ({
//         productId: item.product.id,
//         quantity: item.quantity,
//       })),
//       totalAmount,
//     };

//     try {
//       await addOrder(orderData);
//       alert("Заказ успешно оформлен!");
//       setOrderItems({});
//       setTotalAmount(0);
//       setPaymentAmount("");
//       setChange(0);
//     } catch (error) {
//       console.error("Ошибка при оформлении заказа:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Продукты</h2>
//       <div className="blockProduct">
//         {products.map((product) => (
//           <div key={product.id} onClick={() => handleProductClick(product)} className="product">
//             <h3>{product.name}</h3>
//             <p>Цена: {product.price} TJS</p>
//           </div>
//         ))}
//       </div>

//       <h2>Детали заказа</h2>
//       {Object.keys(orderItems).length > 0 ? (
//         <div className="orderDetails">
//            <div className="orderItem">
//               <h4>Наименование</h4>
//               <p>Цена: TJS</p>
//               <p>Количество:</p>
//               </div>
//           {Object.values(orderItems).map((item) => (
//             <div key={item.product._id} className="orderItem">
//               <h4>{item.product.name}</h4>
//               <p>{item.product.price} TJS</p>
//               <p> {item.quantity}</p>
//               <div className="quantityButtons">
//                 <button className="dell" onClick={() => handleDecrease(item.product.id)}>-</button>
//                 <button className="add" onClick={() => handleIncrease(item.product.id)}>+</button>
//               </div>
//             </div>
//           ))}
//           <h3>Общая сумма: {totalAmount} TJS</h3>
//           <div className="paymentSection">
//             <label>
//               Введите сумму оплаты:
//               <input
//                 type="number"
//                 value={paymentAmount}
//                 onChange={(e) => setPaymentAmount(Number(e.target.value))}
//                 min="0"
//               />
//             </label>
//             <p>Сдача: {change < 0 ? "Недостаточно средств" : `${change} TJS`}</p>
//           </div>
//           <button onClick={handleCheckout} disabled={totalAmount === 0 || change < 0} className="payButton">
//             Оплатить
//           </button>
//         </div>
//       ) : (
//         <p>Выберите продукты для оформления заказа.</p>
//       )}

//       {/* <OrderList /> */}
//     </div>
//   );
// };

// export default OrderForm;
