import React, { useState, useEffect } from 'react';
import { TrainingModule } from '../types';
import { PlayCircle, Lightbulb, Settings, Zap, Users, Shield, Cpu, Leaf, Eye, BarChart3, RefreshCw } from 'lucide-react';
import { analyzeSimulationScenario } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'training' | 'simulator'>('training');
  
  // Mock Data for Training
  const modules: TrainingModule[] = [
    { id: '1', category: 'digital', title: 'Fundamentos de Big Data en Gobierno', duration: '45 min', level: 'Basic' },
    { id: '2', category: 'transparency', title: 'Open Data y Participación Ciudadana', duration: '60 min', level: 'Advanced' },
    { id: '3', category: 'efficiency', title: 'Metodologías Ágiles en la Administración', duration: '30 min', level: 'Basic' },
    { id: '4', category: 'digital', title: 'IA Generativa para Servicios Públicos', duration: '50 min', level: 'Advanced' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('training')}
            className={`pb-2 px-2 font-medium text-sm transition-colors flex items-center ${activeTab === 'training' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Lightbulb size={16} className="mr-2" />
            Academy & Cursos
          </button>
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`pb-2 px-2 font-medium text-sm transition-colors flex items-center ${activeTab === 'simulator' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Settings size={16} className="mr-2" />
            Panel de Simulación de Políticas
          </button>
        </div>
      </div>

      {activeTab === 'training' ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
         {modules.map(module => (
           <div key={module.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
             <div className="h-40 bg-gray-200 relative">
               <img 
                 src={`https://picsum.photos/seed/${module.id}/400/200`} 
                 alt="Course cover" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                 {module.duration}
               </div>
             </div>
             <div className="p-5">
               <span className={`text-xs font-bold uppercase tracking-wider ${
                 module.category === 'digital' ? 'text-blue-600' :
                 module.category === 'transparency' ? 'text-green-600' : 'text-amber-600'
               }`}>
                 {module.category === 'digital' ? 'Transformación Digital' : 
                  module.category === 'transparency' ? 'Transparencia' : 'Eficiencia'}
               </span>
               <h3 className="font-bold text-gray-800 mt-2 mb-3">{module.title}</h3>
               <div className="flex items-center justify-between">
                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{module.level}</span>
                 <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                   Iniciar <PlayCircle size={16} className="ml-1" />
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
      ) : (
        <SimulationPanel />
      )}
    </div>
  );
};

// Simulation Types Updated to Pillars
type Levers = {
  // Eficiencia y Sostenibilidad
  processAutomation: number;
  resourceOptimization: number;
  greenPolicies: number;

  // Transformación Digital
  aiAndCloud: number;
  interoperability: number;
  cyberSecurity: number;
  
  // Transparencia y Participación
  openData: number;
  citizenEngagement: number;
};

const SimulationPanel = () => {
  const [levers, setLevers] = useState<Levers>({
    processAutomation: 40,
    resourceOptimization: 50,
    greenPolicies: 30,
    aiAndCloud: 20,
    interoperability: 30,
    cyberSecurity: 50,
    openData: 40,
    citizenEngagement: 30
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Simulation Algorithm (Weighted projection based on pillars)
  useEffect(() => {
    const data = [];
    const currentYear = new Date().getFullYear();
    
    // Efficiency: Driven by Automation, Resources, and Tech Interoperability
    const efficiencyBase = (
      levers.processAutomation * 0.35 + 
      levers.resourceOptimization * 0.25 + 
      levers.interoperability * 0.2 + 
      levers.aiAndCloud * 0.2
    );

    // Trust/Satisfaction: Driven by Transparency, Engagement, Green Policies and Security
    const trustBase = (
      levers.openData * 0.3 + 
      levers.citizenEngagement * 0.3 + 
      levers.greenPolicies * 0.2 + 
      levers.cyberSecurity * 0.2
    );
    
    for (let i = 0; i <= 10; i++) {
      // Curve function to simulate adoption over time
      const growthFactor = Math.log(i + 2) / 2; 
      
      data.push({
        year: currentYear + i,
        efficiency: Math.min(100, 40 + (efficiencyBase * growthFactor * 0.5)),
        trust: Math.min(100, 50 + (trustBase * growthFactor * 0.3) + (i * 0.5)),
        cost: Math.max(20, 100 - (efficiencyBase * growthFactor * 0.4)), // Cost goes down as efficiency goes up
      });
    }
    setChartData(data);
  }, [levers]);

  const handleLeverChange = (key: keyof Levers, value: number) => {
    setLevers(prev => ({ ...prev, [key]: value }));
  };

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeSimulationScenario(levers);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-slate-50 min-h-[600px] flex flex-col rounded-xl overflow-hidden border border-gray-200">
      
      {/* 1. TOP SECTION: VISUALIZATION (En-ROADS style) */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-64">
          
          {/* Chart 1: Efficiency & Cost */}
          <div className="bg-gray-50 rounded-lg p-3 relative border border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 flex justify-between">
              <span>Eficiencia Operativa vs Coste</span>
              <span className="text-blue-600">{Math.round(chartData[10]?.efficiency)}% Target</span>
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{fontSize: '12px'}} />
                <Area type="monotone" dataKey="efficiency" stroke="#2563eb" fillOpacity={1} fill="url(#colorEff)" name="Eficiencia" />
                <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Coste Admin." />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Citizen Trust */}
          <div className="bg-gray-50 rounded-lg p-3 relative border border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 flex justify-between">
              <span>Satisfacción y Confianza</span>
              <span className="text-green-600">+{Math.round(chartData[10]?.trust - chartData[0]?.trust)} pts</span>
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{fontSize: '12px'}} />
                <Line type="monotone" dataKey="trust" stroke="#10b981" strokeWidth={3} dot={false} name="Confianza" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="absolute top-10 right-10 text-right">
              <div className="text-3xl font-bold text-gray-800">
                {Math.round(chartData[chartData.length-1]?.trust)}/100
              </div>
              <div className="text-xs text-gray-500">Índice Proyectado 2034</div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM SECTION: LEVERS (Control Panel) */}
      <div className="flex-1 p-6 bg-slate-100 overflow-y-auto">
        
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Panel de Control por Pilares</h3>
            <p className="text-xs text-gray-500">Ajusta las palancas estratégicas para simular el impacto en la administración pública.</p>
          </div>
          <button 
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow-sm disabled:opacity-50"
          >
            {isAnalyzing ? 'Procesando...' : 'Analizar Escenario con IA'}
            <Zap size={16} className="ml-2 text-yellow-400" />
          </button>
        </div>

        {/* AI Analysis Result Box */}
        {aiAnalysis && (
          <div className="mb-6 bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm text-sm text-gray-700 animate-fade-in">
            <strong className="block text-purple-700 mb-1">Análisis de Estrategia:</strong>
            {aiAnalysis}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PILAR 1: EFICIENCIA Y SOSTENIBILIDAD */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-amber-500">
            <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-2">
              <Leaf size={18} className="text-amber-600" />
              <h4 className="font-bold text-gray-700 text-sm">Eficiencia y Sostenibilidad</h4>
            </div>
            <div className="space-y-5">
              <Lever label="Automatización de Procesos" value={levers.processAutomation} onChange={(v) => handleLeverChange('processAutomation', v)} leftLabel="Manual" rightLabel="IA/RPA" />
              <Lever label="Optimización de Recursos" value={levers.resourceOptimization} onChange={(v) => handleLeverChange('resourceOptimization', v)} leftLabel="Baja" rightLabel="Lean" />
              <Lever label="Políticas Verdes (ESG)" value={levers.greenPolicies} onChange={(v) => handleLeverChange('greenPolicies', v)} leftLabel="Minimo" rightLabel="NetZero" />
            </div>
          </div>

          {/* PILAR 2: TRANSFORMACIÓN DIGITAL */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-blue-500">
             <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-2">
              <Cpu size={18} className="text-blue-600" />
              <h4 className="font-bold text-gray-700 text-sm">Transformación Digital</h4>
            </div>
            <div className="space-y-5">
              <Lever label="Adopción Cloud & IA" value={levers.aiAndCloud} onChange={(v) => handleLeverChange('aiAndCloud', v)} leftLabel="On-Prem" rightLabel="Cloud-First" />
              <Lever label="Interoperabilidad" value={levers.interoperability} onChange={(v) => handleLeverChange('interoperability', v)} leftLabel="Silos" rightLabel="Conectado" />
              <Lever label="Ciberseguridad" value={levers.cyberSecurity} onChange={(v) => handleLeverChange('cyberSecurity', v)} leftLabel="Básica" rightLabel="Avanzada" />
            </div>
          </div>

          {/* PILAR 3: TRANSPARENCIA Y PARTICIPACIÓN */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-green-500">
             <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-2">
              <Eye size={18} className="text-green-600" />
              <h4 className="font-bold text-gray-700 text-sm">Transparencia y Participación</h4>
            </div>
            <div className="space-y-5">
              <Lever label="Datos Abiertos (Open Data)" value={levers.openData} onChange={(v) => handleLeverChange('openData', v)} leftLabel="Opaco" rightLabel="Total" />
              <Lever label="Participación Ciudadana" value={levers.citizenEngagement} onChange={(v) => handleLeverChange('citizenEngagement', v)} leftLabel="Consultiva" rightLabel="Co-creación" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Slider Component
const Lever: React.FC<{ 
  label: string; 
  value: number; 
  onChange: (val: number) => void;
  leftLabel: string;
  rightLabel: string;
}> = ({ label, value, onChange, leftLabel, rightLabel }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-xs font-semibold text-gray-700">{label}</label>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400 font-medium">{leftLabel}</span>
        <span className="text-[10px] text-gray-400 font-medium">{rightLabel}</span>
      </div>
    </div>
  );
};