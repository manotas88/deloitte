import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { ProjectMetric } from '../types';
import { TrendingUp, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const revenueData = [
  { name: 'Ene', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5500 },
  { name: 'Abr', amount: 4800 },
  { name: 'May', amount: 6000 },
  { name: 'Jun', amount: 7200 },
];

const projectStatusData = [
  { name: 'En Curso', value: 8 },
  { name: 'Completados', value: 12 },
  { name: 'En Riesgo', value: 2 },
];

const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

const MetricCard: React.FC<{ title: string; value: string; trend: string; icon: any; color: string }> = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <span className={`text-sm font-medium ${trend.includes('+') ? 'text-green-600' : 'text-red-600'} bg-green-50 px-2 py-1 rounded-full`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Proyectos Activos" 
          value="14" 
          trend="+12% vs mes anterior"
          icon={BriefcaseIcon}
          color="bg-blue-600"
        />
        <MetricCard 
          title="Tasa de Éxito Licitaciones" 
          value="68%" 
          trend="+5% vs Q1"
          icon={TrendingUp}
          color="bg-green-600"
        />
        <MetricCard 
          title="Alertas de Vencimiento" 
          value="3" 
          trend="Atención Requerida"
          icon={AlertTriangle}
          color="bg-amber-500"
        />
        <MetricCard 
          title="Satisfacción Cliente" 
          value="4.8/5" 
          trend="Estable"
          icon={Users}
          color="bg-purple-600"
        />
      </div>

      {/* Main Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Rendimiento Financiero por Cliente (M€)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Estado de Cartera</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feedback & Lessons Learned Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Lecciones Aprendidas Recientes</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Ver todo el repositorio</button>
        </div>
        <div className="space-y-4">
          {[
            { project: 'Transformación Digital Min. Salud', lesson: 'La fase de capacitación fue subestimada. Aumentar tiempo de onboarding en un 20%.', type: 'Mejora' },
            { project: 'Auditoría Fiscal 2024', lesson: 'El uso de herramientas de IA para pre-filtrado de documentos redujo el tiempo operativo en 40%.', type: 'Éxito' },
            { project: 'Smart City Pilot', lesson: 'Definir KPIs de interoperabilidad antes de la fase de diseño técnico.', type: 'Crítico' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-l-blue-500">
              <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{item.project}</h4>
                <p className="text-gray-600 text-sm mt-1">{item.lesson}</p>
                <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Icon helper
function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
