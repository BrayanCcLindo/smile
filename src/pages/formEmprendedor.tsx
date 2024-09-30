import { Loader } from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import { z, ZodType } from "zod";
import { useNavigate } from "react-router-dom";
import { useGetUserData } from "../Api/getUserData";
import { useGetCampaigns } from "../Api/getCampaigns";
import { toast } from "sonner";
import { add, format } from "date-fns";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MainButton } from "../components/mainLinkButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrors from "../components/formErrors";
import { SmileType } from "../type/types";

type FormCampaign = {
  campaña: string;
  description: string;
  category: string;
  address: string;
  meta: string;
  file: FileList;
  proxy: string;
  dni: string;
};

function FormEmprendedor() {
  const { stateProfile } = useSmileContext();
  const navigate = useNavigate();
  const { user } = useGetUserData();
  const { data } = useGetCampaigns();

  const [image, setImage] = useState("");
  const [dni, setDni] = useState("");
  const [meta, setMeta] = useState("");

  const MAX_FILE_SIZE = 770000;

  const mySchema: ZodType<FormCampaign> = z.object({
    campaña: z
      .string()
      .min(3, { message: "El campo debe contener al menos 3 caracteres" }),
    description: z
      .string()
      .min(25, { message: "El campo debe contener al menos 25 caracteres" })
      .max(350, {
        message: "El campo debe contener como maximo 350 caracteres"
      }),
    file: z
      .instanceof(FileList)
      .refine(files => files.length > 0, "La imagen es requerida")
      .refine(files => {
        return (
          files[0]?.size <= MAX_FILE_SIZE, `El tamaño máximo aceptado es 1MB`
        );
      }),
    meta: z.string().min(1, { message: "El campo es obligatorio" }),
    category: z.string().min(1, { message: "Este Campo es requerido" }),
    dni: z.string().min(1, { message: "Este Campo es requerido" }),
    address: z.string().min(1, { message: "Este Campo es requerido" }),
    proxy: z.string().min(1, { message: "Este Campo es requerido" })
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormCampaign>({
    resolver: zodResolver(mySchema),
    mode: "all"
  });
  const submitCampaign = async (values: FormCampaign) => {
    const startDate = format(new Date(), "yyyy-M-d");
    const endDate = format(add(startDate, { days: 30 }), "yyyy-M-d");
    const title = values.campaña.trim();
    const slug = title.replace(/[\s'-]+/g, "-").toLowerCase();
    const campaignExist = data.some(
      campaign => campaign.nombre === values.campaña.trim()
    );

    try {
      if (!campaignExist && stateProfile.uid) {
        await addDoc(collection(db, "campañas"), {
          nombre: title,
          descripcion: values.description,
          slug: slug,
          categoria: values.category,
          id: stateProfile.uid,
          imagenCampaña: image,
          meta: values.meta,
          to: `/campañas/${slug}`,
          tipo: SmileType.Emprendedores,
          creador: user?.name ?? stateProfile.displayName,
          fechaInicio: startDate,
          fechaFinal: endDate,
          donaciones: []
        });
        navigate("/campaigns");
        toast.success("¡Campaña creada exitosamente!", {
          duration: 2000,
          position: "top-right"
        });
      }
      if (campaignExist) {
        toast.error("La campaña ya existe!", {
          duration: 2000,
          position: "top-right"
        });
      }
    } catch (error) {
      toast.error("¡Error al crear la campaña. Inténtalo de nuevo.!", {
        duration: 2000,
        position: "top-right"
      });
    }
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
                onSubmit={handleSubmit(submitCampaign)}
                className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-6 sm:py-8 md:py-10"
              >
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="campaña" className="text-sm font-medium">
                    Nombre de Emprendimiento
                  </Label>
                  <Input
                    {...register("campaña")}
                    id="campaña"
                    placeholder="Ingresa un nombre de tu Emprendimiento"
                  />
                  {errors.campaña && (
                    <FormErrors message={errors.campaña.message} />
                  )}
                </div>
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Categoría del emprendimiento
                  </Label>
                  <Input
                    {...register("category")}
                    id="category"
                    name="category"
                    placeholder="tecnología, servicios, etc..."
                  />
                  {errors.category && (
                    <FormErrors message={errors.category.message} />
                  )}
                </div>
                <div className="col-span-full">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descripción
                  </Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    rows={3}
                    placeholder="Ingresa una descripcion de tu Emprendimiento"
                  />
                  {errors.description && (
                    <FormErrors message={errors.description.message} />
                  )}
                </div>
                <div className="col-span-full sm:col-span-3 ">
                  <Label htmlFor="meta" className="text-sm font-medium">
                    Monto a Recaudar
                  </Label>
                  <Input
                    {...register("meta", {
                      onChange: event => {
                        const value = event.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setMeta(value);
                        }
                      }
                    })}
                    id="meta"
                    name="meta"
                    value={meta}
                    placeholder="S./ "
                  />
                  {errors.meta && <FormErrors message={errors.meta.message} />}
                </div>
                <div className="sm:col-span-3 col-span-full">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Dirección Legal
                  </Label>
                  <Input
                    {...register("address")}
                    id="address"
                    placeholder="Dirección legal de Emprendimiento"
                  />
                  {errors.address && (
                    <FormErrors message={errors.address.message} />
                  )}
                </div>
                <div className="pb-8 border-b col-span-full border-card_border">
                  <Label htmlFor="file" className="text-sm font-medium">
                    Imagen de Campaña
                    <div
                      className="relative flex items-center justify-center w-full h-32 overflow-hidden border-2 border-dashed rounded-md cursor-pointer border-card_border bg-input_bg"
                      onDragOver={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          if (file.size < MAX_FILE_SIZE) {
                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                              setImage(reader.result as string);
                            });
                            reader.readAsDataURL(file);
                          }
                        }
                      }}
                    >
                      {image && (
                        <img
                          src={image}
                          alt=""
                          className="absolute inset-0 object-cover object-center opacity-50"
                        />
                      )}

                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        {...register("file", {
                          onChange: event => {
                            const mainImage = event.target.files[0];
                            if (mainImage) {
                              if (mainImage.size < MAX_FILE_SIZE) {
                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                  setImage(reader.result as string);
                                });
                                reader.readAsDataURL(mainImage);
                              }
                            }
                          }
                        })}
                      />

                      <span className="z-10 text-center text-content_text">
                        Drag and drop your image here, or click to upload
                      </span>
                    </div>
                  </Label>

                  {errors.file && <FormErrors message={errors.file.message} />}
                </div>
                <div className=" sm:col-span-3 col-span-full">
                  <Label htmlFor="proxy" className="text-sm font-medium">
                    Representante Legal
                  </Label>
                  <Input
                    {...register("proxy")}
                    id="proxy"
                    placeholder="Representante legal de Emprendimiento"
                  />
                  {errors.proxy && (
                    <FormErrors message={errors.proxy.message} />
                  )}
                </div>
                <div className=" sm:col-span-3 col-span-full">
                  <Label htmlFor="dni" className="text-sm font-medium">
                    DNI
                  </Label>
                  <Input
                    {...register("dni", {
                      onChange: e => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value) && value.length < 12) {
                          setDni(value);
                        }
                      }
                    })}
                    id="dni"
                    placeholder="xxxxxxx"
                    value={dni}
                  />
                  {errors.dni && <FormErrors message={errors.dni.message} />}
                </div>
                <div className="col-span-full">
                  <MainButton type="submit">Crear Campaña</MainButton>
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
