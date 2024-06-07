import { Link } from "react-router-dom";
import MainLinkButton from "./mainLinkButton";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="relative isolate border-t border-gray-[#f2f2f2]  bg-[#f2f2f2]  py-8 sm:py-12 lg:py-16 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
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

              <p className="mt-4  leading-8 ">
                ¡Bienvenidos! Aquí, cada clic es una oportunidad para
                transformar vidas
                <br /> y apoyar proyectos que cambian el mundo.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <MainLinkButton link="/campañas">Donar Ahora</MainLinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 font-semibold ">Enlaces Útiles</h3>
                <ul className="mt-2 leading-7 ">
                  <li className="hover:text-main">
                    <Link onClick={scrollToTop} to={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li className="hover:text-main">
                    <Link onClick={scrollToTop} to={"/como-funciona"}>
                      Como Funciona
                    </Link>
                  </li>
                  <li className="hover:text-main">
                    <Link onClick={scrollToTop} to={"/campañas"}>
                      Campañas
                    </Link>
                  </li>
                </ul>
              </div>
              <div className=" py-2 text-lg leading-8  max-w-xs">
                <h3 className=" font-medium title-font ">
                  Smile protege tu donativo
                </h3>
                {/* <p className="leading-8 text-base mt-2 text-gray-400">
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
