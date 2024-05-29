// import { db } from "../firebase/firebase";
// import { useEffect, useState } from "react";
// import { collection, getDocs, query } from "firebase/firestore";
// import { useSmileContext } from "./userContext";
// import { CampañaGiftSmileType } from "../type/types";

// export const useGetUserCampaigns = () => {
//   const { stateProfile } = useSmileContext();

//   const [userCampaigns, setUserCampaigns] = useState<CampañaGiftSmileType[]>(
//     []
//   );

//   useEffect(() => {
//     const FetchUserCampaignsData = async () => {
//       if (stateProfile.uid) {
//         const userCampaignsQuery = query(
//           collection(db, "campañas")
//           // where("id", "==", stateProfile.uid)
//         );
//         const userActualCampaigns = await getDocs(userCampaignsQuery);
//         // userActualCampaigns.docs.forEach((campaign) => {
//         //   // [...campañas, id= campaign.id, campañaId= campaign.id]
//         //   // campañas.push({
//         //   //   id: campaign.id,
//         //   //   campañaId: campaign.id,ukj,0
//         //   //   ...campaign.data(),
//         //   // });
//         // });
//         const validData = userActualCampaigns.docs
//           .map((data) => {
//             const realData = data.data();
//             return realData;
//           })
//           .filter((campaña) => campaña.id === stateProfile.uid);

//         // @ts-expect-error need to push

//         setUserCampaigns(validData);
//       }
//     };
//     return () => {
//       FetchUserCampaignsData();
//     };
//   }, [stateProfile]);
//   return { userCampaigns };
// };
