import { Eye, LockKeyhole, Rocket } from "lucide-react";
import MainLinkButton from "../components/mainLinkButton";
import { useGetCampaigns } from "../Api/getCampaigns";
import Card from "../components/card";
import { Link } from "react-router-dom";
import CallToAction from "../components/callToAction";
import { useGetUserData } from "../Api/getUserData";
import Loader from "../components/loader";
// import { useSmileContext } from "../Api/userContext";

function Homepage() {
  const { data } = useGetCampaigns();
  const { user } = useGetUserData();
  console.log(user, "user");

  // const { stateProfile } = useSmileContext();

  const firstThreeCampaigns = data.slice(0, 3);

  return (
    <section className="bg-white py-24 sm:py-10 mt-32 scroll-smooth">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center flex flex-col items-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Smile
          </h1>
          <p className=" my-6 text-lg leading-8 text-gray-600 text-center">
            ¡Bienvenidos! Aquí, cada clic es una oportunidad para transformar
            vidas
            <br /> y apoyar proyectos que cambian el mundo.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap lg:justify-start">
            <MainLinkButton link="/campañas">Donar Ahora</MainLinkButton>

            <Link
              to="/como-funciona"
              className="text-sm font-semibold leading-6 text-main "
            >
              ¿Cómo funciona? <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-gray-600 body-font max-w-7xl mx-auto">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full ">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1
                id="campañasTop"
                className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              >
                Encuentra causas que te importan y dona para marcar la
                diferencia
              </h1>
              <div className="h-1 w-20 bg-main rounded"></div>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {firstThreeCampaigns.length > 0 ? (
              firstThreeCampaigns.map((campaña, index) => (
                <Card key={index} campaña={campaña} />
              ))
            ) : (
              <div className="col-span-full">
                <Loader />
              </div>
            )}
          </div>
          <div className="flex justify-end items-center">
            <Link
              to="/campañas"
              className="text-sm mt-2 font-semibold leading-6 text-main"
            >
              Ver todas las campañas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-gray-600 body-font ">
        <div className="max-w-7xl px-5 py-10 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10 ">
            <h1
              id="campañasTop"
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            >
              Recaudar fondos en Smile es fácil, eficaz y fiable.
            </h1>
            <div className="h-1 w-20 bg-main rounded"></div>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center rounded-full  text-main mb-4">
                  <Eye size={50} />
                </div>
                <h2 className="text-lg text-center text-gray-900 font-medium title-font mb-2">
                  Transparencia
                </h2>
                <p className="leading-relaxed text-base text-center">
                  Reportes claros y en tiempo Real. Tus 'Smilers' podrán ver el
                  total recaudado y recibir actualizaciones detalladas sobre el
                  uso de los recursos
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center rounded-full  text-main mb-4">
                  <LockKeyhole size={50} />
                </div>
                <h2 className="text-lg text-center text-gray-900 font-medium title-font mb-2">
                  Seguridad
                </h2>
                <p className="leading-relaxed text-base text-center">
                  Cada 'Smiler' es verificado por nuestro equipo y sistema para
                  proteger a todos los usuarios. Además, cada contribución se
                  somete a rigurosos filtros de seguridad
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center rounded-full  text-main mb-4">
                  <Rocket size={50} />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
                  Agilidad
                </h2>
                <p className="leading-relaxed text-base text-center">
                  Crea tu Smile en cuestión de segundos y comienza a recibir
                  contribuciones de inmediato. Tus 'Smilers' podrán colaborar
                  utilizando su método de pago preferido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CallToAction />
    </section>
  );
}

export default Homepage;
