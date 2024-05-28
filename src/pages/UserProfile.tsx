// import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { useGetUserCampaigns } from "../Api/getUserCampaigns";
import { useGetUserData } from "../Api/getUserData";
import Card from "../components/card";
import Loader from "../components/loader";
import MainLinkButton from "../components/mainLinkButton";
import { useSmileContext } from "../Api/userContext";
import { Settings2 } from "lucide-react";
import CallToAction from "../components/callToAction";
// import { db } from "../firebase/firebase";

function UserProfile() {
  const { user } = useGetUserData();

  const { userCampaigns } = useGetUserCampaigns();
  const { stateProfile } = useSmileContext();
  const userPhoto = user?.userPhoto;

  return (
    <>
      {user ? (
        <div className="relative isolate overflow-hidden  py-24 sm:py-32">
          <div className="mx-auto  lg:mx-0 relative text-white bg-gray-900 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight  sm:text-6xl">
                  Bienvenido a Smile
                  <br /> {user?.name}
                </h2>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <img
                    src={user.userPhoto ?? "/public/Images/defaultuser.jpg"}
                    height={150}
                    width={150}
                    alt="foto-usuario"
                    className="rounded-full object-cover object-center"
                  />
                  <MainLinkButton link="/configuracion">
                    <Settings2 />
                    Configurar
                  </MainLinkButton>
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Smile es una plataforma de crowdfunding o financiamiento
                colectivo, donde puedes crear campañas
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-gray-900">
            <div className="mx-auto mt-10  lg:mx-0 lg:max-w-none">
              <h3 className="sm:text-3xl text-2xl text-center font-medium title-font mb-2 text-gray-900">
                Tus Campañas Smile
              </h3>
              <p className="mt-6 text-center leading-8 text-sm">
                <span className="font-medium">
                  {user?.name ?? stateProfile.displayName}
                </span>{" "}
                {userCampaigns.length > 0
                  ? `tienes ${userCampaigns.length} campañas creadas`
                  : "aún no has creado ninguna campaña."}
              </p>
              <div className="mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {userCampaigns.length > 0 ? (
                  userCampaigns.map((campaña, index) => (
                    <Card key={index} campaña={campaña} photo={userPhoto} />
                  ))
                ) : (
                  <div className="flex justify-center items-center flex-col gap-4 mt-7 col-span-3">
                    <h4 className="text-xl font-medium title-font">
                      ¿Listo para crear tu camapaña Smile?
                    </h4>

                    {/* <Link
                      className="bg-indigo-500 px-4 py-3 rounded-md  text-sm font-semibold leading-6  text-white"
                      to={stateProfile ? "/formulario-campaña" : "/sign-in"}
                    >
                      {!stateProfile ? "Registrarme" : "Crear Camapaña"}
                    </Link> */}
                    <MainLinkButton link="/formulario-campaña">
                      Crear Campaña
                    </MainLinkButton>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CallToAction />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserProfile;
