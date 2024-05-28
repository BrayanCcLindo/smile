import { Link, useNavigate } from "react-router-dom";
import { useGetUserData } from "../Api/getUserData";
import Loader from "../components/loader";
import { Button } from "../components/mainLinkButton";
import { profileRoutes } from "../constants/routes";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type UpdateUserType = {
  userPhoto: FileList;
};

function Profile() {
  const { user } = useGetUserData();
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState("/Images/defaultuser.jpg");

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const mySchema: ZodType<UpdateUserType> = z.object({
    userPhoto: z.instanceof(FileList),
  });
  const {
    register,
    // handleSubmit,
    // formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(mySchema),
    mode: "all",
  });

  return (
    <>
      {user ? (
        <section className="text-gray-600 body-font mt-10">
          <div className="container px-5 py-24 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3  sm:pr-8 sm:py-8">
                  <ul className=" font-medium flex flex-col  gap-4">
                    {profileRoutes.map((route, index) => {
                      return (
                        <li className="text" key={index}>
                          <Link
                            className="text-indigo-500  hover:underline"
                            to={route.to}
                          >
                            {route.text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className=" flex items-center justify-start gap-x-6 mt-4">
                    <button
                      onClick={() => {
                        handleSignOut();
                      }}
                      className="font-medium text-indigo-500 flex items-center justify-end gap-2"
                    >
                      Cerrar Sesión <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className=" text-center">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                      <img
                        className="rounded-full object-cover object-center"
                        src={userPhoto}
                        alt="foto-perfil"
                      />
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                      <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                      <div className="flex items-center justify-center relative">
                        <Button type="button">Actualizar Imagen</Button>
                        <label
                          htmlFor="userPhoto"
                          className="absolute inset-0 cursor-pointer"
                        >
                          <input
                            {...register("userPhoto", {
                              // required: "Tu foto es importante",
                              onChange: (event) => {
                                const mainImage = event.target.files[0];

                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                  setUserPhoto(reader.result as string);
                                });
                                if (mainImage) {
                                  reader.readAsDataURL(mainImage);
                                }
                              },
                            })}
                            accept="image/png image/jpg imgage/jpeg"
                            id="userPhoto"
                            name="userPhoto"
                            className="sr-only"
                            type="file"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <form method="POST">
                    <div className="space-y-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label
                            htmlFor="nombres"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Nombre y Apellidos
                          </label>
                          <div className="mt-2">
                            <input
                              id="nombres"
                              name="nombres"
                              readOnly
                              defaultValue={user.name}
                              className="block w-full  border-0 py-1.5 px-2 text-gray-900 border-b border-b-gray-900 placeholder:text-gray-400 outline-none  sm:text-sm sm:leading-6 trim"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="correo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Correo
                          </label>
                          <div className="mt-2">
                            <input
                              id="correo"
                              name="correo"
                              defaultValue={user.email}
                              type="email"
                              readOnly
                              className="block w-full  border-0 py-1.5 px-2 text-gray-900 border-b border-b-gray-900 placeholder:text-gray-400 outline-none  sm:text-sm sm:leading-6 trim"
                            />
                          </div>
                          {/* <div className=" flex items-center justify-end gap-x-6 mt-10">
                            <Button type="submit">Actualizar</Button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Profile;
