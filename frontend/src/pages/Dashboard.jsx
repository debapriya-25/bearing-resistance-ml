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
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Trophy, Target, Database } from 'lucide-react';
import StatCard from '../components/StatCard';

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

  // New Enhancements Data
  const datasetPreview = [
    { id: 1, X1: 1, X2: 15.5, X3: 2.5, X4: 0.8, X5: 28, y: 154.2 },
    { id: 2, X1: 2, X2: 12.0, X3: 1.5, X4: 1.2, X5: 14, y: 120.5 },
    { id: 3, X1: 1, X2: 18.2, X3: 3.0, X4: 0.5, X5: 56, y: 185.7 },
    { id: 4, X1: 2, X2: 10.5, X3: 4.5, X4: 2.0, X5: 7,  y: 95.3 },
    { id: 5, X1: 1, X2: 14.8, X3: 2.0, X4: 1.0, X5: 28, y: 142.1 },
  ];

  const scatterData = {
    datasets: [
      {
        type: 'scatter',
        label: 'Predicted vs Observed',
        data: [
          { x: 150, y: 148 }, { x: 120, y: 125 }, { x: 185, y: 180 },
          { x: 95, y: 98 }, { x: 142, y: 139 }, { x: 110, y: 115 },
          { x: 170, y: 165 }, { x: 135, y: 138 }, { x: 160, y: 158 },
          { x: 105, y: 100 }
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
      },
      {
        type: 'line',
        label: 'Ideal Fit',
        data: [{ x: 90, y: 90 }, { x: 190, y: 190 }],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  const errorDistData = {
    labels: ['-10 to -5', '-5 to 0', '0 to 5', '5 to 10'],
    datasets: [{
      label: 'Error Frequency',
      data: [2, 15, 18, 5],
      backgroundColor: 'rgba(248, 113, 113, 0.8)', // red-400
      borderRadius: 4,
    }]
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

  const scatterOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    },
    scales: {
      ...chartOptions.scales,
      x: {
        type: 'linear',
        position: 'bottom',
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
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 h-full pb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Model Analytics Dashboard</h1>
        <p className="text-gray-400">Comparing performance metrics and dataset characteristics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Dataset Overview Section */}
      <div className="glass-card p-6 border border-white/10 glass-card-hover">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Dataset Overview</h2>
            <p className="text-sm text-gray-400">AP Data - 5 Input Features</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-blue-300 border border-blue-500/30">X1: Chemical Type</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-emerald-300 border border-emerald-500/30">X2: Concentration</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-purple-300 border border-purple-500/30">X3: Depth</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-yellow-300 border border-yellow-500/30">X4: Radial Distance</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-red-300 border border-red-500/30">X5: Curing Period</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Row</th>
                <th className="px-6 py-4 font-medium">X1</th>
                <th className="px-6 py-4 font-medium">X2</th>
                <th className="px-6 py-4 font-medium">X3</th>
                <th className="px-6 py-4 font-medium">X4</th>
                <th className="px-6 py-4 font-medium">X5</th>
                <th className="px-6 py-4 font-medium text-emerald-400">Target (y)</th>
              </tr>
            </thead>
            <tbody>
              {datasetPreview.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4">{row.X1}</td>
                  <td className="px-6 py-4">{row.X2}</td>
                  <td className="px-6 py-4">{row.X3}</td>
                  <td className="px-6 py-4">{row.X4}</td>
                  <td className="px-6 py-4">{row.X5}</td>
                  <td className="px-6 py-4 font-semibold text-white">{row.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        <div className="glass-card p-6 flex flex-col h-full glass-card-hover">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Model Accuracy Comparison (R²)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <Line options={chartOptions} data={lineChartData} />
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col h-full glass-card-hover">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Relative Error (RMSE)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <Bar options={chartOptions} data={barChartData} />
          </div>
        </div>
      </div>

      {/* New Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        <div className="glass-card p-6 flex flex-col h-full glass-card-hover">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Observed vs Predicted</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <Scatter options={scatterOptions} data={scatterData} />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col h-full glass-card-hover">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Error Distribution Frequency</h3>
          <div className="flex-1 w-full min-h-[300px]">
             <Bar options={{...chartOptions, plugins: {...chartOptions.plugins, legend: { display: false }}}} data={errorDistData} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
