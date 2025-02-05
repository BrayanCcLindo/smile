import { AlertCircle, Loader, Sparkles } from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import { useGetUserData } from "../Api/getUserData";
import { useGetCampaigns } from "../Api/getCampaigns";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DragEvent, FormEvent, useState } from "react";
import { db } from "../firebase/firebase";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MainButton } from "../components/buttons/mainLinkButton";
import { useForm, Controller } from "react-hook-form";
import FormErrors from "../components/formErrors";
import { createSubmitHandler } from "../Api/createCampaignForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { SmileType } from "../type/types";
import { optimizeCampaign } from "../services/googleAI";
import { Button } from "../components/buttons/button";
import AIButton from "../components/buttons/iaButton";
import FinancialFormSteps from "../components/assistanceIA/assistanceModalSteps";
import { FormCampaign } from "./formAlbergue";
import Tooltip from "../components/ui/tooltip";

// type FormCampaign = {
//   campaña: string;
//   description: string;
//   category: string;
//   address: string;
//   meta: string;
//   file: FileList;
//   proxy: string;
//   dni: string;
// };

function FormEmprendedor() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { stateProfile } = useSmileContext();
  const { user } = useGetUserData();
  const { data } = useGetCampaigns();
  const [showOptions, setShowOptions] = useState({
    title: true,
    description: true
  });

  const MAX_FILE_SIZE = 770000;
  const categories = [
    { value: "Educación", label: "Educación" },
    { value: "Salud", label: "Salud" },
    { value: "Tecnología", label: "Tecnología" },
    { value: "Entretenimiento", label: "Entretenimiento" },
    { value: "Deportes", label: "Deportes" },
    { value: "Negocios", label: "Negocios" }
  ];

  const {
    handleSubmit: handleMainForm,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormCampaign>({
    defaultValues: {
      campaña: "",
      description: "",
      category: "",
      address: "",
      meta: "",
      file: undefined,
      proxy: "",
      dni: ""
    }
  });

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    handleDrag(e);
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    handleDrag(e);
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size < MAX_FILE_SIZE) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImage(reader.result as string);
        });
        reader.readAsDataURL(file);
      } else {
        toast.error("El archivo es demasiado grande. El tamaño máximo es 5MB", {
          duration: 2000,
          position: "top-right"
        });
      }
    }
  };

  const socialData = createSubmitHandler({
    db,
    collectionName: "campañas",
    data,
    stateProfile,
    user,
    image
  });
  const submitCampaign = (e: FormEvent) => {
    if ((e.target as HTMLFormElement).id === "mainForm") {
      e.preventDefault();
      handleMainForm(values => {
        socialData(values, SmileType.Emprendedores, setIsLoading);
      })(e);
    }
  };

  const handleOptimize = async () => {
    const isValid = await trigger(["campaña", "description"]);
    if (isValid) {
      const { campaña, description } = getValues();
      setLoading(true);
      try {
        const result = await optimizeCampaign(campaña, description);
        setSuggestions(result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleSuggestionsTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue("campaña", e.currentTarget.value);
    setShowOptions({ ...showOptions, title: false });
  };

  const handleSuggestionsDescription = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setValue("description", e.currentTarget.value);
    setShowOptions({ ...showOptions, description: false });
  };

  return (
    <>
      {stateProfile ? (
        <div className="px-5 py-24 bg-main_bg">
          <div className="flex items-center justify-center ">
            <div className="w-full max-w-3xl p-6 border rounded-lg border-card_border sm:p-8 md:p-10 ">
              <h1 className="text-xl font-semibold leading-7 text-main">
                Crea tu Campaña
              </h1>
              <p className="mt-3 text-sm leading-6 text-content_text">
                ¿Tienes una idea increíble pero necesitas ayuda para llevarla a
                cabo? ¡Estás en el lugar correcto! Completa este formulario y te
                guiaremos paso a paso para crear tu primera campaña exitosa.
              </p>
              <form
                id="mainForm"
                onSubmit={submitCampaign}
                className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-6 sm:py-8 md:py-10"
              >
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="campaña" className="text-sm font-medium">
                    Nombre de Emprendimiento
                  </Label>
                  <Controller
                    name="campaña"
                    control={control}
                    rules={{
                      required: "El campo es requerido"
                    }}
                    render={({ field }) => (
                      <Input
                        onClick={() => {
                          if (suggestions?.title) {
                            setShowOptions({
                              ...showOptions,
                              title: !showOptions.title
                            });
                          }
                        }}
                        {...field}
                        id="campaña"
                        placeholder="Ingresa un nombre de tu Emprendimiento"
                      />
                    )}
                  />
                  {showOptions.title &&
                    suggestions?.title &&
                    suggestions.title.map((t: string, i: number) => (
                      <Button
                        type="button"
                        onClick={handleSuggestionsTitle}
                        variant="secondar"
                        key={i}
                        className="p-2 my-1"
                        value={t}
                      >
                        {t}
                      </Button>
                    ))}
                  {errors.campaña && (
                    <FormErrors>{errors.campaña.message}</FormErrors>
                  )}
                </div>
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Categoría del emprendimiento
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Por favor, selecciona una categoría" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((categoria, index) => (
                              <SelectItem key={index} value={categoria.value}>
                                {categoria.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <FormErrors>{errors.category.message}</FormErrors>
                  )}
                </div>
                <div className="col-span-full">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descripción
                  </Label>
                  <Controller
                    name="description"
                    rules={{
                      required: "El campo es requerido",
                      minLength: {
                        value: 25,
                        message: "Debe contener como mínimo 25 caracteres"
                      }
                    }}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        onClick={() => {
                          if (suggestions?.description) {
                            setShowOptions({
                              ...showOptions,
                              description: !showOptions.description
                            });
                          }
                        }}
                        {...field}
                        id="description"
                        rows={3}
                        placeholder="Ingresa una descripcion de tu Emprendimiento"
                      />
                    )}
                  />
                  {showOptions.description &&
                    suggestions?.description &&
                    suggestions.description.map((d: string, i: number) => (
                      <Button
                        type="button"
                        onClick={handleSuggestionsDescription}
                        variant="secondar"
                        key={i}
                        className="p-2 my-1"
                        value={d}
                      >
                        {d}
                      </Button>
                    ))}
                  {errors.description && (
                    <FormErrors>{errors.description.message}</FormErrors>
                  )}
                  <AIButton
                    color="purple"
                    type="button"
                    onClick={handleOptimize}
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="font-semibold">
                      {loading ? "Optimizando..." : "Optimizar texto con IA"}
                    </span>
                  </AIButton>
                </div>
                <div className="col-span-full sm:col-span-3 ">
                  <Label htmlFor="meta" className="text-sm font-medium">
                    Monto a Recaudar
                  </Label>
                  <div className="relative">
                    <span className="px-4 text-sm py-1 absolute left-[2px] top-1/2 -translate-y-1/2 text-content_text">
                      S/.
                    </span>
                    <div className="px-4 text-sm py-1 absolute right-[2px] top-1/2 -translate-y-1/2 text-content_text">
                      <Tooltip text="¿Dudas? Consulta al asistente financiero">
                        <AlertCircle size={16} />
                      </Tooltip>
                    </div>
                    <Controller
                      name="meta"
                      control={control}
                      rules={{
                        required: "El monto es requerido",
                        validate: value => {
                          const numValue = parseFloat(value);
                          if (isNaN(numValue)) {
                            return "Por favor, ingrese un número válido";
                          }
                          if (numValue % 1 !== 0) {
                            return "Por favor, ingrese un monto sin céntimos";
                          }
                          return true;
                        }
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          onChange={e => {
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                              onChange(value);
                            }
                          }}
                          className="pl-10"
                          value={value}
                          id="meta"
                          name="meta"
                        />
                      )}
                    />
                  </div>

                  {errors.meta && (
                    <FormErrors>{errors.meta.message}</FormErrors>
                  )}
                  <FinancialFormSteps setValue={setValue} />
                </div>
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Dirección Legal
                  </Label>
                  <Controller
                    control={control}
                    name="address"
                    rules={{ required: "El campo es requerido" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="address"
                        placeholder="Dirección legal de Emprendimiento"
                      />
                    )}
                  />
                  {errors.address && (
                    <FormErrors>{errors.address.message}</FormErrors>
                  )}
                </div>
                <div className="pb-8 border-b col-span-full">
                  <span className="text-sm font-medium text-heading">
                    Imagen de Campaña
                  </span>
                  <Controller
                    name="file"
                    control={control}
                    rules={{
                      required: "La imagen de campaña es requerida",
                      validate: {
                        fileSize: file => {
                          if (!file?.[0]) return "Se requiere una imagen";
                          if (file[0].size >= MAX_FILE_SIZE) {
                            return "El archivo no debe exceder los 1MB";
                          }
                          return true;
                        },
                        fileType: file => {
                          if (!file?.[0]) return true;
                          const validTypes = ["image/jpeg", "image/png"];
                          if (!validTypes.includes(file[0].type)) {
                            return "Solo se permiten archivos de imagen (JPG, PNG)";
                          }
                          return true;
                        }
                      }
                    }}
                    render={({ field: { onChange } }) => (
                      <motion.label
                        animate={{
                          scale: isDragging ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        htmlFor="file-input"
                        className={`border-2 border-dashed rounded-lg text-center h-28 bg-input_bg flex justify-center items-center cursor-pointer transition-colors overflow-hidden ${
                          isDragging
                            ? "border-main bg-main/15"
                            : "border-card_border hover:border-heading"
                        } focus-within:ring-2 focus-within:ring-content_text`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDrag}
                        onDragLeave={handleDragLeave}
                        onDrop={e => {
                          e.preventDefault();
                          handleDrop(e);
                          const file = e.dataTransfer.files[0];
                          if (file && file.size) {
                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                              setImage(reader.result as string);
                              onChange(e.dataTransfer.files);
                            });
                            reader.readAsDataURL(file);
                          } else {
                            setImage("");
                            onChange(null);
                          }
                        }}
                      >
                        <input
                          id="file-input"
                          type="file"
                          className="sr-only"
                          accept="image/jpeg, image/jpg, image/png"
                          onChange={event => {
                            const file = event.target.files?.[0];
                            if (file && file.size) {
                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                setImage(reader.result as string);
                                onChange(event.target.files);
                              });
                              reader.readAsDataURL(file);
                            } else {
                              setImage("");
                              onChange(null);
                            }
                          }}
                        />
                        {!image && (
                          <span className="z-10 text-center opacity-50 text-content_text">
                            Drag and drop your image here, or click to upload
                          </span>
                        )}
                        {image && (
                          <div className="flex items-center justify-center p-10">
                            <img
                              loading="lazy"
                              src={image}
                              alt=""
                              className="object-contain object-center opacity-50"
                            />
                          </div>
                        )}
                      </motion.label>
                    )}
                  />
                  {errors.file && (
                    <FormErrors>{errors.file.message}</FormErrors>
                  )}
                </div>
                <div className=" sm:col-span-3 col-span-full">
                  <Label htmlFor="proxy" className="text-sm font-medium">
                    Representante Legal
                  </Label>
                  <Controller
                    control={control}
                    name="proxy"
                    rules={{
                      required: "El campo es requerido"
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="proxy"
                        placeholder="Representante legal de Emprendimiento"
                      />
                    )}
                  />

                  {errors.proxy && (
                    <FormErrors>{errors.proxy.message}</FormErrors>
                  )}
                </div>
                <div className=" sm:col-span-3 col-span-full">
                  <Label htmlFor="dni" className="text-sm font-medium">
                    DNI
                  </Label>
                  <Controller
                    name="dni"
                    control={control}
                    rules={{
                      required: "El DNI es requerido",
                      pattern: {
                        value: /^[0-9]{8}$/,
                        message: "Debe ingresar exactamente 8 dígitos numéricos"
                      }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={e => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 8);
                          onChange(value);
                        }}
                        value={value}
                        id="dni"
                        maxLength={8}
                        name="dni"
                        placeholder="xxxxxxx"
                      />
                    )}
                  />
                  {errors.dni && <FormErrors>{errors.dni.message}</FormErrors>}
                </div>
                <div className="col-span-full">
                  <MainButton type="submit" isLoading={isLoading}>
                    Crear Campaña
                  </MainButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FormEmprendedor;
