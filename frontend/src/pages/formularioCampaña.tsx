import { ImageUp } from "lucide-react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSmileContext } from "../Api/userContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useGetUserData } from "../Api/getUserData";
import { format, addDays } from "date-fns";
import { useGetCampaigns } from "../Api/getCampaigns";
import { Button } from "../components/mainLinkButton";
import Loader from "../components/loader";
import { SmileType } from "../type/types";
import { DateRange } from "react-day-picker";

import { toast } from "sonner";
import { DatePickerWithRange } from "../components/calendarPicker";

type FormCampaign = {
  name: string;
  description: string;
  // date: string;
  file: FileList;
  meta: string;
  type: string;
};

function FormularioCamapaña() {
  const [image, setImage] = useState("");
  const [meta, setMeta] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  });

  // const [userPhoto, setUserPhoto] = useState("/Images/defaultuser.jpg");
  const navigate = useNavigate();
  const { user } = useGetUserData();

  const { data } = useGetCampaigns();

  const { stateProfile } = useSmileContext();

  const mySchema: ZodType<FormCampaign> = z.object({
    name: z
      .string()
      .min(3, { message: "El campo debe contener al menos 3 caracteres" }),
    description: z
      .string()
      .min(25, { message: "El campo debe contener al menos 25 caracteres" })
      .max(350, {
        message: "El campo debe contener como maximo 350 caracteres"
      }),
    // date: z.string().date(),
    file: z.instanceof(FileList),
    meta: z.string().min(1, { message: "El campo es obligatorio" }),
    type: z.string()
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
    const title = values.name.trim();
    const slug = title.replace(/[\s'-]+/g, "-").toLowerCase();
    // const result = format(new Date(), "yyyy-M-d");
    const campaignExist = data.some(
      campaign => campaign.nombre === values.name.trim()
    );

    const initialDate = format(date?.from as Date, "yyyy-M-d");
    const finalDate = format(date?.to as Date, "yyyy-M-d");

    try {
      if (!campaignExist && stateProfile.uid) {
        await addDoc(collection(db, "campañas"), {
          nombre: title,
          descripcion: values.description,
          slug: slug,
          id: stateProfile.uid,
          imagenCampaña: image,
          meta: values.meta,
          to: `/campañas/${slug}`,
          tipo: values.type,
          creador: user?.name ?? stateProfile.displayName,
          // imagen: userPhoto,
          fechaInicio: initialDate,
          fechaFinal: finalDate,
          donaciones: []
        });
        navigate("/campañas");
        toast.success("¡Campaña creada exitosamente!", {
          duration: 3000,
          position: "top-right"
        });
      } else {
        toast.error("¡La campaña ya existe!", {
          duration: 3000,
          position: "top-right"
        });
      }
    } catch (error) {
      toast.error("¡Error al crear la campaña. Inténtalo de nuevo.!", {
        duration: 3000,
        position: "top-right"
      });
    }
  };

  return (
    <>
      {stateProfile ? (
        <div className="pt-48 pb-16 bg-main_bg">
          <form
            method="POST"
            onSubmit={handleSubmit(submitCampaign)}
            className="px-10 py-4 border sm:mx-auto sm:w-full sm:max-w-3xl rounded-xl text-content_text"
          >
            <div className="space-y-12">
              <div className="pb-12 ">
                <h1 className="text-xl font-semibold leading-7 text-main">
                  Crea tu Campaña
                </h1>
                <p className="mt-3 text-sm leading-6 text-content_text">
                  ¿Tienes una idea increíble pero necesitas ayuda para llevarla
                  a cabo? ¡Estás en el lugar correcto! Completa este formulario
                  y te guiaremos paso a paso para crear tu primera campaña
                  exitosa.
                </p>

                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Nombre de Campaña
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name")}
                        id="name"
                        name="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-heading bg-input_bg ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6 trim"
                      />

                      {errors.name && (
                        <span className="text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Descripción de Campaña
                    </label>
                    <div className="mt-2">
                      <textarea
                        {...register("description")}
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-heading bg-input_bg ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                      ></textarea>
                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 ">
                      Escribe de 25 a 350 caracteres
                    </p>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Fecha
                    </label>
                    <div className="mt-2 rounded-l ">
                      <DatePickerWithRange date={date} setDate={setDate} />
                    </div>
                  </div>
                  <div className="col-span-full sm:col-span-3 ">
                    <label
                      htmlFor="meta"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Meta
                    </label>
                    <div className="mt-2">
                      <input
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
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-heading ring-1 ring-inset bg-input_bg ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-full">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Tipo de Smile
                    </label>
                    <div className="mt-2">
                      <select
                        {...register("type")}
                        id="type"
                        name="type"
                        defaultValue={SmileType.Fundaciones}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-heading bg-input_bg ring-1 ring-inset ring-card_border focus:ring-2 focus:ring-inset focus:ring-main  sm:text-sm sm:leading-6"
                      >
                        <option value={SmileType.Fundaciones}>
                          Albergues, fundaciones y ONG
                        </option>
                        <option value={SmileType.Emprendedores}>
                          Emprendedores
                        </option>
                        <option value={SmileType.Social}>Impacto Social</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-heading"
                    >
                      Imagen de Campaña
                    </label>
                    <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-card_border">
                      <div className="text-center ">
                        <div className="flex justify-center text-main">
                          {image ? (
                            <img
                              className="object-cover"
                              width={150}
                              height={150}
                              src={image}
                              alt=""
                            />
                          ) : (
                            <ImageUp
                              strokeWidth={1}
                              size={30}
                              className="m-auto text-center "
                            />
                          )}
                        </div>

                        <div className="flex justify-center mt-4 text-sm leading-6 ">
                          <label
                            htmlFor="file"
                            className="relative font-semibold text-center rounded-md cursor-pointer bg-main_bg text-main focus-within:outline-none focus-within:ring-2 focus-within:ring-main focus-within:ring-offset-2 hover:text-main"
                          >
                            <span>{image ? "Cambiar" : "Subir"} Imagen</span>
                            <input
                              {...register("file", {
                                // required: "Tu foto es importante",
                                onChange: event => {
                                  const mainImage = event.target.files[0];

                                  const reader = new FileReader();
                                  reader.addEventListener("load", () => {
                                    setImage(reader.result as string);
                                  });
                                  if (mainImage) {
                                    reader.readAsDataURL(mainImage);
                                  }
                                }
                              })}
                              accept="image/png image/jpg imgage/jpeg"
                              id="file"
                              name="file"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 ">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="pb-12 pt-11">
          <h2 className="text-base font-semibold leading-7 text-heading">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <p className="block text-sm font-medium leading-6 text-heading">
                Photo
              </p>

              <div className="flex items-center mt-2 gap-x-3">
                <img
                  className="object-cover"
                  width={50}
                  height={50}
                  src={userPhoto}
                  alt=""
                />
                <div className="flex items-center text-sm leading-6 text-gray-600 ">
                  <label
                    htmlFor="userPhoto"
                    className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-heading ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <span>cambiar</span>
                    <input
                      {...register("userPhoto", {
                        // required: "Tu foto es importante",
                        onChange: (event) => {
                          const mainImage = event.target.files[0];

                          const reader = new FileReader();
                          reader.addEventListener("load", () => {
                            setUserPhoto(reader.result as string);
                          });
                          if (mainImage) {
                            reader.readAsDataURL(mainImage);
                          }
                        },
                      })}
                      accept="image/png image/jpg imgage/jpeg"
                      id="userPhoto"
                      name="userPhoto"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="creador"
                className="block text-sm font-medium leading-6 text-heading"
              >
                Autor Campaña
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="creador"
                  defaultValue={user?.name}
                  readOnly
                  id="creador"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-heading ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-heading"
              >
                Cargo
              </label>
              <div className="mt-2">
                <input
                  {...register("role")}
                  type="text"
                  name="role"
                  id="role"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-heading ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div> */}

            <div className="flex items-center justify-end gap-x-6">
              <Button type="submit">Crear Campaña</Button>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FormularioCamapaña;
