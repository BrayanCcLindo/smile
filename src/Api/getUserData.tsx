import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  // where,
} from "firebase/firestore";
import { useSmileContext } from "./userContext";
import { UserData } from "../type/types";

export const useGetUserData = () => {
  const { stateProfile } = useSmileContext();

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const FetchUserData = async () => {
      // if (stateProfile) {
      const actualUser = query(
        collection(db, "usuarios")
        // where("id", "==", stateProfile.uid)
      );

      const uniqueUser = await getDocs(actualUser);
      const index = uniqueUser.docs.findIndex(
        (user) => user.data().id === stateProfile.uid
      );

      // const index = uniqueUser.docs.length;
      const userData = uniqueUser.docs[index].data() as UserData;

      setUser(userData);
      // }
    };
    return () => {
      FetchUserData();
    };
  }, []);

  return { user };
};

export const useGetUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "usuarios"),
      (snapshot) => {
        const campañas: UserData[] = [];

        snapshot.docs.forEach((doc) => {
          // @ts-expect-error need to push

          campañas.push({ id: doc.id, usuarioId: doc.id, ...doc.data() });
        });
        setUsuarios(campañas);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return { usuarios };
};
