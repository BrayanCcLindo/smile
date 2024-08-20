import { Link } from "react-router-dom";
import { useSmileContext } from "../Api/userContext";

function NuevaCampaña() {
  const { stateProfile } = useSmileContext();
  return (
    <section className="mt-10 text-content_text body-font bg-main_bg">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col flex-wrap py-6 mb-12 sm:flex-row">
            <h1 className="mb-2 text-2xl font-medium text-heading sm:w-2/5 title-font sm:mb-0">
              Ayúdanos a definir tu Kuzi
            </h1>
            <p className="pl-0 text-base leading-relaxed text-content_text sm:w-3/5 sm:pl-10">
              ¡Haz realidad tus sueños y genera impacto! ¿Quieres financiar tu
              proyecto o causa pero no sabes por dónde empezar? ¡Estás en el
              lugar correcto!
              <span className="font-bold text-main"> KUZI</span> te ofrece tres
              opciones de campañas para que elijas la que mejor se adapte a tus
              necesidades:
            </p>
          </div>
        </div>
        <div className="flex flex-wrap pb-12 -mx-4 -mt-4 -mb-10 sm:-m-4 ">
          <div className="relative p-4 md:w-1/3 group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border group border-opacity-60 hover:shadow-lg ">
              <img
                className="object-cover object-center w-full lg:h-48 md:h-36"
                src="/Images/giftSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h3 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                  CATEGORIA
                </h3>
                <h2 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                  Albergues, fundaciones y ONG
                </h2>
                <p className="mb-3 leading-relaxed text-content_text">
                  Consigue donaciones para tu causa social y sigue generando un
                  impacto positivo en tu comunidad. Comparte tu historia y
                  moviliza a tus seguidores para que te apoyen.
                </p>
                <div className="flex flex-wrap items-center ">
                  <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                    Crear Campaña
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-4 md:w-1/3 group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border group border-opacity-60 hover:shadow-lg ">
              <img
                className="object-cover object-center w-full lg:h-48 md:h-36"
                src="/Images/startSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h2 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                  CATEGORIA
                </h2>
                <h1 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                  Emprendedores
                </h1>
                <p className="mb-3 leading-relaxed text-content_text">
                  Lanza tu proyecto innovador con nuestro modelo "Todo o Nada".
                  Recauda fondos a través de la compra anticipada de tus
                  productos o servicios y alcanza tus metas financieras.
                </p>
                <div className="flex flex-wrap items-center ">
                  <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                    Crear Campaña
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-4 md:w-1/3 group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border border-opacity-60 hover:shadow-lg">
              <img
                className="object-cover object-center w-full lg:h-48 md:h-36"
                src="/Images/socialSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h3 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                  CATEGORIA
                </h3>
                <h2 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                  Impacto Social
                </h2>
                <p className="mb-3 leading-relaxed text-content_text">
                  Financia proyectos que promuevan la educación, la salud, la
                  igualdad, la sostenibilidad y más. ¡Contribuye a un mundo
                  mejor y moviliza a otros para que se sumen a tu causa!
                </p>
                <div className="flex flex-wrap items-center ">
                  <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                    Crear Campaña
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center gap-4 mt-7">
          <h4 className="text-xl font-medium title-font">
            ¿Quiere crear su primera camapaña?
          </h4>
          <MainLinkButton
            link={stateProfile ? "/formulario-campaña" : "/sign-in"}
          >
            Comenzar
          </MainLinkButton>
        </div> */}
      </div>
    </section>
  );
}

export default NuevaCampaña;
