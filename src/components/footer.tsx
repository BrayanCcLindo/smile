import { Link } from "react-router-dom";
import MainLinkButton from "./mainLinkButton";

function Footer() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xs lg:max-w-lg">
              <Link to={"/"} className="flex items-center justify-center">
                <img
                  className="object-cover"
                  width={300}
                  height={300}
                  src="/Images/logoSmileBlanco.webp"
                  alt="logo-smile"
                />
              </Link>

              <p className="mt-4  leading-8 text-gray-300">
                Smile es una plataforma de crowdfunding o financiamiento
                colectivo, donde puedes crear campañas
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <MainLinkButton link="/nueva-campaña">
                  Crear Campaña
                </MainLinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 font-semibold text-white">
                  Enlaces Útiles
                </h3>
                <ul className="mt-2 leading-7 text-gray-400">
                  <li className="hover:text-white">
                    <Link to={"/"}>Inicio</Link>
                  </li>
                  <li className="hover:text-white">
                    <Link to={"/como-funciona"}>Como Funciona</Link>
                  </li>
                  <li className="hover:text-white">
                    <Link to={"/campañas"}>Campañas</Link>
                  </li>
                </ul>
              </div>
              <div className=" py-2 text-lg leading-8 text-gray-300 max-w-xs">
                <h3 className=" font-medium title-font text-white">
                  Smile protege tu donativo
                </h3>
                <p className="leading-8 text-base mt-2 text-gray-400">
                  Te garantizamos un reembolso completo de tu donativo durante
                  un año en el caso poco probable de que se produzca algún tipo
                  fraude. Consulta la Garantía de Smile.
                </p>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
