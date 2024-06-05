import { Link } from "react-router-dom";
import MainLinkButton from "./mainLinkButton";

function CallToAction() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-10 lg:px-8">
        <div className="relative isolate overflow-hidden bg-indigo-100 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl text-main font-bold tracking-tight sm:text-4xl">
              ¿Listo para empezar?
            </h2>
            <p className="mt-6 text-lg leading-8 ">
              Únete a los miles como tú que están marcando la diferencia con
              Smile. ¡Tu ayuda importa!
            </p>
            <div className="mt-10 flex items-center justify-center gap-6 flex-wrap lg:justify-start">
              <MainLinkButton link="/campañas">Donar Ahora</MainLinkButton>

              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                to="/como-funciona"
                className="text-sm font-semibold leading-6 text-main"
              >
                Como funciona <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="/Images/giftSmile.jpg"
              alt="App screenshot"
              width="1824"
              height="1080"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
