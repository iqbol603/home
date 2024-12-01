import React, { useEffect, useState } from "react";
import {
    getDailyOrderStats,
    getMonthlyOrderStats,
    getYearlyOrderStats,
    getMonthlyProductStats,
    getYearlyProductStats,
    getDailyProductStats,
} from "../api";

const OrderAnalytics = () => {
    const [dailyStats, setDailyStats] = useState([]);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [yearlyStats, setYearlyStats] = useState([]);
    const [dailyProductStats, setDailyProductStats] = useState([]);
    const [monthlyProductStats, setMonthlyProductStats] = useState([]);
    const [yearlyProductStats, setYearlyProductStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dailyOrders = await getDailyOrderStats();
                const monthlyOrders = await getMonthlyOrderStats();
                const yearlyOrders = await getYearlyOrderStats();

                const dailyProducts = await getDailyProductStats();
                const monthlyProducts = await getMonthlyProductStats();
                const yearlyProducts = await getYearlyProductStats();

                console.log("44",dailyOrders);

                setDailyStats(dailyOrders.data);
                setMonthlyStats(monthlyOrders.data);
                setYearlyStats(yearlyOrders.data);

                setDailyProductStats(dailyProducts.data);
                setMonthlyProductStats(monthlyProducts.data);
                setYearlyProductStats(yearlyProducts.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, []);

    const renderProductDetails = (products) => (
        <table>
            <thead>
                <tr>
                    <th>Название продукта</th>
                    <th>Количество</th>
                    <th>Цена за единицу (TJS)</th>
                    <th>Общая сумма (TJS)</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr
                        key={index}
                        style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}
                    >
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.totalAmount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
console.log("111", dailyStats);
    return (
        <div>
            <h2>Аналитика по заказам</h2>

            {/* Ежедневная аналитика */}
            <h3>Ежедневная аналитика заказов</h3>
            {dailyStats.slice().reverse().map((stat, index) => (
                <div key={index} className="blockStats">
                    <div className="statsData">
                        <p>Дата: {`${stat.id.day}/${stat.id.month}/${stat.id.year}`}</p>
                        <p>Общее количество заказов: {stat.totalOrders}</p>
                        <p>Сумма продаж: {stat.totalSalesAmount} TJS</p>
                    </div>
                    <div className="statsProduct">
                        <h4>Детали продуктов:</h4>
                        {renderProductDetails(
                            dailyProductStats.find(
                                (productStat) =>
                                    productStat.id.day === stat.id.day &&
                                    productStat.id.month === stat.id.month &&
                                    productStat.id.year === stat.id.year
                            )?.products || []
                        )}
                    </div>
                </div>
            ))}

            {/* Ежемесячная аналитика */}
            <h3>Ежемесячная аналитика заказов</h3>
            {monthlyStats.map((stat, index) => (
                <div key={index} className="blockStats">
                    <div className="statsData">
                        <p>Месяц: {`${stat.id.month}/${stat.id.year}`}</p>
                        <p>Общее количество заказов: {stat.totalOrders}</p>
                        <p>Сумма продаж: {stat.totalSalesAmount} TJS</p>
                    </div>
                    <div className="statsProduct">
                        <h4>Детали продуктов:</h4>
                        {renderProductDetails(
                            monthlyProductStats.find(
                                (productStat) =>
                                    productStat.id.month === stat.id.month &&
                                    productStat.id.year === stat.id.year
                            )?.products || []
                        )}
                    </div>
                </div>
            ))}

            {/* Годовая аналитика */}
            <h3>Годовая аналитика заказов</h3>
            {yearlyStats.map((stat, index) => (
                <div key={index} className="blockStats">
                    <div className="statsData">
                        <p>Год: {stat.id.year}</p>
                        <p>Общее количество заказов: {stat.totalOrders}</p>
                        <p>Сумма продаж: {stat.totalSalesAmount} TJS</p>
                    </div>
                    <div className="statsProduct">
                        <h4>Детали продуктов:</h4>
                        {renderProductDetails(
                            yearlyProductStats.find(
                                (productStat) => productStat.id === stat.id.year
                            )?.products || []
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderAnalytics;
