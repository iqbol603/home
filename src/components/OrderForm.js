import React, { useEffect, useState } from "react";
import { getProducts, addOrder } from "../api";
import './OrderForm.css';
import OrderList from "./OrderList";

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(0);

  // Загрузка списка продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    };
    fetchProducts();
  }, []);

  // Обновление общей суммы
  useEffect(() => {
    const newTotal = Object.values(orderItems).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
    setChange(paymentAmount ? paymentAmount - newTotal : 0);
  }, [orderItems, paymentAmount]);

  // Обработчик клика по продукту для увеличения количества
  const handleProductClick = (product) => {
    setOrderItems((prevItems) => {
      const currentQuantity = prevItems[product._id]?.quantity || 0;
      return {
        ...prevItems,
        [product._id]: {
          product,
          quantity: currentQuantity + 1,
        },
      };
    });
  };

  // Увеличение количества
  const handleIncrease = (productId) => {
    setOrderItems((prevItems) => {
      const currentQuantity = prevItems[productId]?.quantity || 0;
      return {
        ...prevItems,
        [productId]: {
          ...prevItems[productId],
          quantity: currentQuantity + 1,
        },
      };
    });
  };

  // Уменьшение количества
  const handleDecrease = (productId) => {
    setOrderItems((prevItems) => {
      const currentQuantity = prevItems[productId]?.quantity || 0;
      if (currentQuantity === 0) return prevItems;
      const updatedItems = {
        ...prevItems,
        [productId]: {
          ...prevItems[productId],
          quantity: currentQuantity - 1,
        },
      };
      if (updatedItems[productId].quantity === 0) {
        delete updatedItems[productId];
      }
      return updatedItems;
    });
  };

  // Обработчик для оформления заказа
  const handleCheckout = async () => {
    const orderData = {
      products: Object.values(orderItems).map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
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
        {products.map((product) => (
          <div key={product._id} onClick={() => handleProductClick(product)} className="product">
            <h3>{product.name}</h3>
            <p>Цена: {product.price} TJS</p>
          </div>
        ))}
      </div>

      <h2>Детали заказа</h2>
      {Object.keys(orderItems).length > 0 ? (
        <div className="orderDetails">
           <div className="orderItem">
              <h4>Наименование</h4>
              <p>Цена: TJS</p>
              <p>Количество:</p>
              </div>
          {Object.values(orderItems).map((item) => (
            <div key={item.product._id} className="orderItem">
              <h4>{item.product.name}</h4>
              <p>{item.product.price} TJS</p>
              <p> {item.quantity}</p>
              <div className="quantityButtons">
                <button className="dell" onClick={() => handleDecrease(item.product._id)}>-</button>
                <button className="add" onClick={() => handleIncrease(item.product._id)}>+</button>
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
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min="0"
              />
            </label>
            <p>Сдача: {change < 0 ? "Недостаточно средств" : `${change} TJS`}</p>
          </div>
          <button onClick={handleCheckout} disabled={totalAmount === 0 || change < 0} className="payButton">
            Оплатить
          </button>
        </div>
      ) : (
        <p>Выберите продукты для оформления заказа.</p>
      )}

      {/* <OrderList /> */}
    </div>
  );
};

export default OrderForm;
