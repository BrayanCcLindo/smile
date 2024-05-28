import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { CampañaGiftSmileType } from "../type/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export const useGetCampaigns = () => {
  const [data, setData] = useState<CampañaGiftSmileType[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "campañas"),
      (snapshot) => {
        const campañas: CampañaGiftSmileType[] = [];

        snapshot.docs.forEach((doc) => {
          // @ts-expect-error need to push
          campañas.push({ id: doc.id, campañaId: doc.id, ...doc.data() });
        });
        setData(campañas);
      },
      (error) => {
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
