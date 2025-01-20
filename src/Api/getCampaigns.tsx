import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { CampañaGiftSmileType } from "../type/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export const useGetCampaigns = () => {
  const [data, setData] = useState<CampañaGiftSmileType[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "campañas"),
      snapshot => {
        const campañas: CampañaGiftSmileType[] = [];

        snapshot.docs.forEach(doc => {
          const rawData = doc.data() as CampañaGiftSmileType;

          // Transformamos los datos para incluir el contenido multilingüe
          const campaña = {
            ...rawData,
            id: doc.id,
            campañaId: doc.id,

            es: {
              creator: rawData.creador,
              descripcion: rawData.descripcion,
              nombre: rawData.nombre,
              historia: rawData.historia,
              tipo: rawData.tipo
            },
            en: {
              creator: rawData.creador,
              descripcion: rawData.descripcion_en,
              nombre: rawData.nombre_en,
              historia: rawData.historia_en,
              tipo: rawData.tipo_en
            }
          };

          campañas.push(campaña);
        });
        setData(campañas);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return { data };
};

export async function handleDeleteCampaign(id: string) {
  try {
    await deleteDoc(doc(db, "campañas", id));
    // navigate("/campañas");
  } catch (error) {
    console.log(error);
  }
}
