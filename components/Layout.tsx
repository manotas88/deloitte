import React from 'react';
import { View, UserRole } from '../types';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Briefcase, 
  LogOut, 
  Menu,
  Bell,
  Compass,
  BookOpen
} from 'lucide-react';

interface LayoutProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  userRole: UserRole | null;
  username: string;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ 
  currentView, 
  setCurrentView, 
  userRole, 
  username,
  onLogout,
  children 
}) => {
  
  // Define menu items
  const allItems = {
    academy: { id: 'academy', label: 'Academy & Simulador', icon: GraduationCap },
    strategy: { id: 'strategy', label: 'Estrategia de clientes', icon: Compass },
    presales: { id: 'presales', label: 'Preventa y Licitaciones', icon: Briefcase },
    dashboard: { id: 'dashboard', label: 'Dashboard & Métricas', icon: LayoutDashboard },
    blog: { id: 'blog', label: 'Blog & Insights', icon: BookOpen },
  };

  // Define navigation order based on role
  let navItems = [];

  if (userRole === 'external') {
    // External: Academy -> Blog
    navItems = [allItems.academy, allItems.blog];
  } else {
    // Employee: Academy -> Strategy -> Presales -> Dashboard
    navItems = [
      allItems.academy, 
      allItems.strategy, 
      allItems.presales, 
      allItems.dashboard
    ];
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">SendApp</h1>
          <span className="text-xs text-slate-400 uppercase tracking-widest">Platform</span>
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="mb-4 px-4">
             <span className="text-xs text-slate-500 uppercase">Conectado como</span>
             <p className="text-sm font-bold text-white truncate">{username}</p>
             <span className="text-xs text-blue-400 capitalize bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-900/50">
               {userRole === 'external' ? 'Externo' : 'Empleado'}
             </span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2 hover:bg-slate-800 rounded-lg"
          >
            <LogOut size={18} />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-200">
          <div className="flex items-center text-gray-500">
            <Menu className="mr-4 lg:hidden" size={24} />
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer text-gray-500 hover:text-blue-600">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
              {username.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};