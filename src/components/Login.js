import React, { useState } from 'react';

const LoginPage = ({ setPage }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Отправка данных на сервер
      const response = await fetch('http://10.154.193.190:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      console.log("data", data);

      if (response.ok) {
        // Успешная авторизация
        alert('Вы успешно авторизовались!');
        setPage('order'); // Перенаправление на страницу оформления заказа
      } else {
        setError(data.error || 'Неверный логин или пароль');
      }
    } catch (error) {
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form" style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Авторизация</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <div  style={{ marginBottom: "15px" }}>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}
        <button
          type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
         >
          {isLoading ? 'Авторизация...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;


