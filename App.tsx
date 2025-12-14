import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Academy } from './components/Academy';
import { Presales } from './components/Presales';
import { Strategy } from './components/Strategy';
import { Blog } from './components/Blog';
import { Login } from './components/Login';
import { View, UserRole } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>('academy');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState<string>('');

  const handleLogin = (name: string, role: UserRole) => {
    setUsername(name);
    setUserRole(role);
    // Default view is always Academy for both roles as requested
    setCurrentView('academy');
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername('');
    setCurrentView('academy');
  };

  const renderView = () => {
    switch (currentView) {
      case 'academy':
        return <Academy />;
      case 'strategy':
        // Only employee can see strategy
        return userRole === 'employee' ? <Strategy /> : <Academy />;
      case 'presales':
        // Only employee can see presales
        return userRole === 'employee' ? <Presales /> : <Academy />;
      case 'dashboard':
        // Only employee can see dashboard
        return userRole === 'employee' ? <Dashboard /> : <Academy />;
      case 'blog':
        return <Blog />;
      default:
        return <Academy />;
    }
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      userRole={userRole}
      username={username}
      onLogout={handleLogout}
    >
      <div className="max-w-7xl mx-auto">
        {renderView()}
      </div>
    </Layout>
  );
}

export default App;