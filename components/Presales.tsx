import React, { useState, useEffect } from 'react';
import { GoNoGoCriteria, TenderAnalysisResult } from '../types';
import { FileText, Calculator, Check, X, BarChart3, ArrowRight, ExternalLink, Database, Search, Calendar, DollarSign, Clock, Layers, Zap } from 'lucide-react';
import { evaluateTenderRisk } from '../services/geminiService';

export const Presales: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tenders' | 'matrix'>('tenders');
  const [analyzedData, setAnalyzedData] = useState<TenderAnalysisResult | null>(null);
  
  return (
    <div className="space-y-6">
       <div className="flex space-x-4 border-b border-gray-200 pb-2">
        <button 
          onClick={() => setActiveTab('tenders')}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${activeTab === 'tenders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          1. Búsqueda y Análisis
        </button>
        <button 
          onClick={() => setActiveTab('matrix')}
          disabled={!analyzedData}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${activeTab === 'matrix' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
        >
          2. Decisión Go/No Go (Automatizada)
        </button>
      </div>

      {activeTab === 'tenders' ? (
        <TenderAnalysis 
          onAnalysisComplete={(data) => setAnalyzedData(data)} 
          onProceed={() => setActiveTab('matrix')} 
        /> 
      ) : (
        <GoNoGoMatrix data={analyzedData} />
      )}
    </div>
  );
};

const TenderAnalysis: React.FC<{ 
  onAnalysisComplete: (data: TenderAnalysisResult) => void;
  onProceed: () => void;
}> = ({ onAnalysisComplete, onProceed }) => {
  const [tenderInput, setTenderInput] = useState('');
  const [rawResult, setRawResult] = useState<TenderAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if(!tenderInput) return;
    setLoading(true);
    const jsonString = await evaluateTenderRisk(tenderInput);
    try {
        const result: TenderAnalysisResult = JSON.parse(jsonString);
        setRawResult(result);
        onAnalysisComplete(result);
    } catch (e) {
        console.error("Error parsing AI response", e);
    }
    setLoading(false);
  };

  const handleSimulateCase = () => {
    setLoading(true);
    // Demo data for Basque Country context
    const demoData: TenderAnalysisResult = {
        title: "Licitación: Plataforma de Big Data e IA para Osakidetza",
        budget: 450000,
        // Set deadline 20 days from now to ensure "Optimal" score
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        durationMonths: 12,
        requiredTechnologies: ["Big Data", "IA", "Cloud Azure", "Python", "Seguridad"],
        riskSummary: "SIMULACIÓN: Oportunidad de alto valor alineada con la estrategia de salud digital del Gobierno Vasco. El presupuesto es adecuado y disponemos de credenciales sólidas en el sector. Riesgo técnico bajo."
    };

    setTimeout(() => {
        setRawResult(demoData);
        onAnalysisComplete(demoData);
        setTenderInput("Texto simulado del pliego: Contratación de servicios de consultoría y desarrollo para la implantación de una plataforma de análisis de datos sanitarios...");
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Step 1: External Search */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <Search size={20} className="mr-2" /> Paso 1: Buscar Licitación
            </h3>
            <p className="text-sm text-blue-700 mb-4">
                Accede a la Plataforma de Contratación del Sector Público para encontrar oportunidades vigentes.
            </p>
            <a 
                href="https://contrataciondelestado.es/wps/portal/plataforma/empresas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
                Abrir Plataforma de Contratación <ExternalLink size={16} className="ml-2" />
            </a>
        </div>

        {/* Step 2: Import & Analyze */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Paso 2: Importar Pliego</h3>
            <p className="text-sm text-gray-500 mb-4">Copia y pega el resumen técnico o administrativo de la licitación para extraer datos automáticamente.</p>
            <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 resize-none mb-4 font-mono bg-gray-50"
            placeholder="Pegar contenido del pliego aquí..."
            value={tenderInput}
            onChange={(e) => setTenderInput(e.target.value)}
            />
            
            <div className="flex gap-3">
                <button 
                onClick={handleAnalyze}
                disabled={loading || !tenderInput}
                className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                {loading ? (
                    <span>Procesando...</span>
                ) : (
                    <>
                    <Database size={18} className="mr-2" /> Analizar Real
                    </>
                )}
                </button>

                <button 
                onClick={handleSimulateCase}
                disabled={loading}
                className="px-4 py-3 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center"
                title="Simular un caso de éxito para demo"
                >
                    <Zap size={18} className="mr-2" /> Simular Demo
                </button>
            </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800">Resultado de Extracción (IA)</h3>
          {rawResult && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Datos Estructurados</span>}
        </div>
        
        {rawResult ? (
           <div className="flex-1 flex flex-col space-y-4 animate-fade-in">
             <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-semibold w-24">Deadline:</span> {rawResult.deadline}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-semibold w-24">Presupuesto:</span> {rawResult.budget > 0 ? `€${rawResult.budget.toLocaleString()}` : 'No especificado'}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-amber-500" />
                    <span className="font-semibold w-24">Duración:</span> {rawResult.durationMonths} meses
                </div>
                 <div className="flex items-center text-sm text-gray-600">
                    <Layers className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="font-semibold w-24">Tecnología:</span> 
                    <div className="flex flex-wrap gap-1">
                        {rawResult.requiredTechnologies.map(t => (
                            <span key={t} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{t}</span>
                        ))}
                    </div>
                </div>
             </div>

             <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1">
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Resumen de Riesgos</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{rawResult.riskSummary}</p>
             </div>
             
             <div className="pt-4">
               <button 
                onClick={onProceed}
                className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow-md text-sm font-bold hover:bg-blue-700 transition-transform active:scale-95"
               >
                 Ver Matriz Calculada <ArrowRight size={18} className="ml-2" />
               </button>
             </div>
           </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <BarChart3 size={48} className="mb-4 opacity-50" />
            <p className="text-center text-sm px-8">Los datos extraídos de la licitación aparecerán aquí para alimentar la matriz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GoNoGoMatrix: React.FC<{ data: TenderAnalysisResult | null }> = ({ data }) => {
  const [criteria, setCriteria] = useState<GoNoGoCriteria[]>([]);
  
  // COMPANY CONSTANTS FOR LOGIC
  const COMPANY_CREDENTIALS = ['Big Data', 'IA', 'SAP', 'Cloud', 'Transformación Digital', 'Java', 'React', 'Cybersecurity'];
  const ACTIVE_PROJECTS_LIMIT = 20;
  const CURRENT_ACTIVE_PROJECTS = 14; // Mock current load
  const SALES_GOAL_THRESHOLD = 200000; // 200k Euros

  useEffect(() => {
    if (!data) return;

    // 1. TIME CALCULATION
    const today = new Date();
    const deadlineDate = new Date(data.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let timeScore = 0;
    let timeExp = "";
    if (diffDays < 7) {
        timeScore = 2;
        timeExp = `Crítico: Solo quedan ${diffDays} días.`;
    } else if (diffDays < 14) {
        timeScore = 6;
        timeExp = `Aceptable: ${diffDays} días restantes.`;
    } else {
        timeScore = 10;
        timeExp = `Óptimo: ${diffDays} días para preparar oferta.`;
    }

    // 2. BUDGET CALCULATION
    let budgetScore = 0;
    let budgetExp = "";
    if (data.budget === 0) {
        budgetScore = 1;
        budgetExp = "Desconocido: Riesgo alto.";
    } else if (data.budget < SALES_GOAL_THRESHOLD) {
        budgetScore = 4;
        budgetExp = `Bajo: €${data.budget.toLocaleString()} < Meta de €${SALES_GOAL_THRESHOLD.toLocaleString()}.`;
    } else {
        budgetScore = 10;
        budgetExp = `Alto: Impacto significativo en cuota.`;
    }

    // 3. DURATION / RESOURCE VALIDATION
    // Logic: If we have space for more projects (Limit - Active > 0)
    const capacity = ACTIVE_PROJECTS_LIMIT - CURRENT_ACTIVE_PROJECTS;
    let durationScore = 0;
    let durationExp = "";
    if (capacity > 2) {
        durationScore = 9;
        durationExp = `Disponible: Capacidad para ${capacity} proyectos más.`;
    } else {
        durationScore = 4;
        durationExp = `Saturado: Equipos al límite.`;
    }

    // 4. CREDENTIAL VALIDATION
    // Logic: Intersect required technologies with company credentials
    const matches = data.requiredTechnologies.filter(tech => 
        COMPANY_CREDENTIALS.some(cred => cred.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(cred.toLowerCase()))
    );
    const matchPercentage = data.requiredTechnologies.length > 0 ? matches.length / data.requiredTechnologies.length : 0;
    
    let credScore = 0;
    let credExp = "";
    if (matchPercentage > 0.7) {
        credScore = 10;
        credExp = "Excelente: Coincidencia alta con portfolio.";
    } else if (matchPercentage > 0.3) {
        credScore = 5;
        credExp = "Parcial: Se requieren socios externos.";
    } else {
        credScore = 2;
        credExp = "Nula: Sin experiencia demostrable.";
    }

    const calculatedCriteria: GoNoGoCriteria[] = [
        { id: '1', question: 'Tiempo de Entrega (vs Fecha Actual)', weight: 3, score: timeScore, autoExplanation: timeExp },
        { id: '2', question: 'Impacto Presupuestario (vs Meta Ventas)', weight: 2, score: budgetScore, autoExplanation: budgetExp },
        { id: '3', question: 'Disponibilidad Recursos (vs Proyectos Activos)', weight: 2, score: durationScore, autoExplanation: durationExp },
        { id: '4', question: 'Validación Credenciales (vs Base de Datos)', weight: 4, score: credScore, autoExplanation: credExp },
        { id: '5', question: 'Relación con el Decisor (Manual)', weight: 1, score: 5, autoExplanation: 'Evaluación subjetiva requerida.' }, // Manual fallback
    ];

    setCriteria(calculatedCriteria);
  }, [data]);

  const calculateTotal = () => {
    let totalScore = 0;
    let maxScore = 0;
    criteria.forEach(c => {
      totalScore += c.score * c.weight;
      maxScore += 10 * c.weight;
    });
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const finalScore = calculateTotal();
  const decision = finalScore >= 70 ? 'GO' : finalScore >= 40 ? 'REVIEW' : 'NO GO';
  const decisionColor = finalScore >= 70 ? 'bg-green-500' : finalScore >= 40 ? 'bg-amber-500' : 'bg-red-500';

  if (!data) return <div>No data loaded.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div>
            <h3 className="text-xl font-bold text-gray-800">Matriz de Decisión Automatizada</h3>
            <p className="text-gray-500 text-sm">Calculada en base a la licitación: <span className="font-semibold">{data.title}</span></p>
        </div>
        <div className="text-xs text-right text-gray-400">
            <p>Meta Ventas: €{(200000).toLocaleString()}</p>
            <p>Capacidad Actual: {14}/{20} Proyectos</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 space-y-6">
          {criteria.map(criterion => (
            <div key={criterion.id} className="space-y-2 border-b border-gray-50 pb-4 last:border-0">
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700 text-sm">{criterion.question}</label>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 italic">{criterion.autoExplanation}</span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-100">Peso: {criterion.weight}x</span>
                </div>
              </div>
              {/* Read-only progress bar instead of slider for automated feeling */}
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                 <div className="bg-slate-800 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${criterion.score * 10}%` }}></div>
              </div>
              <div className="flex justify-end text-xs text-gray-500 font-mono">
                <span className="font-bold text-slate-800 text-base">{criterion.score}/10</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-8 flex flex-col items-center justify-center border-l border-gray-100">
          <div className="text-center w-full">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-6">Resultado Recomendado</h4>
            
            <div className={`w-40 h-40 rounded-full ${decisionColor} text-white flex flex-col items-center justify-center shadow-xl mb-8 mx-auto transition-colors duration-500 border-4 border-white`}>
              <span className="text-4xl font-bold">{finalScore}%</span>
              <span className="text-xs opacity-80 uppercase mt-1">Score</span>
            </div>
            
            <div className={`text-3xl font-black mb-3 tracking-tight ${
               finalScore >= 70 ? 'text-green-600' : finalScore >= 40 ? 'text-amber-600' : 'text-red-600'
            }`}>
              {decision}
            </div>
            
            <p className="text-sm text-gray-600 mb-8 px-4 leading-relaxed">
              {decision === 'GO' ? 'La oportunidad cumple con criterios de rentabilidad, disponibilidad y credenciales.' : 
               decision === 'REVIEW' ? 'Existen riesgos (presupuesto o plazos) que requieren aprobación de Dirección.' : 
               'No cumple con los mínimos estratégicos o de capacidad.'}
            </p>

            <button className="flex items-center justify-center space-x-2 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-sm font-bold">
              <FileText size={16} />
              <span>Generar Informe PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};