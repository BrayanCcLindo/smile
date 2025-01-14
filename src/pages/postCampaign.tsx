import { useParams } from "react-router-dom";
import {
  Link2,
  HeartHandshake,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import ButtonDialog from "../components/buttonDialog";
import { useGetCampaigns } from "../Api/getCampaigns";
import Loader from "../components/ui/loaders/loader";
import MainLinkButton from "../components/mainLinkButton";
import { handleShareURL } from "../Api/socialShare";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import ProgressBar from "../components/progressBar";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "../constants/routes";
import VideoPlayer from "../components/videoMediaPlayer";

function PostCampaign() {
  const { data } = useGetCampaigns();
  const { slug } = useParams();
  const { stateProfile } = useSmileContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const locationRef = useRef<HTMLIFrameElement>(null);

  const campaignIndex = [...data].findIndex(campaign => campaign.slug === slug);
  const actualPost = [...data][campaignIndex];

  const aprovedDonations = actualPost?.donaciones?.filter(
    donations => donations.validation === true
  );

  const activeDonations = aprovedDonations
    ?.map(donations => donations.montoDonacion)
    .reduce((acc, actual) => acc + actual, 0);

  const currentURL = window.location.href;
  const wspURL = `https://api.whatsapp.com/send?text=${actualPost?.nombre} aportemos en su Kuzi 🚀 → ${currentURL}`;

  const handleLocationScroll = () => {
    const offset = 150; // Ajusta este valor según tus necesidades
    const element = locationRef?.current;
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    if (actualPost?.imagenesCampaña) {
      setCurrentIndex(
        prevIndex => (prevIndex + 1) % actualPost.imagenesCampaña.length
      );
    }
  };

  const prevSlide = () => {
    if (actualPost?.imagenesCampaña) {
      setCurrentIndex(
        prevIndex =>
          (prevIndex - 1 + actualPost.imagenesCampaña.length) %
          actualPost.imagenesCampaña.length
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {actualPost ? (
        <section className="overflow-hidden text-content_text bg-main_bg">
          <div className="container px-5 py-24 mx-auto ">
            <div className="relative flex flex-wrap pb-4 mx-auto border rounded-lg border-card_border lg:w-4/5 lg:pb-0">
              {!stateProfile
                ? null
                : stateProfile.uid === actualPost.id && (
                    <ButtonDialog campaña={actualPost} />
                  )}

              {actualPost.imagenesCampaña ? (
                <div className="relative flex flex-1 w-full h-64 rounded-lg lg:w-1/2 lg:h-auto">
                  <div className="flex flex-1 h-auto overflow-hidden rounded-lg shadow-lg">
                    <div
                      className="flex transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                      }}
                    >
                      {actualPost.imagenesCampaña.map(item => (
                        <>
                          {item.type === "image" ? (
                            <img
                              src={item.link}
                              className="object-cover object-center w-full h-auto rounded-lg"
                            />
                          ) : (
                            <VideoPlayer videoUrl={item.link} />
                          )}
                        </>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute p-2 text-gray-800 transition-colors duration-300 -translate-y-1/2 rounded-full shadow left-2 top-1/2 bg-white/80 hover:bg-white/90"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute p-2 text-gray-800 transition-colors duration-300 -translate-y-1/2 rounded-full shadow right-2 top-1/2 bg-white/80 hover:bg-white/90"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute px-2 py-1 text-sm text-white -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-black/50">
                    {currentIndex + 1} / {actualPost.imagenesCampaña.length}
                  </div>
                </div>
              ) : (
                <img
                  loading="lazy"
                  alt="ecommerce"
                  className="object-cover object-center w-full h-64 rounded-lg lg:w-1/2 aspect-square lg:h-auto"
                  src={actualPost.imagenCampaña}
                />
              )}

              <div className="w-full px-4 mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0 ">
                <h2 className="text-sm tracking-widest text-gray-500 title-font">
                  NOMBRE DE CAMPAÑA
                </h2>
                <h1 className="mb-1 text-3xl font-medium text-heading title-font">
                  {actualPost.nombre}
                </h1>
                <div className="flex justify-between mb-4 text-sm text-main">
                  <span className="flex items-center gap-2 font-medium">
                    <HeartHandshake />
                    {aprovedDonations.length} Donaciones
                  </span>
                  <span className="">
                    Termina en{" "}
                    {formatDistanceToNow(new Date(actualPost.fechaFinal), {
                      locale: es
                    })}
                  </span>
                </div>

                <p className="leading-relaxed break-words">
                  {actualPost?.descripcion}
                </p>
                <div className="mt-5">
                  <ProgressBar
                    progress={activeDonations}
                    total={actualPost.meta}
                  />
                </div>
                <div className="flex justify-between pb-5 mt-4 mb-5 border-b-2 border-card_border">
                  <p className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl">
                    Recaudado
                    <span className="font-bold">
                      {activeDonations.toLocaleString("es-PE", {
                        currency: "PEN",
                        style: "currency"
                      })}
                    </span>
                    de
                    <span className="font-bold">
                      {actualPost.meta.toLocaleString("es-PE", {
                        currency: "PEN",
                        style: "currency"
                      })}
                    </span>
                  </p>
                </div>

                <div className="mb-5">
                  <MainLinkButton
                    link={`${ROUTES.CAMPANAS}/${actualPost?.slug}/donar`}
                  >
                    Donar
                  </MainLinkButton>
                </div>
                <span className="font-medium ">
                  Ayúdanos compartiendolo con tus familiares y amigos
                </span>
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="flex flex-wrap justify-between flex-1 px-4 border-r-2 border-card_border">
                    <button
                      onClick={() => {
                        handleShareURL(currentURL);
                      }}
                      className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-main hover:text-white"
                    >
                      <Link2 strokeWidth={2} />
                    </button>
                    <a
                      href={wspURL}
                      target="_blank"
                      className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-main hover:text-white"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1.5rem"
                        width="1.5rem"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                    </a>
                    {actualPost.ubicación && (
                      <button
                        onClick={handleLocationScroll}
                        className="p-4 rounded-full bg-[#f2f2f2] text-main hover:bg-main hover:text-white"
                      >
                        <MapPin />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-1 ">
                    <div className="flex flex-wrap gap-2 text-left ">
                      Duracion:
                      <p className="flex flex-wrap gap-4 font-semibold">
                        <span>
                          {format(
                            new Date(actualPost.fechaInicio),
                            "d 'de' MMMM",
                            {
                              locale: es
                            }
                          )}
                        </span>{" "}
                        -{" "}
                        <span>
                          {format(
                            new Date(actualPost.fechaFinal),
                            "d 'de' MMMM",
                            {
                              locale: es
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden text-content_text body-font">
            <div className="container px-5 py-24 mx-auto lg:w-4/5 lg:pb-0">
              <div className="-my-8 divide-y-2 divide-card_border">
                <div className="flex flex-wrap py-8 md:flex-nowrap">
                  <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
                    <span className="font-semibold text-heading title-font">
                      HISTORIA
                    </span>
                    <span className="mt-1 text-sm text-content_text">
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
                  <div className="flex flex-col flex-wrap py-8 md:flex-nowrap md:flex-row">
                    <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
                      <span className="font-semibold text-heading title-font">
                        DONADORES KUZI
                      </span>
                    </div>
                    <div className="md:flex-grow">
                      <table className="w-full text-left whitespace-no-wrap table-auto">
                        <thead className="bg-third_bg">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium tracking-wider rounded-tl rounded-bl text-heading title-font">
                              Nombre
                            </th>
                            <th className="px-4 py-3 text-sm font-medium tracking-wider text-heading title-font">
                              Monto
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {aprovedDonations.map((donation, index) => {
                            return (
                              <tr
                                key={index}
                                className="px-4 py-3 border-b-2 border-card_border"
                              >
                                <td className="px-4 py-3">
                                  {donation.donadorNombre}
                                </td>
                                <td className="px-4 py-3">
                                  {donation.montoDonacion.toLocaleString(
                                    "es-PE",
                                    {
                                      currency: "PEN",
                                      style: "currency"
                                    }
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {actualPost.ubicación && (
                  <div className="flex flex-col flex-wrap py-8 md:flex-nowrap md:flex-row">
                    <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
                      <span className="font-semibold text-heading title-font">
                        UBICACIÓN
                      </span>
                    </div>
                    <div className="md:flex-grow">
                      <iframe
                        ref={locationRef}
                        className="w-full h-[450px]"
                        src={actualPost.ubicación}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PostCampaign;
