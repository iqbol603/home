import React, { useState } from 'react';

const RegisterForm = ({ setPage }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password || !confirmPassword) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Отправка данных на сервер для регистрации
      const response = await fetch('http://10.154.193.190:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Вы успешно зарегистрировались!');
        setPage('login'); // Перенаправление на страницу логина
      } else {
        setError(data.error || 'Ошибка при регистрации');
      }
    } catch (error) {
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Создать нового пользователя</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>
        <div>
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
