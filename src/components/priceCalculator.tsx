import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2 } from "lucide-react";

export default function Component() {
  const [costoProduccion, setCostoProduccion] = useState("");
  const [montoMeta, setMontoMeta] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [calculando, setCalculando] = useState(false);

  const calcularProductosNecesarios = () => {
    setCalculando(true);
    setResultado(null);

    // Simulamos un proceso de cálculo con un timeout
    setTimeout(() => {
      const costo = parseFloat(costoProduccion);
      const meta = parseFloat(montoMeta);

      if (isNaN(costo) || isNaN(meta) || costo <= 0) {
        alert("Por favor, ingrese valores numéricos válidos mayores que cero.");
        setCalculando(false);
        return;
      }

      const productosNecesarios = Math.ceil(meta / costo);
      setResultado(productosNecesarios);
      setCalculando(false);
    }, 1500); // 1.5 segundos de "cálculo"
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Calculadora de Ventas
      </h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="costoProduccion"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Costo de producción por producto (en soles):
          </label>
          <Input
            id="costoProduccion"
            type="number"
            value={costoProduccion}
            onChange={e => setCostoProduccion(e.target.value)}
            placeholder="Ej. 15"
            className="w-full"
          />
        </div>
        <div>
          <label
            htmlFor="montoMeta"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Monto meta a ganar (en soles):
          </label>
          <Input
            id="montoMeta"
            type="number"
            value={montoMeta}
            onChange={e => setMontoMeta(e.target.value)}
            placeholder="Ej. 15000"
            className="w-full"
          />
        </div>
        <Button
          onClick={calcularProductosNecesarios}
          disabled={calculando}
          className="w-full"
        >
          {calculando ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculando...
            </>
          ) : (
            "Calcular"
          )}
        </Button>
        {resultado !== null && (
          <div className="p-4 mt-4 bg-green-100 rounded-md">
            <p className="font-semibold text-center text-green-800">
              Necesitas vender <span className="text-2xl">{resultado}</span>{" "}
              productos para alcanzar tu meta de {montoMeta} soles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
