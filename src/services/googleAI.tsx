import { GoogleGenerativeAI } from "@google/generative-ai";

interface CampaignOptimization {
  title: string[];
  description: string[];
  keywords: string[];
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_GEMINI_AI);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const optimizeCampaign = async (
  title: string,
  description: string
): Promise<CampaignOptimization> => {
  const prompt = `Optimiza esta campaña de crowdfunding:
Título: "${title}"
Descripción: "${description}"

Responde solo en JSON:
{
  "title": ["3 títulos alternativos"],
  "description": ["3 descripciones mejoradas"],
}`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
