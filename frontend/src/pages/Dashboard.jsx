import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Trophy, Target, Database } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Mock data for models based on the problem statement
  const models = ['LR', 'Ridge', 'Lasso', 'ENet', 'SVR', 'DT', 'ANN', 'XGBoost'];
  const r2Scores = [0.72, 0.73, 0.71, 0.72, 0.85, 0.81, 0.91, 0.94];
  const rmseErrors = [12.4, 12.2, 12.8, 12.5, 8.3, 9.5, 5.2, 4.1];

  const lineChartData = {
    labels: models,
    datasets: [
      {
        label: 'R² Score (Accuracy)',
        data: r2Scores,
        borderColor: 'rgb(52, 211, 153)', // emerald-400
        backgroundColor: 'rgba(52, 211, 153, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: models,
    datasets: [
      {
        label: 'RMSE (Lower is better)',
        data: rmseErrors,
        backgroundColor: 'rgba(248, 113, 113, 0.8)', // red-400
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const summaryCards = [
    { title: 'Best Model', value: 'XGBoost', icon: <Trophy className="w-6 h-6 text-yellow-400" />, color: 'border-yellow-500/30' },
    { title: 'Top Accuracy (R²)', value: '0.94', icon: <Target className="w-6 h-6 text-emerald-400" />, color: 'border-emerald-500/30' },
    { title: 'Dataset Size', value: '1,250', icon: <Database className="w-6 h-6 text-blue-400" />, color: 'border-blue-500/30' }
  ];

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 h-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Model Analytics Dashboard</h1>
        <p className="text-gray-400">Comparing performance metrics across different machine learning algorithms.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`glass-card p-6 flex items-center justify-between border ${card.color} hover:bg-white/5 transition-colors`}>
            <div>
              <p className="text-sm text-gray-400 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        <div className="glass-card p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Model Accuracy Comparison (R²)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <Line options={chartOptions} data={lineChartData} />
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Relative Error (RMSE)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <Bar options={chartOptions} data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
