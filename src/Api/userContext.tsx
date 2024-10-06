import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { SmileContextType, UserData, UserType } from "../type/types";
import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useGetUsuarios } from "./getUserData";
import { ToogleTheme } from "../type/types";
import { useNavigate } from "react-router-dom";

export const SmileContext = createContext<SmileContextType>(
  {} as SmileContextType
);

let initialProfile: UserType | null;

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

export function SmileProvider({
  children
}: {
  defaultTheme: ToogleTheme;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  const { usuarios } = useGetUsuarios();
  const [theme, setTheme] = useState<ToogleTheme>(
    () => (localStorage.getItem("theme") as ToogleTheme) || "system"
  );

  const [stateProfile, dispatchProfile] = useReducer(
    profileReducer,
    initialProfile
  );

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      // @ts-expect-error need to push
      updateUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const updateUser = (user: UserData | null) => {
    dispatchProfile({
      type: "NEW_USER",
      user: user
    });
  };
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      navigate(-1);
      // @ts-expect-error need to push

      updateUser(res.user);
      const userExist = usuarios.some(
        usuario => usuario.email === res.user.email
      );
      if (!userExist) {
        await addDoc(collection(db, "usuarios"), {
          name: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
          userPhoto: "/Images/defaultuser.jpg"
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
      navigate(-1);
    } catch (error) {
      console.log(error, "error al iniciar con google");
    }
  };

  const toogleValue = {
    theme,
    setTheme: (theme: ToogleTheme) => {
      localStorage.setItem("theme", theme);
      setTheme(theme);
    }
  };

  return (
    <SmileContext.Provider
      value={{
        stateProfile,
        updateUser,
        logInGoogle,
        googleSignIn,
        logOut,
        toogleValue
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
