import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InputVsAverageChart = ({ inputs }) => {
  const averages = {
    X1: 1.5,
    X2: 12.3,
    X3: 4.2,
    X4: 1.5,
    X5: 21.0
  };

  const labels = ['X1: Type', 'X2: Conc', 'X3: Depth', 'X4: Radial', 'X5: Curing'];

  const inputData = [
    Number(inputs.X1) || 0,
    Number(inputs.X2) || 0,
    Number(inputs.X3) || 0,
    Number(inputs.X4) || 0,
    Number(inputs.X5) || 0
  ];

  const avgData = [
    averages.X1,
    averages.X2,
    averages.X3,
    averages.X4,
    averages.X5
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Input',
        data: inputData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
        borderRadius: 4,
      },
      {
        label: 'Dataset Average',
        data: avgData,
        backgroundColor: 'rgba(156, 163, 175, 0.5)', // gray-400
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      title: {
        display: true,
        text: 'Input vs Average Comparison',
        color: 'rgba(255, 255, 255, 0.9)',
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return <Bar options={options} data={data} />;
};

export default InputVsAverageChart;
