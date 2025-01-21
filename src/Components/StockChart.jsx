import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getStockChartData} from "../../api";

const StockChart = ({ id }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      const data = await getStockChartData(id);
      setChartData(data);
      setIsLoading(false);
    };

    loadChartData();
  }, [id]);

  if (isLoading) {
    return <h2>Loading Chart...</h2>;
  }

  if (!chartData || chartData.length === 0) {
    return <h2>No chart data available</h2>;
  }

  const chartLabels = chartData.map((entry) => {
    const date = new Date(entry.t);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const chartPrices = chartData.map((entry) => entry.c); 

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `${id} Stock Price (Last 7 Days)`,
        data: chartPrices,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;
