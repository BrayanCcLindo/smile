import React, { useState } from "react";
import { optimizeCampaign } from "../services/googleAI";

const CampaignOptimizer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const result = await optimizeCampaign(title, description);
      setSuggestions(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div className="max-w-2xl p-4 mx-auto">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título de la campaña"
        className="w-full p-2 mb-4 border rounded"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descripción de la campaña"
        className="w-full h-32 p-2 mb-4 border rounded"
      />

      <button
        onClick={handleOptimize}
        disabled={loading}
        className="w-full p-2 text-white bg-blue-500 rounded"
      >
        {loading ? "Optimizando..." : "Optimizar"}
      </button>

      {suggestions && (
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="font-bold">Títulos Sugeridos:</h3>
            {suggestions.title.map((t: string, i: number) => (
              <button
                onClick={handleClick}
                key={i}
                className="p-2 my-1 rounded bg-gray-50"
                value={t}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold">Descripciones Sugeridas:</h3>
            {suggestions.description.map((d: string, i: number) => (
              <div key={i} className="p-2 my-1 rounded bg-gray-50">
                {d}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bold">Palabras Clave:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.keywords.map((k: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-blue-100 rounded">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignOptimizer;
