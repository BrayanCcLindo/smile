import * as Dialog from "@radix-ui/react-dialog";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SquarePen, X } from "lucide-react";
import { CampañaGiftSmileType } from "../type/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteButtonDialog from "./deleteButtonDialog";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

type UpdateCampaignType = {
  name: string;
  description: string;
  date: string;
  file: FileList;
  meta: string;
};

function ButtonDialog({ campaña }: { campaña: CampañaGiftSmileType }) {
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(campaña.imagenCampaña);

  const mySchema: ZodType<UpdateCampaignType> = z.object({
    name: z
      .string()
      .min(3, { message: "El campo debe contener al menos 3 caracteres" }),
    description: z
      .string()
      .min(25, { message: "El campo debe contener al menos 25 caracteres" })
      .max(350, {
        message: "El campo debe contener como maximo 350 caracteres"
      }),
    date: z.string().date(),
    file: z.instanceof(FileList),
    meta: z.string()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateCampaignType>({
    resolver: zodResolver(mySchema)
  });

  const submitCampaignChanges = async (data: UpdateCampaignType) => {
    // const unsub = updateDoc(doc(db, "campañas", campaña.campañaId));
    const updatedInfo = {
      nombre: data.name,
      descripcion: data.description,
      fechaInicio: data.date,
      meta: data.meta,
      imagenCampaña: image
    };

    try {
      const campaignRef = doc(db, "campañas", campaña.campañaId);
      updateDoc(campaignRef, updatedInfo);
      setOpen(false);
    } catch (error) {
      console.log(error, "Error en Update");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="absolute top-0 right-0 flex gap-3 px-6 py-2 ml-auto bg-gray-100 border-0 rounded-tr-lg text-main focus:outline-none hover:bg-gray-200 ">
          <SquarePen />
          Editar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Editar Campaña
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Has todos los cambios necesarios y dale al boton de Guardar al
            finalizar
          </Dialog.Description>
          <form method="POST" onSubmit={handleSubmit(submitCampaignChanges)}>
            <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 overflow-auto h-full max-h-[550px]">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de Campaña
                </label>
                <div className="mt-2">
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    defaultValue={campaña?.nombre}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descripción de Campaña
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={campaña?.descripcion}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fecha
                </label>
                <div className="mt-2">
                  <input
                    {...register("date")}
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={campaña?.fechaInicio}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="meta"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Meta
                </label>
                <div className="mt-2">
                  <input
                    {...register("meta")}
                    id="meta"
                    name="meta"
                    defaultValue={`S/. ${campaña?.meta}`}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Imagen de Campaña
                </label>
                <div className="flex justify-center px-6 py-2 mt-2 border border-dashed rounded-lg border-gray-900/25">
                  <div className="text-center text-gray-600">
                    <div className="flex justify-center">
                      <img
                        loading="lazy"
                        width={120}
                        height={120}
                        className="object-cover"
                        src={image}
                        alt=""
                      />
                    </div>

                    <div className="flex justify-center mt-4 text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative font-semibold text-center text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Cambiar imagen</span>
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
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[25px] flex gap-4 ">
              <button
                type="submit"
                className="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded hover:bg-indigo-600 "
              >
                Guardar
              </button>
              <DeleteButtonDialog campaña={campaña} text="Eliminar Campaña" />
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ButtonDialog;
