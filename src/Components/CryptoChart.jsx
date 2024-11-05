import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getHistoricalPriceData } from "../../api";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const CryptoChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalPriceData(coinId);
        setChartData({
          labels: data.map(point => point.x.toLocaleDateString()), 
          datasets: [
            {
              label: 'Price (USD)',
              data: data.map(point => point.y), 
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1, 
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching historical data for chart:', error);
      }
    };

    fetchData();
  }, [coinId]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line 
        data={chartData} 
        options={{
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Price (USD)' } }
          },
          plugins: {
            legend: { display: true, position: 'top' },
          },
        }}
      />
    </div>
  );
};

export default CryptoChart;
