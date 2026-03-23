import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Database, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-blue-400" />,
      title: "Advanced ML Models",
      description: "Utilizing multiple regression techniques including SVR, XGBoost, and Neural Networks for high accuracy."
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-400" />,
      title: "Data-Driven Insights",
      description: "Comprehensive feature analysis based on chemical type, concentration, depth, and curing metrics."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Real-Time Processing",
      description: "Instantaneous predictions powered by a fast, asynchronous FastAPI backend."
    }
  ];

  return (
    <div className="flex flex-col space-y-12 animate-in fade-in duration-500 w-full">
      {/* Hero Section */}
      <section className="relative glass-card p-10 md:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl z-0 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm md:text-base font-medium text-blue-300 mb-2 shadow-lg">
            Intelligent Soil Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Bearing Resistance Prediction System
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Harness the power of Machine Learning to rapidly and accurately predict soil bearing resistance through robust regression techniques and deep learning architectures.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => navigate('/prediction')}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Start Prediction
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="glass-card p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-t border-t-white/10 group cursor-default">
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-white/10 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
