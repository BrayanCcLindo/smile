import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  // where,
} from "firebase/firestore";
import { UserData } from "../type/types";

export const useGetUserData = () => {
  const mainId = JSON.parse(window.localStorage.getItem("user") ?? "");

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const FetchUserData = async () => {
      const actualUser = query(collection(db, "usuarios"));

      const uniqueUser = await getDocs(actualUser);

      const index = uniqueUser.docs.findIndex(
        (user) => user.data().uid === mainId
      );

      if (uniqueUser.docs[index]) {
        const userData = uniqueUser.docs[index].data() as UserData;

        setUser(userData);
      }
      // setUser(userData);
    };
    return () => {
      FetchUserData();
    };
  }, [mainId]);

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
