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
              Ayúdanos a definir tu Smile
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              Escoge el objetivo de lo que necesitas y habilita funcionalidades
              exclusivas. <br />
              <span className="font-bold text-main">Los Smilers</span>, al estar
              en línea, tienen una cobertura mayor ya que puedes recibir aportes
              desde cualquier parte del Mundo. Tu comunidad, familia y amigos
              pueden difundir la información compartiendo el link único de tu
              Smile por redes sociales y llegar a personas que no conoces, pero
              comparten tus ideas.
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
                  Gift Smile
                </h1>
                <p className="leading-relaxed mb-3 ">
                  Ideal para los momentos que necesitas apoyo de tu comunidad,
                  como movimientos ciudadanos, proyectos personales, de animales
                  o momentos difíciles cuando la unión hará la diferencia.
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
                  Start Smile
                </h1>
                <p className="leading-relaxed mb-3">
                  Ideal para creadores, diseñadores, innovadores que tienen un
                  nuevo producto o servicio y desean financiarlo con una
                  pre-venta en una campaña todo o nada.
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
                  Social Smile
                </h1>
                <p className="leading-relaxed mb-3">
                  Recibe todos los servicios de Smile. Marca exclusiva para
                  fundaciones, emergencias por catástrofes naturales o médicas.
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
