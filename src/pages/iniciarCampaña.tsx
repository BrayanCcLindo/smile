import { Link } from "react-router-dom";
import { useSmileContext } from "../Api/userContext";

function NuevaCampaña() {
  const { stateProfile } = useSmileContext();
  return (
    <section className="text-gray-600 body-font mt-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-main"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              Ayúdanos a definir tu Kuzi
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              ¡Haz realidad tus sueños y genera impacto! ¿Quieres financiar tu
              proyecto o causa pero no sabes por dónde empezar? ¡Estás en el
              lugar correcto!
              <span className="font-bold text-main"> KUZI</span> te ofrece tres
              opciones de campañas para que elijas la que mejor se adapte a tus
              necesidades:
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 border-b border-gray-900/10 pb-12">
          <div className="p-4 md:w-1/3 relative group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className="group h-full border-2 border-gray-200 cursor-pointer border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg ">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="/Images/giftSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORIA
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3 group-hover:text-main">
                  Albergues, fundaciones y ONG
                </h1>
                <p className="leading-relaxed mb-3 ">
                  Consigue donaciones para tu causa social y sigue generando un
                  impacto positivo en tu comunidad. Comparte tu historia y
                  moviliza a tus seguidores para que te apoyen.
                </p>
                <div className="flex items-center flex-wrap ">
                  <p className="text-main inline-flex font-semibold items-center md:mb-2 lg:mb-0">
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
          <div className="p-4 md:w-1/3 relative group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className="group h-full border-2 border-gray-200 cursor-pointer border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg ">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="/Images/startSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORIA
                </h2>
                <h1 className=" title-font text-lg font-medium text-gray-900 mb-3 group-hover:text-main">
                  Emprendedores
                </h1>
                <p className="leading-relaxed mb-3">
                  Lanza tu proyecto innovador con nuestro modelo "Todo o Nada".
                  Recauda fondos a través de la compra anticipada de tus
                  productos o servicios y alcanza tus metas financieras.
                </p>
                <div className="flex items-center flex-wrap ">
                  <p className="text-main inline-flex font-semibold items-center md:mb-2 lg:mb-0">
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
          <div className="p-4 md:w-1/3 relative group">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="absolute inset-0"
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
            ></Link>
            <div className=" h-full border-2 border-gray-200 cursor-pointer border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg ">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="/Images/socialSmile.jpg"
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORIA
                </h2>
                <h1 className=" title-font text-lg font-medium text-gray-900 mb-3 group-hover:text-main">
                  Impacto Social
                </h1>
                <p className="leading-relaxed mb-3">
                  Financia proyectos que promuevan la educación, la salud, la
                  igualdad, la sostenibilidad y más. ¡Contribuye a un mundo
                  mejor y moviliza a otros para que se sumen a tu causa!
                </p>
                <div className="flex items-center flex-wrap ">
                  <p className="text-main inline-flex font-semibold items-center md:mb-2 lg:mb-0">
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
        {/* <div className="flex justify-center items-center flex-col gap-4 mt-7">
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
