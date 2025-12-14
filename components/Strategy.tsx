import React, { useState } from 'react';
import { PolicyAlert } from '../types';
import { Search, AlertCircle, ArrowRight, ExternalLink, Bot } from 'lucide-react';
import { analyzePolicyDocument, summarizeLaw } from '../services/geminiService';

export const Strategy: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [policyText, setPolicyText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  // Data updated to Basque Country context
  const alerts: PolicyAlert[] = [
    { 
      id: '1', 
      title: 'Plan Estratégico de Gobernanza e Innovación Pública (Ardatz 2030)', 
      expirationDate: '2025-06-30', 
      severity: 'high', 
      description: 'Nuevos hitos para la integridad, transparencia y participación en la administración vasca.', 
      source: 'Euskadi.eus',
      url: 'https://www.euskadi.eus/gobierno-vasco/plan-estrategico-gobernanza-innovacion-publica/'
    },
    { 
      id: '2', 
      title: 'PCTI 2030 Euskadi', 
      expirationDate: '2024-12-15', 
      severity: 'high', 
      description: 'Convocatorias inminentes para I+D+i enfocadas en digitalización industrial y salud.', 
      source: 'Lehendakaritza',
      url: 'https://www.euskadi.eus/plan-ciencia-tecnologia-innovacion/web01-a2lhenda/es/'
    },
    { 
      id: '3', 
      title: 'Presupuestos Generales Euskadi 2025 (Borrador)', 
      expirationDate: '2024-10-20', 
      severity: 'medium', 
      description: 'Asignación de partidas para modernización de infraestructuras TI en Osakidetza.', 
      source: 'Hacienda',
      url: 'https://www.euskadi.eus/presupuestos-generales-de-euskadi/web01-a2ogasun/es/'
    },
  ];

  const handlePolicyAnalysis = async () => {
    if (!policyText.trim()) return;
    setAnalyzing(true);
    const result = await analyzePolicyDocument(policyText);
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  const handleSummarize = async (alert: PolicyAlert) => {
    setSummarizingId(alert.id);
    const summary = await summarizeLaw(alert.title, alert.description);
    setSummaries(prev => ({...prev, [alert.id]: summary}));
    setSummarizingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Estrategia & Inteligencia Regulatoria (País Vasco)</h2>
        <p className="text-gray-500">Monitoreo de planes estratégicos, leyes autonómicas y oportunidades locales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Automatic Alerts List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center">
            <AlertCircle className="mr-2 text-blue-600" size={20} />
            Planes y Leyes Vigentes
          </h3>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-l-red-500 transition-all hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{alert.description}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">Vence: {alert.expirationDate}</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-medium">{alert.source}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                     {alert.url && (
                        <a 
                          href={alert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Ver fuente oficial"
                        >
                          <ExternalLink size={20} />
                        </a>
                     )}
                  </div>
                </div>

                {/* AI Summary Section */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    {summaries[alert.id] ? (
                        <div className="bg-purple-50 p-3 rounded-md text-sm text-purple-800 animate-fade-in">
                            <div className="flex items-center mb-1 font-semibold">
                                <Bot size={14} className="mr-1" /> Resumen IA:
                            </div>
                            <p>{summaries[alert.id]}</p>
                        </div>
                    ) : (
                        <button 
                            onClick={() => handleSummarize(alert)}
                            disabled={summarizingId === alert.id}
                            className="text-xs flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
                        >
                            <Bot size={14} className="mr-1" />
                            {summarizingId === alert.id ? 'Generando resumen...' : 'Generar resumen con IA'}
                        </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analyzer Tool */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Search className="mr-2 text-purple-600" size={20} />
            Analizador de Normativa (IA)
          </h3>
          <p className="text-sm text-gray-500 mb-3">
             Pega aquí texto de boletines oficiales (BOPV) o pliegos para extraer insights estratégicos.
          </p>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Pegar texto del documento..."
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <button
              onClick={handlePolicyAnalysis}
              disabled={analyzing || !policyText}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center shadow-sm"
            >
              {analyzing ? 'Analizando...' : 'Analizar Impacto'}
              {!analyzing && <ArrowRight size={16} className="ml-2" />}
            </button>
          </div>
          
          {analysisResult && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100 text-sm text-gray-800 whitespace-pre-line animate-fade-in shadow-inner max-h-96 overflow-y-auto">
              <h4 className="font-bold mb-2 text-purple-800 flex items-center">
                  <Bot size={16} className="mr-2"/> Resultado del Análisis:
              </h4>
              {analysisResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};