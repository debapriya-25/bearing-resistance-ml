import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, BrainCircuit, Info } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/prediction', icon: <BrainCircuit className="w-5 h-5" />, label: 'Prediction' },
    { to: '/about', icon: <Info className="w-5 h-5" />, label: 'About' }
  ];

  return (
    <aside className="w-64 bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.1)] flex flex-col h-full shadow-2xl transition-all duration-300">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          BearingResistance
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 text-xs text-gray-500 text-center">
        © 2026 Prediction System
      </div>
    </aside>
  );
};

export default Sidebar;
