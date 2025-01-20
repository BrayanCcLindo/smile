import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useSmileContext } from "../Api/userContext";
import { useState } from "react";
import MainLinkButton from "./mainLinkButton";
import SwitchToogle from "./switchToogle";
import Avatar from "./avatar";
import { useGetUserData } from "../Api/getUserData";
import { LanguageSelector } from "./languageSelector";
import { useTranslation } from "react-i18next";

function Header() {
  const { stateProfile, routes } = useSmileContext();
  const { user } = useGetUserData();
  const { t } = useTranslation("global");

  const [showMenu, setShowMenu] = useState(true);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={
        "bg-main_bg sticky top-0 shadow-sm right-0 left-0 z-40 shadow-card_border text-heading "
      }
    >
      <nav
        className="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-8 "
        aria-label="Global"
      >
        <div className="flex">
          <Link to={ROUTES.HOMEPAGE} className="-m-1.5 p-1.5">
            <span className="sr-only">Kuzi</span>
            <img
              loading="lazy"
              className="w-auto h-8"
              src="/Images/smileOficilLogo (1).png"
              alt="smile-logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          {showMenu && (
            <button
              onClick={() => {
                setShowMenu(false);
              }}
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <ul className="flex items-center gap-8 text-base font-medium ">
            {routes.map(route => {
              return (
                <li className="text" key={route.to}>
                  <NavLink
                    onClick={() => {
                      setShowMenu(true);
                      window.scrollTo(0, 0);
                    }}
                    className={({ isActive }) => {
                      return isActive ? "text-main " : "text-heading";
                    }}
                    to={route.to}
                  >
                    {route.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="items-center hidden gap-4 lg:flex lg:justify-end">
            <LanguageSelector />

            {!stateProfile ? (
              <>
                {" "}
                <Link
                  onClick={scrollToTop}
                  className="text-heading hover:text-main"
                  to={ROUTES.LOG_IN}
                >
                  {t("menu.login")} <span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={scrollToTop}
                  className="rounded-full "
                  to={ROUTES.PERFIL}
                >
                  <Avatar username={stateProfile.displayName ?? user?.name} />
                </Link>
              </>
            )}
            <MainLinkButton link={ROUTES.CREAR_CAMPANA}>
              {t("cta.tertiary")}
            </MainLinkButton>
            <SwitchToogle />
          </div>
        </div>
      </nav>
      <div
        className={`${!showMenu ? "block" : "hidden"} lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-main_bg sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={ROUTES.HOMEPAGE} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                loading="lazy"
                className="w-auto h-8"
                src="/Images/smileOficilLogo (1).png"
                alt="logo-smile"
              />
            </Link>
            {!showMenu && (
              <button
                onClick={() => {
                  setShowMenu(true);
                }}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-heading"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flow-root mt-6">
            <div className="divide-y divide-gray-500/10">
              <MainLinkButton link={ROUTES.CREAR_CAMPANA}>
                Crear Campaña
              </MainLinkButton>

              <ul className="py-6 space-y-2 text-sm font-semibold">
                {routes.map(route => {
                  return (
                    <li key={route.to}>
                      <NavLink
                        onClick={() => {
                          setShowMenu(true);
                          window.scrollTo(0, 0);
                        }}
                        className={({ isActive }) => {
                          return isActive ? "text-main" : "text-heading";
                        }}
                        to={route.to}
                      >
                        {route.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-4 py-6 ">
                {!stateProfile ? (
                  <Link
                    onClick={() => {
                      setShowMenu(true);
                      window.scrollTo(0, 0);
                    }}
                    className="text-heading hover:text-main"
                    to={ROUTES.LOG_IN}
                  >
                    Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      setShowMenu(true);
                      window.scrollTo(0, 0);
                    }}
                    className="text-heading hover:text-main"
                    to={ROUTES.PERFIL}
                  >
                    Perfíl <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
                <SwitchToogle />
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
