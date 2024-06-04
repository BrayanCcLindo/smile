import {
  Album,
  Eye,
  HandHeart,
  HeartHandshake,
  LockKeyhole,
  Rocket,
  SmilePlus,
} from "lucide-react";
import MainLinkButton from "../components/mainLinkButton";
import { useGetCampaigns } from "../Api/getCampaigns";
import Card from "../components/card";
import { Link } from "react-router-dom";
import CallToAction from "../components/callToAction";
// import { useSmileContext } from "../Api/userContext";

function Homepage() {
  const { data } = useGetCampaigns();
  // const { stateProfile } = useSmileContext();

  const firstThreeCampaigns = data.slice(0, 3);

  return (
    <section className="bg-white py-24 sm:py-10 mt-32 scroll-smooth">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center flex flex-col items-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Smile
          </h1>
          <p className=" my-6 text-lg leading-8 text-gray-600">
            Smile es una innovadora plataforma de crowdfunding donde puedes dar
            vida a tus ideas y proyectos a través de campañas que llamamos
            'Smiles'. Únete a nosotros y descubre cómo tu iniciativa puede
            transformar el mundo, una sonrisa a la vez
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap lg:justify-start">
            <MainLinkButton link="/nueva-campaña">Crear Campaña</MainLinkButton>

            <Link
              to="/campañas"
              className="text-sm font-semibold leading-6 text-main "
            >
              Ver Campañas <span aria-hidden="true">→</span>
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
                Nuestras campañas destacadas
              </h1>
              <div className="h-1 w-20 bg-main rounded"></div>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {firstThreeCampaigns.map((campaña, index) => (
              <Card key={index} campaña={campaña} />
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

      <div className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
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
      <section className="text-gray-600 body-font text-base">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <HandHeart />
                </div>
                <div className="flex-grow pl-4 ">
                  <h2 className="font-medium title-font  text-gray-900 mb-1 tracking-wider">
                    ¿Por Qué Donar?
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">
                      Tu Donación Marca la Diferencia
                    </span>{" "}
                    <br />
                    Cada donación, sin importar su tamaño, cuenta. Al
                    contribuir, financias proyectos innovadores, apoyas causas
                    urgentes y transformas vidas. Únete y haz la diferencia
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <Album />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Descubre Nuestras Campañas
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">
                      Historias que Inspiran
                    </span>{" "}
                    <br />
                    Nuestra plataforma ofrece campañas diversas, desde
                    emergencias médicas hasta proyectos educativos, ambientales
                    y tecnológicos. Cada una tiene una historia única y urgente
                    que necesita tu apoyo
                  </p>
                </div>
              </div>

              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <SmilePlus />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Cómo Funciona
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Tu Donación en Acción</span>{" "}
                    <br />
                    Explora nuestras campañas, elige la que te inspire, realiza
                    tu donación con facilidad y seguridad, y sigue su progreso
                    para ver el impacto directo de tu contribución
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <HeartHandshake />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Únete a Nosotros
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Haz la Diferencia Hoy</span>{" "}
                    <br />
                    Únete ahora a nuestra comunidad de donantes y comienza a
                    cambiar el mundo. Tu contribución es el primer paso hacia un
                    futuro mejor para muchos. ¡No esperes más!
                  </p>
                </div>
              </div>
            </div>
            <img
              className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
              src="/Images/giftSmile.jpg"
              alt="step"
            />
          </div>
        </div>
      </section>

      <CallToAction />
    </section>
  );
}

export default Homepage;
