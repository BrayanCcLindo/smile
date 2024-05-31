import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useSmileContext } from "../Api/userContext";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { FormData } from "../type/types";
import { Button } from "../components/mainLinkButton";
import { useSmileContext } from "../Api/userContext";

function SignIn() {
  const navigate = useNavigate();
  const { updateUser } = useSmileContext();

  const { googleSignIn } = useSmileContext();
  const [errorExist, setErrorExist] = useState(false);
  const iniciar = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const mySchema: ZodType<FormData> = z
    .object({
      nombre: z.string().min(3),
      email: z
        .string()
        .email({ message: "Introduzca una dirección de correo valido" }),
      password: z
        .string()
        .min(6, { message: "Debe contener como mínimo 6 caracteres" })
        .max(15, { message: "Debe contener como máximo 15 caracteres" }),
      "confirm-password": z.string(),
    })
    .refine((data) => data.password === data["confirm-password"], {
      message: "Las contraseñas no coinciden",
      path: ["confirm-password"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(mySchema),
  });

  const submitData = async (data: FormData) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // const user: UserType = res.user;
      // const newUser = {
      //   email: res.user.email,
      //   name: data.nombre,
      //   id: res.user.uid,
      //   userPhoto: "/Images/defaultuser.jpg",
      // };
      await addDoc(collection(db, "usuarios"), {
        name: data.nombre,
        email: data.email,
        uid: res.user.uid,
        userPhoto: "/Images/defaultuser.jpg",
      });
      const actualuser = { ...res.user, displayName: data.nombre };

      // @ts-expect-error need to push

      updateUser(actualuser);

      navigate("/perfil");
    } catch (error) {
      console.log(error);
      setErrorExist(true);
    }
  };

  return (
    <div className="isolate bg-white mt-20 px-6 py-12 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Crea tu cuenta Smile
        </h1>
        <p className="mt-2 text-base leading-8 text-gray-600">
          ¿Ya tiene una cuenta?{" "}
          <Link
            className="text-indigo-500 underline font-semibold"
            to={"/log-in"}
          >
            {" "}
            Inicia Sesión
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitData)}
        action="#"
        method="POST"
        className="mx-auto mt-6 max-w-xl sm:mt-6"
      >
        <button
          className="flex items-center gap-4 px-6 py-4 rounded-xl w-full border border-gray-300 justify-center font-semibold hover:shadow-lg"
          onClick={iniciar}
          type="button"
        >
          <img src="/svg/google.svg" alt="" />
          Google
        </button>
        <div className="grid grid-cols-1 gap-y-6 pt-9 mt-9 border-t border-gray-300">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                {...register("nombre")}
                type="text"
                name="nombre"
                id="nombre"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.nombre && (
                <span className="text-red-500">{errors.nombre.message}</span>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2.5">
              <input
                {...register("email")}
                type="text"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("confirm-password")}
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <button
                type="button"
                className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                role="switch"
                aria-checked="false"
                aria-labelledby="switch-1-label"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                ></span>
              </button>
            </div>
            <label
              className="text-sm leading-6 text-gray-600"
              id="switch-1-label"
            >
              By selecting this, you agree to our
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <Button type="submit">Registrarme</Button>
          {errorExist && (
            <div className="flex gap-2 items-center justify-center mt-3">
              <p className="text-red-500 text-center ">
                El correo ingresado ya existe. Por favor
              </p>
              <Link
                className="text-indigo-500 font-medium underline"
                to={"/log-in"}
              >
                Inicie Sesión
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignIn;
