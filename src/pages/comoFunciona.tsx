import {
  Album,
  HandHeart,
  Handshake,
  HeartHandshake,
  SmilePlus,
  TrendingUp
} from "lucide-react";
import CallToAction from "../components/callToAction";
import { Link } from "react-router-dom";
import MainLinkButton from "../components/mainLinkButton";

function ComoFunciona() {
  return (
    <section>
      <div className="text-base text-content_text bg-gradient-to-b from-second_bg to-main_bg via-second_bg">
        <div className="container flex flex-wrap px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-between w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <h1 className="mb-4 text-3xl font-medium title-font text-main">
                ¿Cómo funcionan las donaciones en Kuzi?
              </h1>
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full pointer-events-none bg-main/20"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-main">
                  <HandHeart />
                </div>
                <div className="flex-grow pl-4 ">
                  <h2 className="mb-1 font-medium tracking-wider text-heading">
                    ¿Por Qué Donar?
                  </h2>
                  <p className="leading-relaxed text-content_text">
                    <span className="font-semibold">
                      Tu Donación Marca la Diferencia
                    </span>{" "}
                    <br />
                    Únete, dona y transforma vidas con tu valioso aporte. Tu
                    participación es fundamental para hacer la diferencia.
                  </p>
                </div>
              </div>
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full pointer-events-none bg-main/20"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-main">
                  <Album />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="mb-1 font-medium tracking-wider text-heading">
                    Descubre Nuestras Campañas
                  </h2>
                  <p className="leading-relaxed text-content_text">
                    <span className="font-semibold">
                      Historias que Inspiran
                    </span>{" "}
                    <br />
                    Explora un mar de oportunidades: Descubre nuestras campañas,
                    listas para ser exploradas y apoyadas por ti
                  </p>
                </div>
              </div>

              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full pointer-events-none bg-main/20"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-main">
                  <SmilePlus />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="mb-1 font-medium tracking-wider text-heading">
                    Cómo Funciona
                  </h2>
                  <p className="leading-relaxed text-content_text">
                    <span className="font-semibold">Tu Donación en Acción</span>{" "}
                    <br />
                    Realiza donación y observa cómo transforma vidas en tiempo
                    real. ¡Únete y sé parte del cambio ahora mismo!
                  </p>
                </div>
              </div>
              <div className="relative flex">
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-main">
                  <HeartHandshake />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="mb-1 font-medium tracking-wider text-heading">
                    Únete a Nosotros
                  </h2>
                  <p className="leading-relaxed text-content_text">
                    <span className="font-semibold">Haz la Diferencia Hoy</span>{" "}
                    <br />
                    Únete ya y sé parte del cambio. Tu contribución es crucial.
                    ¡No esperes más para marcar la diferencia!
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mt-10 md:mt-0 lg:w-3/5 md:w-1/2">
              <video
                className="rounded-lg"
                preload="none"
                controls
                poster="/Images/imagenVideo.jpg"
              >
                <source src="/video/videoSmile.webm" type="video/webm"></source>
              </video>
              <div className="mt-10 ">
                <MainLinkButton link="/campaigns">Donar Ahora</MainLinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-content_text body-font bg-main_bg">
        <div className="flex flex-wrap justify-center px-5 py-24 mx-auto max-w-7xl lg:w-2/3">
          <div className="flex flex-col mb-20 space-y-4">
            <h2 className="mb-4 text-2xl font-medium sm:text-3xl title-font text-main">
              ¿Cómo funcionan las campañas en Kuzi?
            </h2>
            <p className="text-base leading-relaxed">
              Puedes crear un Kuzi para diversos proyectos como:
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="w-full p-4 text-center md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 border rounded-lg border-card_border ">
                  <Handshake className="inline-block w-12 h-12 mb-3 text-main" />

                  <p className="leading-relaxed">Apoyo a Fundaciones</p>
                </div>
              </div>
              <div className="w-full p-4 text-center md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 border rounded-lg border-card_border ">
                  <TrendingUp className="inline-block w-12 h-12 mb-3 text-main" />

                  <p className="leading-relaxed">Emprendedores</p>
                </div>
              </div>
              <div className="w-full p-4 text-center md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 border rounded-lg border-card_border ">
                  <HandHeart className="inline-block w-12 h-12 mb-3 text-main" />

                  <p className="leading-relaxed">Apoyo Social</p>
                </div>
              </div>
            </div>

            <p className="mx-auto text-base leading-relaxed ">
              Solo necesitas mucho entusiasmo, dedicación y la ayuda de tu
              comunidad, quienes realizarán los aportes financieros y la
              difusión de tu campaña para que llegue a muchos corazones y logres
              tu meta.
            </p>
          </div>
          <div className="flex flex-col w-full mb-20 space-y-4">
            <h2 className="mb-4 text-2xl font-medium sm:text-3xl title-font text-main">
              ¿Quiénes pueden crear una Kuzi?
            </h2>
            <p className="mx-auto text-base leading-relaxed ">
              <span className="font-medium">¡Todos pueden crear un Kuzi!</span>{" "}
              Si tienes un sueño, un proyecto, una iniciativa social o una idea
              de negocio, Kuzi es para ti. No importa si eres una sola persona o
              una comunidad unida por el mismo ideal.
            </p>

            <p className="leading-relaxed ">
              <span className="font-medium">
                🚀 Kuzi está abierta a estudiantes, innovadores, fundaciones,
                activistas, jóvenes, adultos, emprendedores… ¡para TODOS!
              </span>{" "}
              ¿Qué esperas para unirte al #KuziPower 💪?{" "}
              <Link
                to="/new-campaign"
                className="text-lg font-semibold leading-6 t text-main"
              >
                Crea tu Campaña <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <CallToAction />
    </section>
  );
}

export default ComoFunciona;
