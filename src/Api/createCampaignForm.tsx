import { addDoc, collection } from "firebase/firestore";
import { format, add } from "date-fns";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SmileType, UserData } from "../type/types";
import { FormCampaign } from "../pages/formAlbergue";
import { ROUTES } from "../constants/routes";
import { CAMPAIGNTYPES_EN } from "../constans/constantsCampaign";

interface SubmitHandlerConfig {
  db: any; // Tipo de Firestore
  collectionName: string;
  data: any[]; // Array de documentos existentes
  stateProfile: {
    uid: string;
    displayName: string;
  };
  user?: UserData | null;
  image: string | null;
  additionalFields?: Record<string, any>;
  onSuccess?: () => void;
  redirectPath?: string;
}

export const createSubmitHandler = (config: SubmitHandlerConfig) => {
  const navigate = useNavigate();
  return async (
    values: FormCampaign,
    tipo: SmileType,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const startDate = format(new Date(), "yyyy-M-d");
    const endDate = format(add(new Date(startDate), { days: 30 }), "yyyy-M-d");
    const title = values.campaña.trim();
    const slug = title.replace(/[\s'-]+/g, "-").toLowerCase();

    const campaignExist = config.data.some(
      campaign => campaign.nombre === title
    );

    if (campaignExist) {
      toast.error("¡La campaña ya existe!", {
        duration: 2000,
        position: "top-right"
      });
      return;
    }

    try {
      setIsLoading(true);
      if (!campaignExist && config.stateProfile.uid) {
        const baseDocument = {
          nombre: title,
          nonmbre_en: "",
          descripcion: values.description,
          descripcion_en: "",
          slug: slug,
          id: config.stateProfile.uid,
          imagenCampaña: config.image,
          meta: Number(values.meta),
          to: `${ROUTES.CAMPANAS}/${slug}`,
          tipo,
          tipo_en: CAMPAIGNTYPES_EN[tipo],
          category: values.category ?? null,
          creador: config.user?.name ?? config.stateProfile.displayName,
          fechaInicio: startDate,
          fechaFinal: endDate,
          donaciones: [],
          validation: false,
          ...config.additionalFields
        };

        await addDoc(
          collection(config.db, config.collectionName),
          baseDocument
        );

        toast.success("¡Campaña creada exitosamente!", {
          duration: 2000,
          position: "top-right"
        });
      }
    } catch (error) {
      toast.error("¡Error al crear la campaña. Inténtalo de nuevo!", {
        duration: 2000,
        position: "top-right"
      });
    } finally {
      setIsLoading(false);
      navigate(ROUTES.CAMPANAS);
    }
  };
};
