import { useParams } from "react-router-dom";
import { Link2, HeartHandshake } from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import ButtonDialog from "../components/buttonDialog";
import { useGetCampaigns } from "../Api/getCampaigns";
import Loader from "../components/loader";
import MainLinkButton from "../components/mainLinkButton";
import { handleShareURL } from "../Api/socialShare";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import ProgressBar from "../components/progressBar";

function PostCampaña() {
  const { data } = useGetCampaigns();
  const { slug } = useParams();
  const { stateProfile } = useSmileContext();

  const campaignIndex = data?.findIndex((campaign) => campaign?.slug === slug);
  const actualPost = data[campaignIndex];

  const aprovedDonations = actualPost?.donaciones?.filter(
    (donations) => donations.validation === true
  );

  const activeDonations = aprovedDonations
    ?.map((donations) => parseInt(donations.montoDonacion))
    .reduce((acc, actual) => acc + actual, 0)
    .toFixed(2);

  const currentURL = window.location.href;
  const wspURL = `https://api.whatsapp.com/send?text=${actualPost?.nombre} aportemos en su Kuzi 🚀 → ${currentURL}`;

  // const fechaInicial = format(
  //   new Date(actualPost?.fechaInicio),
  //   "d 'de' MMMM yyyy"
  // );

  // console.log(fechaInicial, "fechaInicial");

  // const result2 = formatDistance(
  //   new Date(actualPost?.fechaFinal),
  //   new Date(actualPost?.fechaInicio),
  //   {
  //     addSuffix: true,
  //     locale: es,
  //   }
  // );

  return (
    <>
      {actualPost ? (
        <section className="text-gray-600 body-font overflow-hidden mt-20">
          <div className="container px-5 py-24 mx-auto ">
            <div className="relative lg:w-4/5 mx-auto flex flex-wrap pb-4 lg:pb-0    border border-gray-200 rounded-lg">
              {/* {stateProfile.uid === actualPost.id ? (
                <ButtonDialog campaña={actualPost} />
              ) : null} */}
              {!stateProfile
                ? null
                : stateProfile.uid === actualPost.id && (
                    <ButtonDialog campaña={actualPost} />
                  )}
              <img
                alt="ecommerce"
                className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded-lg"
                src={actualPost?.imagenCampaña}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 px-4 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  NOMBRE DE CAMPAÑA
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {actualPost?.nombre}
                </h1>
                <div className="flex mb-4 justify-between text-sm text-main">
                  <span className="flex items-center gap-2  font-medium">
                    <HeartHandshake />
                    {aprovedDonations.length} Donaciones
                  </span>
                  <span className="">
                    Termina en{" "}
                    {formatDistanceToNow(new Date(actualPost.fechaFinal), {
                      locale: es,
                    })}
                  </span>
                </div>

                <p className="leading-relaxed break-words">
                  {actualPost?.descripcion}
                </p>
                <div className="mt-5">
                  <ProgressBar
                    progress={parseInt(activeDonations)}
                    total={parseInt(actualPost?.meta)}
                  />
                </div>
                <div className="flex justify-between  mt-4  pb-5 border-b-2 border-gray-100 mb-5">
                  <p className="flex items-center gap-2 text-lg sm:text-2xl">
                    Recaudado
                    <span className="font-bold">S/. {activeDonations} </span>
                    de
                    <span className="font-bold"> S/. {actualPost?.meta} </span>
                  </p>
                </div>

                <div className="mb-5">
                  <MainLinkButton link={`/campañas/${actualPost?.slug}/donar`}>
                    Donar
                  </MainLinkButton>
                </div>
                <span className=" font-medium">
                  Ayúdanos compartiendolo con tus familiares y amigos
                </span>
                <div className="flex items-center justify-between pt-3 gap-4">
                  <div className="flex justify-between flex-1 border-r-2 border-gray-200 px-4">
                    <button
                      onClick={() => {
                        handleShareURL(currentURL);
                      }}
                      className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-indigo-300 hover:text-white"
                    >
                      <Link2 strokeWidth={1} />
                    </button>
                    <a
                      href={wspURL}
                      target="_blank"
                      className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-indigo-300 hover:text-white"
                    >
                      <img src="/svg/whatsApp.svg" alt="" />
                    </a>
                  </div>
                  <div className="flex flex-1 ">
                    <div className="flex  gap-2 text-left   flex-wrap ">
                      Duracion:
                      <p className="flex flex-wrap gap-4 font-semibold">
                        <span>
                          {format(
                            new Date(actualPost.fechaInicio),
                            "d 'de' MMMM",
                            {
                              locale: es,
                            }
                          )}
                        </span>{" "}
                        -{" "}
                        <span>
                          {format(
                            new Date(actualPost.fechaFinal),
                            "d 'de' MMMM",
                            {
                              locale: es,
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* <button className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-indigo-300 hover:text-white">
                    <Facebook strokeWidth={1} />
                  </button> */}
                  {/* <button className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-indigo-300 hover:text-white">
                    <Linkedin strokeWidth={1} />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-100">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      HISTORIA
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                      {format(
                        new Date(actualPost.fechaInicio),
                        "d 'de' MMMM yyyy",
                        { locale: es }
                      )}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <p className="leading-relaxed">
                      {actualPost.historia
                        ? actualPost.historia
                        : actualPost.descripcion}
                    </p>
                  </div>
                </div>
                {aprovedDonations.length > 0 && (
                  <div className="py-8 flex flex-col flex-wrap md:flex-nowrap md:flex-row">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        DONADORES KUZI
                      </span>
                    </div>
                    <div className="md:flex-grow">
                      <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                              Nombre
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                              Monto
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {aprovedDonations.map((donation, index) => {
                            return (
                              <tr
                                key={index}
                                className="border-b-2 border-gray-200 px-4 py-3"
                              >
                                <td className="px-4 py-3">
                                  {donation.donadorYapeNombre}
                                </td>
                                <td className="px-4 py-3">
                                  S/.{" "}
                                  {parseInt(donation.montoDonacion).toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      CATEGORY
                    </span>
                    <span className="text-sm text-gray-500">12 Jun 2019</span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      Woke master cleanse drinking vinegar salvia
                    </h2>
                    <p className="leading-relaxed">
                      Glossier echo park pug, church-key sartorial biodiesel
                      vexillologist pop-up snackwave ramps cornhole. Marfa 3
                      wolf moon party messenger bag selfies, poke vaporware
                      kombucha lumbersexual pork belly polaroid hoodie portland
                      craft beer.
                    </p>
                    <a className="text-main inline-flex items-center mt-4">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>

    // <section classNameName="text-gray-600 body-font overflow-hidden">
    //   <div classNameName="container px-5 py-24 mx-auto">
    //     <div classNameName="lg:w-4/5 mx-auto flex flex-wrap">
    //       <div classNameName="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
    //         <h2 classNameName="text-sm title-font text-gray-500 tracking-widest">
    //           NOMBRE DE CAMPAÑA
    //         </h2>
    //         <h1 classNameName="text-gray-900 text-3xl title-font font-medium mb-4">
    //           {actualPost?.nombre}
    //         </h1>
    //         <div classNameName="flex mb-4">
    //           <a classNameName="flex-grow text-main border-b-2 border-main py-2 text-lg px-1">
    //             Descripción
    //           </a>
    //           <a classNameName="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
    //             Reviews
    //           </a>
    //           <a classNameName="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
    //             Details
    //           </a>
    //         </div>
    //         <p classNameName="leading-relaxed mb-4">{actualPost?.descripcion}</p>
    //         <div classNameName="flex border-t border-gray-200 py-2">
    //           <span classNameName="text-gray-500">Color</span>
    //           <span classNameName="ml-auto text-gray-900">Blue</span>
    //         </div>
    //         <div classNameName="flex border-t border-gray-200 py-2">
    //           <span classNameName="text-gray-500">Size</span>
    //           <span classNameName="ml-auto text-gray-900">Medium</span>
    //         </div>
    //         <div classNameName="flex border-t border-b mb-6 border-gray-200 py-2">
    //           <span classNameName="text-gray-500">Quantity</span>
    //           <span classNameName="ml-auto text-gray-900">4</span>
    //         </div>
    //         <div classNameName="flex">
    //           <span classNameName="title-font font-medium text-2xl text-gray-900">
    //             $ {actualPost?.meta}
    //           </span>
    //           <button classNameName="flex ml-auto text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
    //             Button
    //           </button>
    //           <button classNameName="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
    //             <svg
    //               fill="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               classNameName="w-5 h-5"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //       <img
    //         alt="ecommerce"
    //         classNameName="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
    //         src="https://dummyimage.com/400x400"
    //       />
    //     </div>
    //   </div>
    // </section>
  );
}

export default PostCampaña;
