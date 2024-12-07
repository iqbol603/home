import React, { useState } from "react";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import SalesAnalytics from "./components/SalesAnalytics";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList"; 
import AddProductForm from "./components/AddProductForm"; // Импорт формы для добавления продукта
import './App.css';
import OrderAnalytics from "./components/OrderAnalytics";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/Login";
import logo from "./logo.jpg";
function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="container">
      {/* <h1>Miron</h1> */}
      <img src={logo} alt="logo" width="80px" height="30px"></img>
      
      
      {/* Меню навигации */}
      {page !== "login" ? (
        <nav className="nav">
          {/* Навигация после авторизации */}
          <button onClick={() => setPage("order")}>Оформить заказ</button>
          <button onClick={() => setPage("allOrders")}>Все заказы</button> {/* Кнопка для просмотра всех заказов */}
          <button onClick={() => setPage("products")}>Ассортимент</button> {/* Кнопка для добавления продуктов */}
          <button onClick={() => setPage("orderStats")}>Статистика заказов</button> {/* Кнопка для добавления продуктов */}
          <button onClick={() => setPage("register")}>Создать нового пользователя</button> {/* Кнопка для выхода */}
          <button slot="end" onClick={() => setPage("login")}>Выход</button> {/* Кнопка для выхода */}
        </nav>
      ) : (
        <></>
      )}
      
      {/* Условный рендеринг страниц */}

      {page === "login" && <LoginForm setPage={setPage} />}
      {page === "register" && <RegisterForm />}
      {page === "order" && <OrderForm />}
      {page === "allOrders" && <OrderList />}
      {page === "products" && <AddProductForm />}
      {page === "orderStats" && <OrderAnalytics />}
      {page === "customers" && <CustomerList />}
      {page === "addCustomer" && <AddCustomer />}
      {page === "salesAnalytics" && <SalesAnalytics />}
      {/* {page === "login" ? (
        < LoginForm/>
      ) : page === "register" ? (
        < RegisterForm/>
      ) : page === "order" ? (
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
      )} */}
    </div>
  );
}

export default App;
