import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('employee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username, role);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="bg-slate-800 p-8 text-center border-b border-slate-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4 shadow-lg">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SendApp</h1>
          <p className="text-slate-400 text-sm mt-2">Plataforma Estratégica & Formación</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Ingresa tu nombre..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Selecciona tu Perfil</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('external')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    role === 'external'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <GraduationCap size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Externo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    role === 'employee'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Briefcase size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Empleado</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-slate-800 transition-transform active:scale-95 flex items-center justify-center"
            >
              Ingresar al Sistema
              <ArrowRight size={20} className="ml-2" />
            </button>
          </form>
          
          <p className="text-center text-xs text-gray-400 mt-6">
            © 2024 SendApp. Acceso restringido.
          </p>
        </div>
      </div>
    </div>
  );
};