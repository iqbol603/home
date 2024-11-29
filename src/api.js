import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Функции для работы с клиентами
export const getCustomers = async () => {
    return await axios.get(`${API_URL}/customers`);
};

// Получение ассортимента
export const getProducts = async () => {
    return await axios.get(`${API_URL}/products`);
};

// Добавление нового продукта
export const addProduct = async (product) => {
    return await axios.post(`${API_URL}/products`, product);
};

// Получение всех заказов
export const getOrders = async () => {
    return await axios.get(`${API_URL}/orders`);
};

// Создание нового заказа
export const addOrder = async (orderData) => {
    return await axios.post(`${API_URL}/orders`, orderData);
};

export const addCustomer = async (customer) => {
    return await axios.post(`${API_URL}/customers`, customer);
};

// Функция для редактирования клиента
export const updateCustomer = async (id, updatedData) => {
    return await axios.put(`${API_URL}/customers/${id}`, updatedData);
};

// Функция для удаления клиента
export const deleteCustomer = async (id) => {
    return await axios.delete(`${API_URL}/customers/${id}`);
};

export const getDailyCustomerStats = async () => {
    return await axios.get(`${API_URL}/customers/stats/daily`);
};

export const getMonthlyCustomerStats = async () => {
    return await axios.get(`${API_URL}/customers/stats/monthly`);
};

export const getYearlyCustomerStats = async () => {
    return await axios.get(`${API_URL}/customers/stats/yearly`);
};


export const getDailyOrderStats = async () => {
    return await axios.get(`${API_URL}/orders/stats/daily`);
};

export const getMonthlyOrderStats = async () => {
    return await axios.get(`${API_URL}/orders/stats/monthly`);
};
// API для статистики продуктов по месяцам
export const getMonthlyProductStats = async () => {
    return await axios.get(`${API_URL}/orders/stats/products/monthly`);
};

export const getDailyProductStats = async () => {
    return await axios.get(`${API_URL}/orders/products/daily`);
  };

  export const getYearlyProductStats = async () => {
    return await axios.get(`${API_URL}/orders/products/yearly`);
  };

export const getYearlyOrderStats = async () => {
    return await axios.get(`${API_URL}/orders/stats/yearly`);
};
