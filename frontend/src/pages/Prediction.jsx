import { useState } from 'react';
import { predict } from '../services/api';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Prediction = () => {
  const [formData, setFormData] = useState({
    X1: 1, // Default to type 1
    X2: '',
    X3: '',
    X4: '',
    X5: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Assuming backend expects a specific format
      const response = await predict(formData);
      // The FastAPI backend from previous step returned something like { "prediction": [ value ] }
      // Adapt as needed depending on the actual backend response format
      if (response && response.prediction !== undefined) {
          const val = Array.isArray(response.prediction) ? response.prediction[0] : response.prediction;
          setResult(val);
      } else {
          setResult(response.result || response);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to connect to the prediction server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Bearing Resistance'],
    datasets: [
      {
        label: 'Predicted Value (kPa)',
        data: result !== null ? [result] : [0],
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { display: false } },
      y: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
    }
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Bearing Resistance Prediction</h1>
        <p className="text-gray-400">Enter the soil parameters below to get an instant ML prediction.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg mr-3">
              Feature Inputs
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">X1: Chemical Type</label>
              <select 
                name="X1" 
                value={formData.X1} 
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value={1} className="bg-gray-800">Type 1</option>
                <option value={2} className="bg-gray-800">Type 2</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">X2: Concentration</label>
                <input 
                  type="number" step="any" name="X2" value={formData.X2} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 15.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">X3: Depth (m)</label>
                <input 
                  type="number" step="any" name="X3" value={formData.X3} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">X4: Radial Distance (m)</label>
                <input 
                  type="number" step="any" name="X4" value={formData.X4} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 0.8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">X5: Curing Period (days)</label>
                <input 
                  type="number" step="any" name="X5" value={formData.X5} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 28"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
              ) : (
                'Predict Resistance'
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="flex flex-col space-y-6">
          
          {/* Status/Result Card */}
          <div className="glass-card p-6 md:p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
            {/* Background embellishment */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-1000 ${
              result !== null ? 'bg-emerald-500/20' : error ? 'bg-red-500/20' : 'bg-blue-500/10'
            }`}></div>

            {error && (
              <div className="flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Prediction Failed</h3>
                <p className="text-gray-400">{error}</p>
              </div>
            )}

            {!error && result === null && (
              <div className="flex flex-col items-center text-center opacity-50">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center mb-4 text-gray-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <p className="text-gray-400">Submit the form to view prediction results</p>
              </div>
            )}

            {result !== null && !error && (
              <div className="flex flex-col items-center text-center animate-in zoom-in duration-500">
                <p className="text-emerald-400 font-medium mb-2 tracking-widest uppercase text-sm">Estimated Result</p>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-200 mb-2">
                  {Number(result).toFixed(2)}
                </div>
                <p className="text-gray-400">kPa (Bearing Resistance)</p>
              </div>
            )}
          </div>

          {/* Chart Visualization */}
          <div className="glass-card p-6 h-64 flex flex-col">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Value Visualization</h3>
             <div className="flex-1 w-full">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Prediction;
