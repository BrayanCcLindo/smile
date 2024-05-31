import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SmileContextType, UserData, UserType } from "../type/types";
import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useGetUsuarios } from "./getUserData";

export const SmileContext = createContext<SmileContextType>(
  {} as SmileContextType
);

// const campaignReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_CAMPAIGN": {
//       const toLink = action.data.name.split(" ").join("-");

//       const db = getDatabase(app);
//       const newCard = {
//         nombre: action.data.name,
//         descripcion: action.data.description,
//         to: `/campañas/${toLink}`,
//         slug: toLink,
//         imagenCampaña: action.image,
//         meta: action.data.meta,
//         fechaInicio: action.data.date,
//         tipo: action.data.type,
//         creador: action.nombre,
//         cargo: action.data.role,
//         imagen: action.userPhoto,
//       };
//       const newDocRef = push(ref(db, "smile/campañas"));
//       set(newDocRef, newCard)
//         .then(() => {
//           console.log("exitosoooo");
//         })
//         .catch((err) => {
//           console.log(err, "error");
//         });

//       const newCampaign = structuredClone(state);
//       if (action.data.name !== "") {
//         newCampaign.push(newCard);
//       }
//       createCampaignStorage(newCampaign);
//       return newCampaign;
//     }
//     case "CHANGE_CAMPAING": {
//       const stateClon = structuredClone(state);
//       const selectedCampaign = stateClon.find(
//         (campaña: CampañaGiftSmileType) => campaña.slug === action.slug
//       );
//       selectedCampaign.nombre = action.data.name;
//       selectedCampaign.descripcion = action.data.description;
//       (selectedCampaign.imagenCampaña = action.image),
//         (selectedCampaign.fechaInicio = action.data.date);
//       selectedCampaign.meta = action.data.meta;
//       createCampaignStorage(stateClon);

//       return stateClon;
//     }
//     case "DELETE_CAMPAIGN": {
//       const stateClon = structuredClone(state);

//       const remainingCampaigns = stateClon.filter(
//         (campaign: CampañaGiftSmileType) => campaign.nombre !== action.nombre
//       );
//       createCampaignStorage(remainingCampaigns);

//       return remainingCampaigns;
//     }

//     default:
//       break;
//   }
// };

let initialProfile: UserType | null;
// if (typeof window !== "undefined") {
//   const storedUser = localStorage.getItem("user");

//   initialProfile = storedUser ? JSON.parse(storedUser) : "";
// }
// const updateFavoriteStorage = (state: string) => {
//   window.localStorage.setItem("user", JSON.stringify(state));
// };
// @ts-expect-error need to push

const profileReducer = (state, action) => {
  switch (action.type) {
    case "NEW_USER": {
      state = action.user;

      return state;
    }

    default:
      break;
  }
};

// let initialFavoriteCampaigns: CampañaGiftSmileType[];
// if (typeof window !== "undefined") {
//   const storedFavorites = localStorage.getItem("favorites");

//   initialFavoriteCampaigns = storedFavorites ? JSON.parse(storedFavorites) : [];
// }
// const updateFavoriteStorage = (state: CampañaGiftSmileType[]) => {
//   window.localStorage.setItem("favorites", JSON.stringify(state));
// };

// const favoriteCampaignReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_FAVORITE": {
//       const newArrayOfFavorites = [...state];
//       const indexOfNewArray = newArrayOfFavorites.findIndex(
//         (favoriteBook) => favoriteBook.nombre === action.campaña.nombre
//       );

//       if (newArrayOfFavorites[indexOfNewArray]) {
//         newArrayOfFavorites.splice(indexOfNewArray, 1);
//         return newArrayOfFavorites;
//       }
//       const newFavoritesCampaigns = [...state, action.campaña];
//       updateFavoriteStorage(newFavoritesCampaigns);
//       return newFavoritesCampaigns;
//     }

//     default:
//       break;
//   }
// };

export function SmileProvider({ children }: { children: ReactNode }) {
  const { usuarios } = useGetUsuarios();

  const [stateProfile, dispatchProfile] = useReducer(
    profileReducer,
    initialProfile
  );

  // const [stateFavorites, dispatchFavorites] = useReducer(
  //   favoriteCampaignReducer,
  //   initialFavoriteCampaigns
  // );

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // @ts-expect-error need to push

      updateUser(currentUser);
    });
  }, []);

  const updateUser = (user: UserData | null) => {
    dispatchProfile({
      type: "NEW_USER",
      user: user,
    });
  };
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      // @ts-expect-error need to push

      updateUser(res.user);
      const userExist = usuarios.some(
        (usuario) => usuario.email === res.user.email
      );
      if (!userExist) {
        await addDoc(collection(db, "usuarios"), {
          name: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
          userPhoto: "/Images/defaultuser.jpg",
        });
      } else {
        console.log("Ya esta Creado cuenta con Google");
      }
    } catch (error) {
      console.log(error, "error al iniciar con google");
    }
  };

  const logInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      // @ts-expect-error need to push

      updateUser(res.user);
    } catch (error) {
      console.log(error, "error al iniciar con google");
    }
  };

  // const addCampaignToFavorite = (campaña: CampañaGiftSmileType) => {
  //   dispatchFavorites({
  //     type: "ADD_FAVORITE",
  //     campaña: campaña,
  //   });
  // };

  return (
    <SmileContext.Provider
      value={{
        stateProfile,
        updateUser,
        logInGoogle,
        googleSignIn,
        logOut,
        // stateFavorites,
        // addCampaignToFavorite,
      }}
    >
      {children}
    </SmileContext.Provider>
  );
}

export const useSmileContext = () => {
  const data = useContext(SmileContext);
  return data;
};
