import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSmileContext } from "./userContext";
import { CampañaGiftSmileType } from "../type/types";

export const useGetUserCampaigns = () => {
  const { stateProfile } = useSmileContext();

  const [userCampaigns, setUserCampaigns] = useState<CampañaGiftSmileType[]>(
    []
  );

  useEffect(() => {
    const FetchUserCampaignsData = async () => {
      const userCampaignsQuery = query(
        collection(db, "campañas"),
        where("id", "==", stateProfile.uid)
      );
      const campañas: CampañaGiftSmileType[] = [];
      const userActualCampaigns = await getDocs(userCampaignsQuery);
      userActualCampaigns.docs.forEach((campaign) => {
        // @ts-expect-error need to push

        campañas.push({
          id: campaign.id,
          campañaId: campaign.id,
          ...campaign.data(),
        });
      });

      setUserCampaigns(campañas);
    };
    return () => {
      FetchUserCampaignsData();
    };
  }, []);
  return { userCampaigns };
};
