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
import { color } from 'chart.js/helpers';

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
              backgroundColor: 'rgba(255, 255, 255, 0)', 
              borderColor: 'rgba(255, 255, 255, 1)', 
              tension: 0.1, 
              pointBackgroundColor: 'rgba(255, 255, 255, 1)', 
              pointBorderColor: 'rgba(255, 255, 255, 1)', 
              pointRadius: 0.1, 
              pointHoverRadius: 5,
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
    <div style={{ width: '100%', height: '200px' }}>
      <Line 
      data={chartData} 
      options={{
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Date', color: 'white' } },
          y: { title: { display: true, text: 'Price (USD)', color: 'white' }, beginAtZero: false,tick:{
            color:'white',
            stepSize: 500,
          } }
        },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: 'white' } },
          },
        }}
      />
    </div>
  );
};

export default CryptoChart;
