import React, { useState } from "react";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import SalesAnalytics from "./components/SalesAnalytics";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList"; 
import AddProductForm from "./components/AddProductForm"; // Импорт формы для добавления продукта
import './App.css';
import OrderAnalytics from "./components/OrderAnalytics";

function App() {
  const [page, setPage] = useState("order");

  return (
    <div className="container">
      <h1>Miron</h1>
      
      {/* Меню навигации */}
      <nav className="nav">
        {/* <button onClick={() => setPage("customers")}>Клиенты</button> */}
        {/* <button onClick={() => setPage("analytics")}>Аналитика</button> */}
        <button onClick={() => setPage("order")}>Оформить заказ</button>
        <button onClick={() => setPage("allOrders")}>Все заказы</button> {/* Кнопка для просмотра всех заказов */}
        <button onClick={() => setPage("products")}>Ассортимент</button> {/* Кнопка для добавления продуктов */}
        <button onClick={() => setPage("orderStats")}>Статистика заказов</button> {/* Кнопка для добавления продуктов */}
      </nav>
      
      {/* Условный рендеринг страниц */}
      {page === "order" ? (
        <OrderForm />
      ) : page === "analytics" ? (
        <SalesAnalytics />
      ) : page === "customers" ? (
        <>
        <AddCustomer />
        <CustomerList />
      </>
      ) : page === "allOrders" ? ( // Добавлено условие для рендеринга страницы всех заказов
      <OrderList />
    ) : page === "orderStats" ? ( // Добавлено условие для рендеринга страницы всех заказов
      <OrderAnalytics/>
    ) : (
        <AddProductForm /> // Страница для добавления новых продуктов
      )}
    </div>
  );
}

export default App;
