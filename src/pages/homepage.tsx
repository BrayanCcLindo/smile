import { Eye, LockKeyhole, Rocket } from "lucide-react";
import MainLinkButton from "../components/mainLinkButton";
import { useGetCampaigns } from "../Api/getCampaigns";
import Card from "../components/card";
import { useGetUserData } from "../Api/getUserData";
import { Link } from "react-router-dom";
import CallToAction from "../components/callToAction";

function Homepage() {
  const { data } = useGetCampaigns();
  const firstThreeCampaigns = data.slice(0, 3);
  const { user } = useGetUserData();
  const userPhoto = user?.userPhoto;

  return (
    <section className="bg-white py-24 sm:py-10 mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center flex flex-col items-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Smile
          </h1>
          <p className=" my-6 text-lg leading-8 text-gray-600">
            Smile es una plataforma de crowdfunding o financiamiento colectivo,
            donde puedes crear campañas a las cuales llamamos Smile.
          </p>
          <MainLinkButton link={"/nueva-campaña"}>Crear campaña</MainLinkButton>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10 px-6 ">
        <video
          className="rounded-lg"
          preload="none"
          controls
          poster="/Images/imagenVideo.jpg"
          muted
        >
          <source src="/video/videoSmile.webm" type="video/webm"></source>
        </video>
      </div>
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
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
                  Tus reportes claros y en tiempo real. Tus Smiilers podrán ver
                  el total recaudado y tus actualizaciones de en qué se usaron
                  los recursos.
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
                  Todos los Smiilers son verificadas por nuestro sistema y
                  equipo para garantizar la seguridad de todos los usuarios.
                  También cada aporte pasa por diferentes filtros de seguridad.
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
                  Crea tu Smile en segundos y empieza a recibir aportes. Tus
                  Smiilers podrán aportar con su medio de pago favorito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-600 body-font max-w-7xl mx-auto">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Nuestras campañas top
              </h1>
              <div className="h-1 w-20 bg-main rounded"></div>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {firstThreeCampaigns.map((campaña, index) => (
              <Card key={index} campaña={campaña} photo={userPhoto} />
            ))}
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
      <CallToAction />
    </section>
  );
}

export default Homepage;
