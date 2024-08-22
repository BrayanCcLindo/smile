import { useGetUserData } from "../Api/getUserData";
import Card from "../components/card";
import Loader from "../components/loader";
import MainLinkButton from "../components/mainLinkButton";
import { Settings2 } from "lucide-react";
import CallToAction from "../components/callToAction";
import { useGetCampaigns } from "../Api/getCampaigns";
import { useSmileContext } from "../Api/userContext";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useGetUserData();

  const { stateProfile } = useSmileContext();

  const { data } = useGetCampaigns();
  const userCampaigns = data.filter(campaña => campaña.id === stateProfile.uid);

  return (
    <>
      {stateProfile ? (
        <div className="relative py-24 overflow-hidden isolate sm:py-32">
          <div className="relative py-20 mx-auto text-white bg-gray-900 lg:mx-0">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                <h2 className="text-3xl font-bold tracking-tight text-center sm:text-6xl sm:text-left">
                  Bienvenido a Smile
                  <br /> {user?.name ?? stateProfile.displayName}
                </h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <img
                    src={user?.userPhoto ?? "/Images/defaultuser.jpg"}
                    height={150}
                    width={150}
                    alt="foto-usuario"
                    className="object-cover object-center rounded-full"
                  />
                  <MainLinkButton link="/configuracion">
                    <Settings2 />
                    Configurar
                  </MainLinkButton>
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                <span className="font-medium text-white">
                  Cambia vidas hoy:
                </span>{" "}
                Descubre campañas inspiradoras y dona para crear un impacto Real
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 lg:justify-start">
                <MainLinkButton link="/campañas">
                  Ver campañas y Donar
                </MainLinkButton>

                <Link
                  to="/como-funciona"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Ver cómo funciona Smile <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="px-6 mx-auto text-gray-900 max-w-7xl lg:px-8">
            <div className="mx-auto mt-10 lg:mx-0 lg:max-w-none">
              <h3 className="mb-2 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
                Tus Campañas Smile
              </h3>
              <p className="mt-6 text-sm leading-8 text-center">
                <span className="font-medium">
                  {user?.name ?? stateProfile.displayName}
                </span>{" "}
                {userCampaigns.length > 0
                  ? `tienes ${userCampaigns.length} campañas creadas`
                  : "aún no has creado ninguna campaña."}
              </p>
              <div className="grid grid-cols-1 pt-10 mx-auto mt-10 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {userCampaigns.length > 0 ? (
                  userCampaigns.map((campaña, index) => (
                    <Card key={index} campaña={campaña} index={index} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center col-span-3 gap-4 mt-7">
                    <h4 className="text-xl font-medium title-font">
                      ¿Listo para crear tu campaña Smile?
                    </h4>

                    <div className="flex flex-wrap items-center gap-7">
                      <MainLinkButton
                        link={stateProfile ? "/nueva-campaña" : "/sign-in"}
                      >
                        Crear Campaña
                      </MainLinkButton>
                      <Link
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                        to="/campañas"
                        className="text-sm font-semibold leading-6 text-main"
                      >
                        Ver campañas activas <span aria-hidden="true">→</span>
                      </Link>
                    </div>
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
