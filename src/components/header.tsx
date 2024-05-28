import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useSmileContext } from "../Api/userContext";
import { useState } from "react";
// import { Heart } from "lucide-react";
import MainLinkButton from "./mainLinkButton";

function Header() {
  const { stateProfile } = useSmileContext();

  const [showMenu, setShowMenu] = useState(true);

  // useEffect(() => {
  //   if (stateProfile) {
  //     navigate("/perfil");
  //   }
  // }, [stateProfile]);
  return (
    <header className="bg-white fixed top-0 shadow-sm right-0 left-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
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
          <ul className="  flex items-center gap-8 text-base font-medium">
            {routes.map((route) => {
              if (route.private && !stateProfile) return null;

              return (
                <li className="text" key={route.to}>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "text-main "
                        : "text-gray-900 hover:text-main";
                    }}
                    to={route.to}
                  >
                    {route.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden lg:flex items-center gap-4 lg:flex-1 lg:justify-end">
          {!stateProfile ? (
            <>
              {" "}
              <Link className="text-gray-900 hover:text-main" to="/log-in">
                Iniciar Sesión <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          ) : (
            <>
              <Link className=" rounded-full " to={"/perfil"}>
                <img
                  width={50}
                  height={50}
                  className="object-cover object-center rounded-full"
                  src="/Images/defaultuser.jpg"
                  alt="default-user-photo"
                />
              </Link>
            </>

            //   <Link
            //   to="/log-in"
            //   className="text-sm font-semibold leading-6 text-gray-900"
            // >
            //   Iniciar Sesión <span aria-hidden="true">&rarr;</span>
            // </Link>
          )}
          <MainLinkButton link={"/nueva-campaña"}>Crear Campaña</MainLinkButton>
        </div>
      </nav>
      <div
        className={`${!showMenu ? "block" : "hidden"} lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
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
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
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
          <div className="mt-6 flow-root">
            <div className=" divide-y divide-gray-500/10">
              <MainLinkButton link="/log-in">Crear Campaña</MainLinkButton>

              <ul className="space-y-2 py-6 text-sm font-semibold">
                {routes.map((route) => {
                  return (
                    <li key={route.to}>
                      <NavLink
                        className={({ isActive }) => {
                          return isActive
                            ? "text-main"
                            : "text-gray-900 hover:text-main";
                        }}
                        to={route.to}
                      >
                        {route.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div className="py-6 flex gap-4 flex-col ">
                {!stateProfile ? (
                  <Link className="text-gray-900 hover:text-main" to="/log-in">
                    Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link className="text-gray-900 hover:text-main" to="/perfil">
                    Perfíl <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
