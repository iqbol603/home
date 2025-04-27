import React, { useEffect, useState } from "react";
import { getDailyCustomerStats, getMonthlyCustomerStats, getYearlyCustomerStats } from "../api";

const CustomerAnalytics = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daily = await getDailyCustomerStats();
        const monthly = await getMonthlyCustomerStats();
        const yearly = await getYearlyCustomerStats();

        setDailyStats(daily.data.daily);
        setMonthlyStats(monthly.data);
        setYearlyStats(yearly.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Аналитика по клиентам</h2>

      <h3>Ежедневная аналитика клиентов</h3>
      <ul>
        {dailyStats.map((stat, index) => (
          <li key={index}>
            Дата: {`${stat._id.day}/${stat._id.month}/${stat._id.year}`} — Клиенты: {stat.totalCustomers} — Сумма: {stat.totalSalesAmount} TJS
          </li>
        ))}
      </ul>

      <h3>Ежемесячная аналитика клиентов</h3>
      <ul>
        {monthlyStats.map((stat, index) => (
          <li key={index}>
            Месяц: {stat._id.month}/{stat._id.year} — Клиенты: {stat.totalCustomers} — Сумма: {stat.totalSalesAmount} TJS
          </li>
        ))}
      </ul>

      <h3>Годовая аналитика клиентов</h3>
      <ul>
        {yearlyStats.map((stat, index) => (
          <li key={index}>
            Год: {stat._id.year} — Клиенты: {stat.totalCustomers} — Сумма: {stat.totalSalesAmount} TJS
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerAnalytics;
