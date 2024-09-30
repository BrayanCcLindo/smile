import { Link } from "react-router-dom";
import MainLinkButton from "./mainLinkButton";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="relative py-8 isolate bg-gradient-to-b from-main_bg to-footer via-footer sm:py-12 lg:py-16 ">
        <div className="px-6 mx-auto max-w-7xl lg:px-8 ">
          <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xs lg:max-w-lg">
              <Link
                onClick={scrollToTop}
                to={"/"}
                className="flex items-center justify-center"
              >
                <img
                  className="object-cover"
                  width={300}
                  height={300}
                  src="/Images/smileOficilLogo (1).png"
                  alt="logo-smile"
                />
              </Link>

              <p className="mt-4 leading-8 text-content_text">
                ¡Bienvenidos! Aquí, cada clic es una oportunidad para
                transformar vidas
                <br /> y apoyar proyectos que cambian el mundo.
              </p>
              <div className="flex max-w-md mt-6 gap-x-4">
                <MainLinkButton link="/campaigns">Donar Ahora</MainLinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 font-semibold text-heading">
                  Enlaces Útiles
                </h3>
                <ul className="mt-2 leading-7 ">
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={"/como-funciona"}>
                      Como Funciona
                    </Link>
                  </li>
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={"/campaigns"}>
                      Campañas
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="max-w-xs py-2 text-lg leading-8 ">
                <h3 className="font-medium title-font text-heading">
                  Kuzi protege tu donativo
                </h3>
                {/* <p className="mt-2 text-base leading-8 text-gray-400">
                  Te garantizamos un reembolso completo de tu donativo durante
                  un año en el caso poco probable de que se produzca algún tipo
                  fraude. Consulta la Garantía de Smile.
                </p> */}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
