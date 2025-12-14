import { GoogleGenAI, SchemaType } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const analyzePolicyDocument = async (text: string): Promise<string> => {
  try {
    const prompt = `
      Analiza el siguiente texto de un documento de política pública o normativa (contexto País Vasco/España).
      Identifica:
      1. Fechas clave de vencimiento.
      2. Riesgos potenciales de cumplimiento.
      3. Oportunidades de negocio para una consultora estratégica.
      
      Formatea la respuesta en Markdown con viñetas claras.
      
      Texto del documento:
      "${text}"
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error) {
    console.error("Error analyzing policy:", error);
    return "Error al conectar con el servicio de análisis de IA.";
  }
};

export const summarizeLaw = async (lawTitle: string, description: string): Promise<string> => {
    try {
        const prompt = `
          Actúa como un analista regulatorio experto en el Gobierno Vasco.
          Genera un resumen ejecutivo breve (máximo 3 puntos clave) sobre la siguiente normativa o plan:
          Título: "${lawTitle}"
          Contexto: "${description}"
          
          Enfócate en el impacto para la administración pública y proveedores tecnológicos.
        `;
    
        const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: prompt,
        });
    
        return response.text || "No se pudo generar el resumen.";
      } catch (error) {
        console.error("Error summarizing law:", error);
        return "Error al generar resumen.";
      }
}

export const generateTrainingScenario = async (topic: string, role: string): Promise<string> => {
  try {
    const prompt = `
      Actúa como un experto en consultoría para el sector público.
      Genera un escenario de simulación corto (1 párrafo) y 3 preguntas de reflexión para un estudiante de tipo "${role}" sobre el tema: "${topic}".
      El objetivo es persuadir sobre la necesidad de modernización.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "No se pudo generar el escenario.";
  } catch (error) {
    console.error("Error generating training:", error);
    return "Error al generar contenido formativo.";
  }
};

// Updated to return JSON string for parsing
export const evaluateTenderRisk = async (tenderDescription: string): Promise<string> => {
  try {
    const prompt = `
      Analiza el siguiente resumen de un pliego de licitación pública:
      "${tenderDescription}"
      
      Actúa como un Director de Preventa. Extrae los datos clave en formato JSON estrictamente.
      
      Debes devolver un JSON con la siguiente estructura:
      {
        "title": "Titulo corto inferido",
        "budget": 0 (numero estimado en Euros, pon 0 si no se encuentra),
        "deadline": "YYYY-MM-DD" (fecha estimada futura, si no hay, pon una fecha en 15 dias),
        "durationMonths": 0 (duracion estimada del proyecto en meses),
        "requiredTechnologies": ["tech1", "tech2"],
        "riskSummary": "Resumen de riesgos y recomendación en texto plano"
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Error evaluating tender:", error);
    return JSON.stringify({ error: "Error en el servicio de evaluación." });
  }
};

export const analyzeSimulationScenario = async (params: Record<string, number>): Promise<string> => {
  try {
    const inputs = JSON.stringify(params);
    const prompt = `
      Actúa como un planificador estratégico gubernamental.
      Se ha configurado una simulación de políticas públicas con los siguientes niveles de inversión/esfuerzo (0-100):
      ${inputs}
      
      Predice:
      1. El impacto a 5 años en la calidad de vida ciudadana.
      2. Un riesgo potencial de esta configuración (ej. déficit fiscal si el gasto es muy alto, o descontento si es bajo).
      3. Una recomendación de ajuste.
      
      Sé conciso (máximo 150 palabras).
    `;
    
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
    });
    return response.text || "No se pudo generar el análisis de simulación.";
  } catch (error) {
      console.error("Error analyzing simulation", error);
      return "Error analizando la simulación.";
  }
}