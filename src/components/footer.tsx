import { Link } from "react-router-dom";
import { routes, ROUTES } from "../constants/routes";
import { Facebook, Instagram, Mail } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <footer className="py-12 bg-gradient-to-b from-main_bg to-footer via-footer text-content_text">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <Link
                to={ROUTES.HOMEPAGE}
                onClick={scrollToTop}
                className="flex items-center justify-center w-full mb-2 text-2xl font-bold"
              >
                <img
                  loading="lazy"
                  className="object-cover"
                  width={200}
                  height={200}
                  src="/Images/smileOficilLogo (1).png"
                  alt="logo-smile"
                />
              </Link>
              <p className="mt-4 leading-8 text-content_text ">
                ¡Bienvenidos! Aquí, cada clic es una oportunidad para
                transformar vidas y apoyar proyectos que cambian el mundo.
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

            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-lg font-semibold text-heading">
                Conéctate con Nosotros
              </h3>
              <div className="flex mb-4 space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61566558746032"
                  target="_blank"
                  className="transition-colors hover:text-main"
                >
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/kuzifund/"
                  target="_blank"
                  className="transition-colors hover:text-main"
                >
                  <Instagram size={24} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://www.tiktok.com/@kuzifund.com?lang=es"
                  target="_blank"
                  className="transition-colors hover:text-main"
                >
                  <svg
                    stroke="currentColor"
                    className="fill-current hover:text-main"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 256 256"
                    height="1.6rem"
                    width="1.6rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"></path>
                  </svg>
                  <span className="sr-only">Tiktok</span>
                </a>
              </div>
              <a
                href="mailto:info@kuzifund.com"
                className="flex items-center transition-colors hover:text-main"
              >
                <Mail size={20} className="mr-2" />
                info@kuzifund.com
              </a>
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
