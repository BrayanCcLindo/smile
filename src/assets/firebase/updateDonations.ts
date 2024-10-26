import { format } from "date-fns";
import { CampañaGiftSmileType, FormPayment } from "../../type/types";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateFirebaseDonations = async (
  data: FormPayment,
  actualPost: CampañaGiftSmileType
) => {
  const result = format(new Date(), "d 'de' MMMM yyyy");
  const donationYapeInfo = {
    donadorNombre: data.userName || data.cardName,
    montoDonacion: data.amount,
    donationType: data.paymentMethod,
    donadorCorreo: data.cardMail || data.userMail,
    fechaDonacionYape: result,
    validation: false
  };
  const updatedYapeInfo = {
    ...actualPost,
    donaciones: [...actualPost.donaciones, donationYapeInfo]
  };

  const donationRef = doc(db, "campañas", actualPost.campañaId);
  await updateDoc(donationRef, updatedYapeInfo);
};
