import * as Dialog from "@radix-ui/react-dialog";
import { Brain, X } from "lucide-react";
import { FormEvent, useState } from "react";
import AIButton from "../buttons/iaButton";
import { Label } from "../ui/label";
import { Controller, useForm, UseFormSetValue } from "react-hook-form";
import { useGetFinancial } from "../../services/finantialAsesor";
import { Input } from "../ui/input";
import FormErrors from "../formErrors";
import AILoader from "./assitanceLoader";
import { FormCampaign } from "../../pages/formAlbergue";

type AsistanceIAModal = {
  honorarios: string;
  materiales: string;
  consultorias: string;
  pasajes: string;
};

interface FinancialFormStepsProps {
  setValue: UseFormSetValue<FormCampaign>;
}

export default function FinancialFormSteps({
  setValue
}: FinancialFormStepsProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const { data: dataIA, fetchFinancialData, isLoading } = useGetFinancial();

  const {
    handleSubmit,
    control,
    formState: { errors: errorsModal }
  } = useForm<AsistanceIAModal>({
    defaultValues: {
      honorarios: "",
      materiales: "",
      consultorias: "",
      pasajes: ""
    }
  });

  const submitAsistanceIAModal = (e: FormEvent) => {
    if ((e.target as HTMLFormElement).id === "modalForm") {
      e.preventDefault();
      handleSubmit(data => {
        fetchFinancialData(data);
        setStep(2);
      })(e);
    }
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2
    }).format(amount);
  };

  const total = dataIA?.gastos_anuales.reduce(
    (sum, gasto) => sum + gasto.Costo,
    0
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <AIButton color="blue" type="button">
          <Brain className="w-4 h-4 animate-pulse" />
          Asistente Financiero
        </AIButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[700px] max-h-[85vh] overflow-y-auto rounded-lg bg-input_bg p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-50">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-2xl font-bold text-heading">
                PLAN FINANCIERO
              </Dialog.Title>
              <div className="flex items-center gap-2 text-sm text-content_text">
                <span
                  className={step === 1 ? "text-main" : "text-content_text"}
                >
                  Paso 1
                </span>
                <span>→</span>
                <span
                  className={step === 2 ? "text-main" : "text-content_text"}
                >
                  Paso 2
                </span>
              </div>
            </div>
            <div className="w-full h-1 rounded-full bg-card_border">
              <div
                className="h-full transition-all duration-300 rounded-full bg-main"
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>

          {step === 1 ? (
            <form
              onSubmit={submitAsistanceIAModal}
              id="modalForm"
              className="space-y-6"
            >
              {sections.map(section => (
                <div
                  key={section.id}
                  className="border rounded-lg shadow-sm border-card_border text-content_text bg-input_bg"
                >
                  <div className="p-6 space-y-4">
                    <div>
                      <Label
                        htmlFor={section.id}
                        className="text-base font-bold"
                      >
                        {section.title}
                      </Label>
                      <p className="text-sm">{section.description}</p>
                    </div>
                    <div className="space-y-2">
                      {/* <p className="text-sm">{section.example}</p> */}
                      <Controller
                        name={section.id as keyof AsistanceIAModal}
                        control={control}
                        rules={{
                          required: "El campo es requerido"
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id={section.id}
                            placeholder={section.example}
                          />
                        )}
                      />
                      {errorsModal[section.id as keyof AsistanceIAModal] && (
                        <FormErrors>
                          {
                            errorsModal[section.id as keyof AsistanceIAModal]
                              ?.message
                          }{" "}
                        </FormErrors>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <AIButton color="blue" type="submit">
                GENERAR PLAN FINANCIERO
              </AIButton>
            </form>
          ) : (
            <>
              {!isLoading && dataIA ? (
                <div className="space-y-6">
                  <div className="border rounded-md border-card_border">
                    <table className="w-full text-sm caption-bottom text-content_text">
                      <thead>
                        <tr className="border-b border-card_border text-heading">
                          <th className="h-12 px-4 font-medium text-left align-middle">
                            Categoría
                          </th>
                          <th className="h-12 px-4 font-medium text-left align-middle">
                            Descripción
                          </th>
                          <th className="h-12 px-4 font-medium text-right align-middle">
                            Costo Estimado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataIA.gastos_anuales.map((gasto, index) => (
                          <tr
                            key={index}
                            className="border-b border-card_border hover:bg-[--muted]"
                          >
                            <td className="p-4 font-medium align-middle">
                              {gasto.Categoria}
                            </td>
                            <td className="p-4 align-middle">
                              {gasto.Descripcion}
                            </td>
                            <td className="p-4 text-right align-middle">
                              {formatCurrency(gasto.Costo)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t border-card_border text-heading">
                          <td className="p-4 font-medium align-middle">
                            TOTAL
                          </td>
                          <td className="p-4 align-middle"></td>
                          <td className="p-4 font-bold text-right align-middle">
                            {total !== undefined
                              ? formatCurrency(total)
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-heading">CONCLUSIÓN</h3>
                    <p className="text-sm text-content_text">
                      {dataIA.descripcion_general}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <AIButton onClick={() => setStep(1)}>
                      Volver a Editar
                    </AIButton>

                    <AIButton
                      color="blue"
                      onClick={() => {
                        setOpen(false);
                        setValue("meta", total?.toString() || "0");
                        window.scrollTo(0, 0);
                      }}
                      type="button"
                    >
                      Guardar Plan Financiero
                    </AIButton>
                  </div>
                </div>
              ) : (
                <AILoader />
              )}
            </>
          )}

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[--background] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[--accent] data-[state=open]:text-[--muted-foreground]">
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const sections = [
  {
    id: "honorarios",
    title: "HONORARIOS",
    description:
      "Remuneración pagada al personal interno por su trabajo en el proyecto, ya sea por tiempo completo o parcial.",
    example:
      "Ejemplo: Se necesita un coordinador del proyecto por 2000 soles mensuales",
    placeholder: "Ingrese los honorarios"
  },
  {
    id: "materiales",
    title: "MATERIALES E INSUMOS",
    description:
      "Bienes consumibles necesarios para llevar a cabo actividades del proyecto.",
    example:
      "Ejemplo: Se necesita comprar papel, tinta y carpetas para la elaboración de informes",
    placeholder: "Ingrese los materiales necesarios"
  },
  {
    id: "consultorias",
    title: "CONSULTORÍAS",
    description:
      "Contratación de expertos externos para brindar asesoría o realizar tareas específicas.",
    example:
      "Ejemplo: Se necesita contratar un consultor en marketing digital para desarrollar una estrategia",
    placeholder: "Ingrese las consultorías requeridas"
  },
  {
    id: "pasajes",
    title: "PASAJES Y VIÁTICOS",
    description:
      "Gastos relacionados con viajes necesarios para el desarrollo del proyecto, incluyendo transporte, alojamiento y alimentación.",
    example:
      "Ejemplo: Se compraran boletos de avión para asistir a una conferencia en otra ciudad (300) y gastos de hotel",
    placeholder: "Ingrese los gastos de viaje"
  }
];
