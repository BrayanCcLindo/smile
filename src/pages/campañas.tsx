import Card from "../components/card";
import { useGetCampaigns } from "../Api/getCampaigns";
import MainLinkButton from "../components/mainLinkButton";
import Loader from "../components/loader";
// import { useGetUserData } from "../Api/getUserData";
import CallToAction from "../components/callToAction";

function Campañas() {
  const { data } = useGetCampaigns();
  // const { user } = useGetUserData();

  // const userPhoto = user?.userPhoto;

  return (
    <section className="text-gray-600 body-font mt-20 max-w-7xl mx-auto">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Tu donación puede cambiar vidas
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <div className="lg:w-1/2 w-full leading-relaxed text-gray-500 flex flex-col justify-center items-start gap-6">
            <p>
              Únete a nuestras campañas y marca la diferencia hoy. Tu donación
              ayudará a muchas personas
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((campaña, index) => <Card key={index} campaña={campaña} />)
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
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Campañas Start Smile
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Ideal para creadores, diseñadores, innovadores que tienen un nuevo
            producto o servicio y desean financiarlo con una pre-venta en una
            campaña todo o nada.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {newStartSmile.length > 0 ? (
            newStartSmile.map((campaña, index) => (
              <Card key={index} campaña={campaña} />
            ))
          ) : (
            <div className="flex justify-center items-center flex-col gap-4 mt-7 col-span-3">
              <CircleAlert size={50} />
              <h4 className="text-xl font-medium title-font">
                ¿No tiene camapañas Start Smile?
              </h4>

              <Link
                className="bg-indigo-500 px-4 py-3 rounded-md  text-sm font-semibold leading-6 text-white "
                to={stateProfile ? "/formulario-campaña" : "/sign-in"}
              >
                {!stateProfile ? "Registrarme" : "Crear Camapaña"}
              </Link>
            </div>
          )}
        </div>
      </div> */}
    </section>
  );
}

export default Campañas;
