import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/mainLinkButton";
import { auth } from "../firebase/firebase";
import { useSmileContext } from "../Api/userContext";

type LoginType = {
  email: string;
  password: string;
};

function LogIn() {
  const [errorExist, setErrorExist] = useState(false);
  const { updateUser } = useSmileContext();

  const navigate = useNavigate();

  const mySchema: ZodType<LoginType> = z.object({
    email: z
      .string()
      .email({ message: "Introduzca una dirección de correo valido" }),
    password: z.string().min(2).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(mySchema),
  });

  const submitUserLogIn = (data: LoginType) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        // @ts-expect-error need to push

        updateUser(user);
        navigate("/perfil");
      })
      .catch((Error) => {
        console.log(Error);
        setErrorExist(true);
      });
  };

  return (
    <div className="flex  flex-col mt-20 justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Acceda a su cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(submitUserLogIn)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  ¿Ha olvidado la contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errorExist && (
                <p className="text-red-500 text-center ">
                  El correo ingresado o contraseña no son correctos
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full items-center justify-center flex-1">
            <Button type="submit">Continuar</Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 ">
          ¿No tiene cuenta Smile?
          <Link
            to="/sign-in"
            className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Regístrese
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
