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
  const { updateUser, logInGoogle } = useSmileContext();
  const navigate = useNavigate();
  const iniciar = async () => {
    try {
      await logInGoogle();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const mySchema: ZodType<LoginType> = z.object({
    email: z
      .string()
      .email({ message: "Introduzca una dirección de correo valido" }),
    password: z.string().min(2).max(20)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(mySchema)
  });

  const submitUserLogIn = (data: LoginType) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(user => {
        // @ts-expect-error need to push
        updateUser(user.user);
        navigate("/perfil");
      })
      .catch(() => {
        setErrorExist(true);
      });
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 mt-10 sm:mt-20 bg-main_bg lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto h-10 mx-auto"
          src="/Images/smileOficilLogo (1).png"
          alt="kuzi-logo"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-heading">
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
          <button
            className="flex items-center justify-center w-full gap-4 px-6 py-4 font-semibold border border-card_border text-heading rounded-xl hover:shadow-lg"
            onClick={iniciar}
            type="button"
          >
            <img src="/svg/google.svg" alt="" />
            Google
          </button>
          <div>
            <label className="block text-sm font-medium leading-6 text-heading">
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
                className="block w-full rounded-md border-0 py-1.5 px-2 text-heading shadow-sm ring-1 ring-inset ring-card_border placeholder:text-gray-400 bg-input_bg focus:ring-2 focus:ring-inset focus:main sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-heading">
                Contraseña
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  ¿Ha olvidado la contraseña?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-heading shadow-sm ring-1 bg-input_bg ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:main sm:text-sm sm:leading-6"
              />
              {errorExist && (
                <p className="text-center text-red-500 ">
                  El correo ingresado o contraseña no son correctos
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center flex-1 w-full">
            <Button type="submit">Continuar</Button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-500 ">
          ¿No tiene cuenta Kuzi?
          <Link
            to="/sign-in"
            className="ml-1 font-semibold leading-6 text-main "
          >
            Regístrese
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;