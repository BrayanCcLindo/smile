import { ImageUp } from "lucide-react";
import { z, ZodEffects, ZodString, ZodType, ZodTypeDef } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "./mainLinkButton";
import { SmileType } from "../type/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { DatePickerWithRange } from "./calendarPicker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { MainButton } from "./mainLinkButton";

type FormCampaign = {
  name: string;
  description: string;
  file: FileList;
  meta: string;
  type: string;
};

type formSchema = {
  schemaForm: {
    name: ZodString;
    description: ZodString;
    file: ZodEffects<
      ZodEffects<ZodType<FileList, ZodTypeDef, FileList>, FileList, FileList>,
      FileList,
      FileList
    >;
    meta: ZodString;
    type: ZodString;
  };
  onsubmit: SubmitHandler<FormCampaign>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function FormCampaign({
  schemaForm,
  onsubmit,
  date,
  setDate,
  image,
  setImage
}: formSchema) {
  const [meta, setMeta] = useState("");

  const MAX_FILE_SIZE = 1048487;
  const mySchema: ZodType<FormCampaign> = z.object(schemaForm);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormCampaign>({
    resolver: zodResolver(mySchema),
    mode: "all"
  });

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onsubmit)}
      className="px-10 py-4 border sm:mx-auto sm:w-full sm:max-w-3xl rounded-xl text-content_text"
    >
      <div className="space-y-12">
        <div className="pb-12 ">
          <h1 className="text-xl font-semibold leading-7 text-main">
            Crea tu Campaña
          </h1>
          <p className="mt-3 text-sm leading-6 text-content_text">
            ¿Tienes una idea increíble pero necesitas ayuda para llevarla a
            cabo? ¡Estás en el lugar correcto! Completa este formulario y te
            guiaremos paso a paso para crear tu primera campaña exitosa.
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
                  <span className="text-red-500">{errors.name.message}</span>
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
                <Select onValueChange={value => setValue("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SmileType.Fundaciones}>
                      Albergues, fundaciones y ONG
                    </SelectItem>
                    <SelectItem value={SmileType.Emprendedores}>
                      Emprendedores
                    </SelectItem>
                    <SelectItem value={SmileType.Social}>
                      Impacto Social
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                        loading="lazy"
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
                        accept="image/png image/jpg imgage/jpeg"
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 ">PNG, JPG, GIF up to 1MB</p>
                </div>
              </div>

              {errors.file && (
                <span className="text-red-500 ">{errors.file?.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6">
        <MainButton type="submit">Crear Campaña</MainButton>
      </div>
    </form>
  );
}

export default FormCampaign;
