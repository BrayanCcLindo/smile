import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/ui/loaders/loader";
import { profileRoutes } from "../constants/routes";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useSmileContext } from "../Api/userContext";
import { useGetUserData } from "../Api/getUserData";
import Avatar from "../components/avatar";

function Configuracion() {
  const { stateProfile, updateUser } = useSmileContext();
  const { user } = useGetUserData();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      updateUser(null);
      window.localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {stateProfile ? (
        <section className="text-content_text bg-main_bg">
          <div className="container flex flex-col px-5 py-24 mx-auto">
            <div className="mx-auto lg:w-4/6">
              <div className="flex flex-col mt-10 sm:flex-row">
                <div className="sm:w-1/3 sm:pr-8 sm:py-8">
                  <ul className="flex flex-col gap-4 font-medium ">
                    {profileRoutes.map((route, index) => {
                      return (
                        <li className="text" key={index}>
                          <Link
                            className="text-main hover:underline"
                            to={route.to}
                          >
                            {route.text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex items-center justify-start mt-4 gap-x-6">
                    <button
                      onClick={() => {
                        handleSignOut();
                      }}
                      className="flex items-center justify-end gap-2 font-medium text-main"
                    >
                      Cerrar Sesión <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
                <div className="pt-4 mt-4 text-center border-t border-card_border sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l sm:border-t-0 sm:mt-0">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full">
                    <Avatar username={stateProfile.displayName ?? user?.name} />
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-1 mt-2 mb-4 rounded bg-main"></div>
                    {/* <div className="relative flex items-center justify-center">
                      <MainButton type="button">Actualizar Imagen</MainButton>
                      <label
                        htmlFor="userPhoto"
                        className="absolute inset-0 cursor-pointer"
                      >
                        <input
                          // {...register("userPhoto", {
                          //   // required: "Tu foto es importante",
                          //   onChange: event => {
                          //     const mainImage = event.target.files[0];

                          //     const reader = new FileReader();
                          //     reader.addEventListener("load", () => {
                          //       // setUserPhoto(reader.result as string);
                          //     });
                          //     if (mainImage) {
                          //       reader.readAsDataURL(mainImage);
                          //     }
                          //   }
                          // })}
                          accept="image/png image/jpg imgage/jpeg"
                          id="userPhoto"
                          name="userPhoto"
                          className="sr-only"
                          type="file"
                        />
                      </label>
                    </div> */}
                  </div>
                  <form method="POST">
                    <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="nombres"
                          className="block text-sm font-medium leading-6 text-heading sm:text-left"
                        >
                          Nombre y Apellidos
                        </label>
                        <div className="mt-2">
                          <input
                            id="nombres"
                            name="nombres"
                            readOnly
                            defaultValue={
                              user?.name ?? stateProfile.displayName
                            }
                            className="block w-full py-1.5 px-2 text-heading rounded-md outline-none bg-third_bg sm:text-sm sm:leading-6 trim"
                          />
                        </div>
                      </div>
                      <div className="col-span-full sm:text-left">
                        <label
                          htmlFor="correo"
                          className="block text-sm font-medium leading-6 text-heading"
                        >
                          Correo
                        </label>
                        <div className="mt-2">
                          <input
                            id="correo"
                            name="correo"
                            defaultValue={stateProfile.email}
                            type="email"
                            readOnly
                            className="block w-full py-1.5 px-2 text-heading rounded-md outline-none bg-third_bg sm:text-sm sm:leading-6 trim"
                          />
                        </div>
                        {/* <div className="flex items-center justify-end mt-10 gap-x-6">
                          <MainButton type="submit">Actualizar</MainButton>
                        </div> */}
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

export default Configuracion;
