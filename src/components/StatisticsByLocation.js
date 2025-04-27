// src/components/StatisticsByLocation.js
import React, { useState, useEffect } from 'react';
import { getStatsByLocation } from '../api';

const StatisticsByLocation = () => {
  const [stats, setStats]   = useState([]);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatsByLocation()
      .then(res => setStats(res.data))
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке статистики');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка статистики…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="statistics">
      <h2>Статистика по точкам</h2>
      <table>
        <thead>
          <tr>
            <th>Точка</th>
            <th>Количество заказов</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ id, name, ordersCount }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{ordersCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsByLocation;
