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
import { MainButton } from "../components/mainLinkButton";
import { toast } from "sonner";
import { useSmileContext } from "../Api/userContext";
import { SEOComponent } from "../assets/SEO";

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
      "confirm-password": z.string()
    })
    .refine(data => data.password === data["confirm-password"], {
      message: "Las contraseñas no coinciden",
      path: ["confirm-password"]
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(mySchema)
  });

  const submitData = async (data: FormData) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await addDoc(collection(db, "usuarios"), {
        name: data.nombre,
        email: data.email,
        uid: res.user.uid,
        userPhoto: "/Images/defaultuser.jpg"
      });
      const actualuser = { ...res.user, displayName: data.nombre };

      // @ts-expect-error need to push
      updateUser(actualuser);
      toast.success("Cuenta creada exitosamente", {
        duration: 2000,
        position: "top-right"
      });
      navigate("/");
    } catch (error) {
      toast.error("Error al crear la cuenta", {
        duration: 2000,
        position: "top-right"
      });
      setErrorExist(true);
    }
  };

  return (
    <>
      <SEOComponent
        canonicalUrl="https://kuzifund.com/sign-in"
        title="Regístrate en KUZI FUND - Crea tu Cuenta y Empieza a Recaudar Fondos"
        description="Regístrate en KUZI FUND y comienza a crear campañas para emprendedores, fundaciones o causas sociales."
      />
      <div className="px-6 py-12 isolate bg-main_bg sm:py-12 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Crea tu cuenta Kuzi
          </h1>
          <p className="mt-2 text-base leading-8 text-content_text">
            ¿Ya tiene una cuenta?{" "}
            <Link className="font-semibold underline text-main" to={"/log-in"}>
              {" "}
              Inicia Sesión
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitData)}
          action="#"
          method="POST"
          className="max-w-xl mx-auto mt-6 sm:mt-6"
        >
          <button
            className="flex items-center justify-center w-full gap-4 px-6 py-4 font-semibold border border-card_border rounded-xl hover:shadow-lg text-heading"
            onClick={iniciar}
            type="button"
          >
            <img src="/svg/google.svg" alt="" />
            Google
          </button>
          <div className="grid grid-cols-1 border-t border-card_border gap-y-6 pt-9 mt-9">
            <div>
              <label className="block text-sm font-semibold leading-6 text-heading">
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  {...register("nombre")}
                  type="text"
                  name="nombre"
                  id="nombre"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-heading shadow-sm ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main bg-input_bg sm:text-sm"
                />
                {errors.nombre && (
                  <span className="text-red-500">{errors.nombre.message}</span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-heading">
                Correo
              </label>
              <div className="mt-2.5">
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-heading shadow-sm ring-1 ring-inset bg-input_bg ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-heading">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-heading shadow-sm ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main bg-input_bg sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-heading">
                Confirm Password
              </label>
              <div className="mt-2.5">
                <input
                  {...register("confirm-password")}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-heading shadow-sm ring-1 ring-inset ring-card_border  placeholder:text-gray-400 bg-input_bg focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex items-center h-6">
              <button
                type="button"
                className="flex flex-none w-8 p-px transition-colors duration-200 ease-in-out bg-gray-200 rounded-full cursor-pointer ring-1 ring-inset ring-heading/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                role="switch"
                aria-checked="false"
                aria-labelledby="switch-1-label"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="w-4 h-4 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow-sm ring-1 ring-heading/5"
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
          </div> */}
          </div>
          <div className="mt-10">
            <MainButton type="submit">Registrarme</MainButton>
            {errorExist && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <p className="text-center text-red-500 ">
                  El correo ingresado ya existe. Por favor
                </p>
                <Link
                  className="font-medium text-indigo-500 underline"
                  to={"/log-in"}
                >
                  Inicie Sesión
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
