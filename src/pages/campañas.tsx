import Card from "../components/card";
import { useGetCampaigns } from "../Api/getCampaigns";
import Loader from "../components/loader";
// import { useGetUserData } from "../Api/getUserData";
import CallToAction from "../components/callToAction";

function Campañas() {
  const { data } = useGetCampaigns();
  // const { user } = useGetUserData();

  // const userPhoto = user?.userPhoto;

  return (
    <div className="bg-main_bg">
      <section className="mx-auto mt-10 sm:mt-20 body-font max-w-7xl">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
              <h1 className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font">
                Tu donación puede cambiar vidas
              </h1>
              <div className="w-20 h-1 rounded bg-main"></div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-6 leading-relaxed text-content_text lg:w-1/2">
              <p>
                Únete a nuestras campañas y marca la diferencia hoy. Tu donación
                ayudará a muchas personas, cada aporte cuenta.{" "}
                <span className="font-semibold">
                  ¡Dona hoy desde 4 soles y sé parte de estas historias de
                  esperanza y solidaridad!
                </span>
              </p>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data.length > 0 ? (
              data.map((campaña, index) => (
                <Card key={index} campaña={campaña} />
              ))
            ) : (
              <div className="flex items-center justify-center col-span-3">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <CallToAction />

        {/* <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
        <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
        <h1 className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
        Campañas Start Smile
        </h1>
        <div className="w-20 h-1 bg-indigo-500 rounded"></div>
        </div>
        <p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
        Ideal para creadores, diseñadores, innovadores que tienen un nuevo
        producto o servicio y desean financiarlo con una pre-venta en una
        campaña todo o nada.
        </p>
        </div>
        <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {newStartSmile.length > 0 ? (
          newStartSmile.map((campaña, index) => (
            <Card key={index} campaña={campaña} />
            ))
            ) : (
              <div className="flex flex-col items-center justify-center col-span-3 gap-4 mt-7">
              <CircleAlert size={50} />
              <h4 className="text-xl font-medium title-font">
              ¿No tiene camapañas Start Smile?
              </h4>
              
              <Link
              className="px-4 py-3 text-sm font-semibold leading-6 text-white bg-indigo-500 rounded-md "
              to={stateProfile ? "/formulario-campaña" : "/sign-in"}
              >
              {!stateProfile ? "Registrarme" : "Crear Camapaña"}
              </Link>
              </div>
              )}
              </div>
              </div> */}
      </section>
    </div>
  );
}

export default Campañas;
