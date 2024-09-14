import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import useStock from '../provider/useStock';
import style from "../css/chart.module.css"

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const StockChart = () => {
    const { stocks } = useStock()
    const [currentStockIndex, setCurrentStockIndex] = useState(0)
    const [selectedStock, setSelectedStock] = useState(null)
    useEffect(() => {
        let interval
        if (stocks != null)
            interval = setInterval(() => {
                setCurrentStockIndex((prev) => prev === stocks.length - 1 ? 0 : prev + 1)
            }, 60000)
        return () => clearInterval(interval)
    }, [stocks])

    useEffect(() => {
        if (stocks != null)
            setSelectedStock(stocks[currentStockIndex])
    }, [currentStockIndex, stocks])
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (stocks != null && selectedStock != null) {
            setLoading(false)
            console.log("HI")
            const result = selectedStock.data.chart.result[0];
            const timestamps = result.timestamp.map(ts => new Date(ts * 1000).toLocaleTimeString());
            const open = result.indicators.quote[0].open;
            const high = result.indicators.quote[0].high;
            const low = result.indicators.quote[0].low;
            const close = result.indicators.quote[0].close;
            setChartData({
                labels: timestamps,
                datasets: [
                    {
                        label: 'Open Price',
                        data: open,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        fill: false,
                        hidden: true,
                    },
                    {
                        label: 'High Price',
                        data: high,
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Low Price',
                        data: low,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        fill: false,
                        hidden: true,
                    },
                    {
                        label: 'Close Price',
                        data: close,
                        borderColor: 'black',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        fill: false,
                        hidden: true,
                    },
                ],
            });
        }

    }, [selectedStock, stocks]);

    if (loading) return <div className={style.container}>Loading ...</div>;

    return (
        <div className={style.container}>
            <h2>{selectedStock.ticker} Stock Data for {selectedStock.timestamp}</h2>
            {chartData && (
                <Line 
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: $${value.toFixed(2)}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default StockChart;
