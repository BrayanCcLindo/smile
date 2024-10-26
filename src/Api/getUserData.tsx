import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query
  // where,
} from "firebase/firestore";
import { useSmileContext } from "./userContext";
import { UserData } from "../type/types";

export const useGetUserData = () => {
  const { stateProfile } = useSmileContext();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Verificar si stateProfile y uid existen
        if (!stateProfile?.uid) {
          setUser(null);
          return;
        }

        const usersRef = collection(db, "usuarios");
        const usersQuery = query(usersRef);
        const querySnapshot = await getDocs(usersQuery);

        const userDoc = querySnapshot.docs.find(
          doc => doc.data().uid === stateProfile.uid
        );

        if (userDoc) {
          const userData = userDoc.data() as UserData;
          setUser(userData);
        } else {
          setUser(null);
          setError("Usuario no encontrado");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al obtener datos del usuario"
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [stateProfile?.uid]); // Dependencia segura

  return { user, isLoading, error };
};

export const useGetUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "usuarios"),
      snapshot => {
        const campañas: UserData[] = [];

        snapshot.docs.forEach(doc => {
          // @ts-expect-error need to push

          campañas.push({ id: doc.id, usuarioId: doc.id, ...doc.data() });
        });
        setUsuarios(campañas);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return { usuarios };
};
