import React from 'react';
import { ExternalLink, BookOpen, Globe } from 'lucide-react';

export const Blog: React.FC = () => {
  const BLOG_URL = "https://www.deloitte.com/es/es/services/consulting/research/future-eu-policy.html";

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 animate-fade-in p-8 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe className="text-green-600" size={40} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Investigación y Políticas Europeas</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Accede al portal de conocimiento externo para consultar las últimas tendencias sobre el futuro de las políticas públicas en la UE.
        </p>

        <a 
          href={BLOG_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-xl group"
        >
          <BookOpen className="mr-3" size={20} />
          Leer Artículos en Deloitte Insights
          <ExternalLink className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform" size={18} />
        </a>
      </div>

      <div className="text-gray-400 text-sm">
        Nota: Serás redirigido a una página externa segura.
      </div>
    </div>
  );
};