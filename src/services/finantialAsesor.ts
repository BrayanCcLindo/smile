import { useState } from "react";

// Definición de tipos
type FinancialType = {
  honorarios: string;
  materiales: string;
  consultorias: string;
  pasajes: string;
};

interface GastoAnual {
  Categoria: string;
  Descripcion: string;
  Costo: number;
}

interface PlanFinanciero {
  gastos_anuales: GastoAnual[];
  descripcion_general: string;
}

interface ErrorResponse {
  message: string;
  status?: number;
}

// Hook principal
export const useGetFinancial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [data, setData] = useState<PlanFinanciero | null>(null);

  const fetchFinancialData = async (
    financialData: FinancialType
  ): Promise<PlanFinanciero> => {
    try {
      setIsLoading(true);
      setError(null);

      // Configuración de la petición
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(financialData)
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_ASSISTANT_AI_URL}`,
        requestConfig
      );
      if (!response.ok) {
        throw new Error(
          `Error en la petición: ${response.status} ${response.statusText}`
        );
      }
      const responseData: PlanFinanciero = await response.json();

      if (!responseData || typeof responseData !== "object") {
        throw new Error("Respuesta inválida del servidor");
      }

      setData(responseData);
      return responseData;
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: error instanceof Error ? error.message : "Error desconocido",
        status:
          error instanceof Error && "status" in error
            ? (error as any).status
            : undefined
      };

      setError(errorResponse);
      throw errorResponse;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    fetchFinancialData,
    isLoading,
    error,
    data,
    resetError: () => setError(null),
    resetData: () => setData(null)
  };
};
