import { Info, Layers, Server, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Info className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">About the Project</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              An advanced application bridging geotechnical engineering and modern machine learning.
            </p>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Problem Statement */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-blue-400 mb-2">
                <Layers className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Problem Statement</h2>
              </div>
              <p className="text-gray-300 leading-relaxed bg-white/5 p-6 rounded-xl border border-white/5">
                Predicting soil bearing resistance traditionally requires extensive, time-consuming field tests.
                This project aims to leverage historical dataset and machine learning models to instantly predict
                bearing resistance using five key input parameters: Chemical Type (X1), Concentration (X2),
                Depth (X3), Radial Distance (X4), and Curing Period (X5).
              </p>
            </div>

            {/* ML Models */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400 mb-2">
                <Server className="w-6 h-6" />
                <h2 className="text-2xl font-bold">ML Models Used</h2>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-gray-300">
                <p className="mb-4">The backend extensively evaluates several competitive models:</p>
                <div className="flex flex-wrap gap-2">
                  {['Linear Regression', 'Ridge', 'Lasso', 'Elastic Net', 'SVR', 'ANN', 'Decision Tree', 'XGBoost'].map(model => (
                    <span key={model} className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/10 text-emerald-200">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-3 text-purple-400 mb-2">
                <Code className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Tech Stack</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "React + Vite", desc: "Frontend Framework", color: "text-blue-400", border: "border-blue-500/30" },
                  { name: "Tailwind CSS", desc: "Styling & UI", color: "text-cyan-400", border: "border-cyan-500/30" },
                  { name: "Chart.js", desc: "Data Visualization", color: "text-pink-400", border: "border-pink-500/30" },
                  { name: "FastAPI", desc: "Python API Backend", color: "text-emerald-400", border: "border-emerald-500/30" }
                ].map((tech, i) => (
                  <div key={i} className={`bg-white/5 p-4 rounded-xl border ${tech.border} hover:bg-white/10 transition-colors`}>
                    <div className={`font-bold mb-1 ${tech.color}`}>{tech.name}</div>
                    <div className="text-sm text-gray-400">{tech.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
