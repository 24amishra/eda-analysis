import { Bar } from 'react-chartjs-2';
import { useState,useEffect,useRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const BarChart = () => {

  const [data,setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/bar', {
          method: 'POST',
          credentials: 'include',
        });
        const json = await res.json();  // Correct way to parse JSON
        // Assume response is { labels: [...], values: [...] }
        setChartData({
          labels: json.labels,
          datasets: [
            {
              label: '# of Votes',
              data: json.values,
              borderWidth: 1,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchData();
  }, []);


  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  

  return <Bar data={data} options={options} />;
};

export default BarChart;
