import { Link } from "react-router-dom";
import MainLinkButton from "./mainLinkButton";
import { routes, ROUTES } from "../constants/routes";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      {/* <div className="relative py-8 isolate bg-gradient-to-b from-main_bg to-footer via-footer sm:py-12 lg:py-16 ">
        <div className="px-6 mx-auto max-w-7xl lg:px-8 ">
          <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xs lg:max-w-lg">
              <Link
                onClick={scrollToTop}
                to={ROUTES.HOMEPAGE}
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
                <MainLinkButton link={ROUTES.CAMPANAS}>
                  Donar Ahora
                </MainLinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 font-semibold text-heading">
                  Enlaces Útiles
                </h3>
                <ul className="mt-2 leading-7 ">
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={ROUTES.HOMEPAGE}>
                      Inicio
                    </Link>
                  </li>
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={ROUTES.COMO_FUNCIONA}>
                      Como Funciona
                    </Link>
                  </li>
                  <li className="hover:text-main text-content_text">
                    <Link onClick={scrollToTop} to={ROUTES.CAMPANAS}>
                      Campañas
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="max-w-xs py-2 text-lg leading-8 ">
                <h3 className="font-medium title-font text-heading">
                  Kuzi protege tu donativo
                </h3>
            
              </div>
            </dl>
          </div>
        </div>
      </div> */}
      <footer className="py-12 bg-gradient-to-b from-main_bg to-footer via-footer text-content_text">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <Link
                to={ROUTES.HOMEPAGE}
                onClick={scrollToTop}
                className="mb-2 text-2xl font-bold"
              >
                <img
                  className="object-cover"
                  width={300}
                  height={300}
                  src="/Images/smileOficilLogo (1).png"
                  alt="logo-smile"
                />
              </Link>
              <p className="mt-4 leading-8 text-content_text ">
                ¡Bienvenidos! Aquí, cada clic es una oportunidad para
                transformar vidas
                <br /> y apoyar proyectos que cambian el mundo.
              </p>
            </div>

            {/* Site Links */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-lg font-semibold text-heading">
                Enlaces Rápidos
              </h3>
              <nav className="flex flex-col space-y-2">
                {routes.map(routes => (
                  <Link
                    onClick={scrollToTop}
                    to={routes.to}
                    className="transition-colors hover:text-main"
                  >
                    {routes.text}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Media and Contact */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-lg font-semibold text-heading">
                Conéctate con Nosotros
              </h3>
              <div className="flex mb-4 space-x-4">
                <a href="#" className="transition-colors hover:text-main">
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="transition-colors hover:text-main">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="transition-colors hover:text-main">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
              <a
                href="mailto:info@kuzifund.com"
                className="flex items-center transition-colors hover:text-main"
              >
                <Mail size={20} className="mr-2" />
                info@kuzifund.com
              </a>
              <div className="flex max-w-md mt-2 gap-x-4">
                <MainLinkButton link={ROUTES.CAMPANAS}>
                  Donar Ahora
                </MainLinkButton>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 text-sm text-center border-t text-content_text border-card_border">
            © {new Date().getFullYear()} KuziFund. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
