import { Loader } from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import { z } from "zod";
import FormularioAlbergue from "../components/formCampaign";
import { useNavigate } from "react-router-dom";
import { useGetUserData } from "../Api/getUserData";
import { useGetCampaigns } from "../Api/getCampaigns";
import { toast } from "sonner";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

type FormCampaign = {
  name: string;
  description: string;
  file: FileList;
  meta: string;
  type: string;
};

function FormEmprendores() {
  const { stateProfile } = useSmileContext();
  const navigate = useNavigate();
  const { user } = useGetUserData();
  const { data } = useGetCampaigns();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  });
  const [image, setImage] = useState("");

  const MAX_FILE_SIZE = 1048487;

  const schemaForm = {
    name: z
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
      .refine(
        files => files[0]?.size >= MAX_FILE_SIZE,
        `El tamaño máximo aceptado es 1MB`
      ),
    meta: z.string().min(1, { message: "El campo es obligatorio" }),
    type: z.string()
  };

  const submitCampaign = async (values: FormCampaign) => {
    const title = values.name.trim();
    const slug = title.replace(/[\s'-]+/g, "-").toLowerCase();
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
          to: `/campaigns/${slug}`,
          tipo: values.type,
          creador: user?.name ?? stateProfile.displayName,
          // imagen: userPhoto,
          fechaInicio: initialDate,
          fechaFinal: finalDate,
          donaciones: []
        });
        navigate("/campaigns");
        toast.success("¡Campaña creada exitosamente!", {
          duration: 2000,
          position: "top-right"
        });
      } else {
        toast.error("¡La campaña ya existe!", {
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
          <FormularioAlbergue
            schemaForm={schemaForm}
            onsubmit={submitCampaign}
            date={date}
            setDate={setDate}
            image={image}
            setImage={setImage}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FormEmprendores;
