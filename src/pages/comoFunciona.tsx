import {
  Album,
  HandHeart,
  Handshake,
  HeartHandshake,
  SmilePlus,
  TrendingUp,
} from "lucide-react";
import CallToAction from "../components/callToAction";
import { Link } from "react-router-dom";
import MainLinkButton from "../components/mainLinkButton";

function ComoFunciona() {
  return (
    <section>
      <div className="text-gray-600 body-font text-base mt-20 bg-main/10">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full justify-between">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <h1 className="title-font  text-3xl mb-4 font-medium text-main">
                ¿Cómo funcionan las donaciones en Kuzi?
              </h1>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-main/20 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <HandHeart />
                </div>
                <div className="flex-grow pl-4 ">
                  <h2 className="font-medium title-font  text-gray-900 mb-1 tracking-wider">
                    ¿Por Qué Donar?
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">
                      Tu Donación Marca la Diferencia
                    </span>{" "}
                    <br />
                    Únete, dona y transforma vidas con tu valioso aporte. Tu
                    participación es fundamental para hacer la diferencia.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-main/20 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <Album />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Descubre Nuestras Campañas
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">
                      Historias que Inspiran
                    </span>{" "}
                    <br />
                    Explora un mar de oportunidades: Descubre nuestras campañas,
                    listas para ser exploradas y apoyadas por ti
                  </p>
                </div>
              </div>

              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-main/20 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <SmilePlus />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Cómo Funciona
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Tu Donación en Acción</span>{" "}
                    <br />
                    Realiza donación y observa cómo transforma vidas en tiempo
                    real. ¡Únete y sé parte del cambio ahora mismo!
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-main inline-flex items-center justify-center text-white relative z-10">
                  <HeartHandshake />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Únete a Nosotros
                  </h2>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Haz la Diferencia Hoy</span>{" "}
                    <br />
                    Únete ya y sé parte del cambio. Tu contribución es crucial.
                    ¡No esperes más para marcar la diferencia!
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-full md:mt-0 mt-10 lg:w-3/5 md:w-1/2">
              <video
                className="rounded-lg"
                preload="none"
                controls
                poster="/Images/imagenVideo.jpg"
              >
                <source src="/video/videoSmile.webm" type="video/webm"></source>
              </video>
              <div className=" mt-10">
                <MainLinkButton link="/campañas">Donar Ahora</MainLinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10 px-6 "></div>
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex justify-center flex-wrap">
          <div className="container px-5  mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-main">
                ¿Cómo funcionan las campañas en Kuzi?
              </h2>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Puedes crear un Kuzi para diversos proyectos como:
              </p>
              <div className="flex items-center justify-center flex-wrap ">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <Handshake className=" text-main w-12 h-12 mb-3 inline-block" />

                    <p className="leading-relaxed">Apoyo a Fundaciones</p>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <TrendingUp className=" text-main w-12 h-12 mb-3 inline-block" />

                    <p className="leading-relaxed">Emprendedores</p>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <HandHeart className=" text-main w-12 h-12 mb-3 inline-block" />

                    <p className="leading-relaxed">Apoyo Social</p>
                  </div>
                </div>
              </div>

              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Solo necesitas mucho entusiasmo, dedicación y la ayuda de tu
                comunidad, quienes realizarán los aportes financieros y la
                difusión de tu campaña para que llegue a muchos corazones y
                logres tu meta.
              </p>
            </div>
          </div>
          <div className="flex flex-col  w-full mb-20">
            <h2 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4 text-main">
              ¿Quiénes pueden crear una Kuzi?
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              <span className="font-medium">¡Todos pueden crear un Kuzi!</span>{" "}
              Si tienes un sueño, un proyecto, una iniciativa social o una idea
              de negocio, Kuzi es para ti. No importa si eres una sola persona o
              una comunidad unida por el mismo ideal.
            </p>

            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-5">
              <span className="font-medium">
                🚀 Kuzi está abierta a estudiantes, innovadores, fundaciones,
                activistas, jóvenes, adultos, emprendedores… ¡para TODOS!
              </span>
              <br />
              ¿Qué esperas para unirte al #KuziPower 💪?{" "}
              <Link
                to="/nueva-campaña"
                className="text-sm font-semibold leading-6 text-main"
              >
                Crea tu Campaña <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>

          <div className="relative  sm:w-1/3 w-5/6 rounded-lg mt-6 mb-10 sm:m-0 sm:pr-10 content-start ">
            <img
              className="object-cover object-center w-full h-full lg:-rotate-12 shadow-2xl"
              src="/Images/statsSmile.jpg"
              alt="stats"
            />
            <img
              className="hidden absolute bottom-0 left-0 object-cover object-center w-1/2 h-1/2 rotate-12 translate-y-20 shadow-2xl lg:block"
              src="/Images/decorationImg.jpg"
              alt="stats"
            />
          </div>
          <div className="flex flex-wrap  mt-auto mb-auto lg:w-1/2 sm:w-2/3  pt-16">
            <div className="w-full sm:p-4 px-4 mb-6">
              <h2 className="title-font font-medium text-3xl mb-2 text-gray-900">
                Puedes escoger la prioridad de tu impacto.
              </h2>
              <div className="leading-relaxed">
                Los Kuzis, al estar en línea, disfrutan de una cobertura
                ampliada, permitiéndoles recibir aportes desde cualquier rincón
                del Perú. Esta conectividad abre un mundo de posibilidades,
                asegurando que cada contribución, sin importar su origen,
                impulse tu proyecto hacia el éxito.
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-main">
                2.7K
              </h2>
              <p className="leading-relaxed">Usuarios</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-main">
                1.8K
              </h2>
              <p className="leading-relaxed">Campañas Activas</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-main">35</h2>
              <p className="leading-relaxed">Donaciones</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-main">4</h2>
              <p className="leading-relaxed">Productos</p>
            </div>
          </div>
        </div>
      </div>

      <CallToAction />
    </section>

    // <div className="overflow-hidden bg-white py-24 sm:py-32">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    //       <div className="lg:pr-8 lg:pt-4">
    //         <div className="lg:max-w-lg">
    //           <h4 className="text-base font-semibold leading-7 text-gray-900">
    //             Como Funciona
    //           </h4>
    //           <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //             Smile
    //           </h1>

    //           <p className="mt-6 text-lg leading-8 text-gray-600">
    //             Una campaña de crowdfunding básicamente es una “Alcancía en
    //             línea”, donde se busca recaudar fondos de diferentes personas
    //             que comparten los mismos ideales y quieren llevar a cabo un
    //             proyecto juntos.
    //           </p>
    //           <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
    //             <div className="relative pl-9">
    //               <dt className="inline font-semibold text-gray-900 mr-3">
    //                 <svg
    //                   className="absolute left-1 top-1 h-5 w-5 text-gray-900"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     fill-rule="evenodd"
    //                     d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
    //                     clip-rule="evenodd"
    //                   />
    //                 </svg>
    //                 Seguridad
    //               </dt>
    //               <dd className="inline">
    //                 Todos los Smiilers son verificadas por nuestro sistema y
    //                 equipo para garantizar la seguridad de todos los usuarios.
    //                 También cada aporte pasa por diferentes filtros de
    //                 seguridad.
    //               </dd>
    //             </div>
    //             <div className="relative pl-9">
    //               <dt className="inline font-semibold text-gray-900 mr-3">
    //                 <svg
    //                   className="absolute left-1 top-1 h-5 w-5 text-gray-900"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     fill-rule="evenodd"
    //                     d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
    //                     clip-rule="evenodd"
    //                   />
    //                 </svg>
    //                 Transparencia
    //               </dt>
    //               <dd className="inline">
    //                 Tus reportes claros y en tiempo real. Tus Smiilers podrán
    //                 ver el total recaudado y tus actualizaciones de en qué se
    //                 usaron los recursos.
    //               </dd>
    //             </div>
    //             <div className="relative pl-9">
    //               <dt className="inline font-semibold text-gray-900 mr-3">
    //                 <svg
    //                   className="absolute left-1 top-1 h-5 w-5 text-gray-900"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
    //                   <path
    //                     fill-rule="evenodd"
    //                     d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
    //                     clip-rule="evenodd"
    //                   />
    //                 </svg>
    //                 Agilidad
    //               </dt>
    //               <dd className="inline ">
    //                 Crea tu Smile en segundos y empieza a recibir aportes. Tus
    //                 Smiilers podrán aportar con su medio de pago favorito.
    //               </dd>
    //             </div>
    //           </dl>
    //         </div>
    //       </div>
    //       <img
    //         src="/Images/pexels-this-is-zun-1116302-1.jpg"
    //         alt="Product screenshot"
    //         className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
    //         width="2432"
    //         height="1442"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default ComoFunciona;
