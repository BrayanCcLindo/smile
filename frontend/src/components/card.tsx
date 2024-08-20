import { Link } from "react-router-dom";
import { CampañaGiftSmileType, SmileType } from "../type/types";
import { Clock, HandHeart, HeartHandshake, Rocket } from "lucide-react";
import { twMerge } from "tailwind-merge";
import ProgressBar from "./progressBar";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function Card({
  campaña
}: // photo,
{
  campaña: CampañaGiftSmileType;
  // photo?: string | undefined;
}) {
  // const { stateProfile } = useSmileContext();

  // const campaignIndex = data?.findIndex((campaign) => campaign?.slug === slug);
  // const actualPost = data[campaignIndex];

  // const aprovedDonations = actualPost?.donaciones?.filter(
  //   (donations) => donations.validation === true
  // );
  // const activeDonations = aprovedDonations
  //   ?.map((donations) => parseInt(donations.montoDonacion))
  //   .reduce((acc, actual) => acc + actual, 0)
  //   .toFixed(2);
  const aprovedDonations = campaña.donaciones.filter(
    donations => donations.validation === true
  );
  const activeDonations = aprovedDonations
    ?.map(donations => parseInt(donations.montoDonacion))
    .reduce((acc, actual) => acc + actual, 0)
    .toFixed(2);

  return (
    <article
      className={twMerge(
        "group flex max-w-xl flex-col items-start justify-between relative border border-card_border shadow duration-150 hover:duration-150 rounded-xl hover:shadow-md  text-content_text group overflow-hidden",
        campaña.tipo === SmileType.Fundaciones &&
          "hover:shadow-main hover:shadow-lg",
        campaña.tipo === SmileType.Social &&
          "hover:shadow-alternative  hover:shadow-lg"
      )}
    >
      <Link
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className="absolute inset-0 z-20 rounded-xl"
        to={campaña.to}
      ></Link>
      <div
        className={twMerge(
          "flex p-3 items-center text-heading justify-between gap-3 ",
          campaña.tipo === SmileType.Fundaciones && "group-hover:text-main",
          campaña.tipo === SmileType.Social && "group-hover:text-alternative"
        )}
      >
        {campaña.tipo === SmileType.Fundaciones ? (
          <Rocket className="min-w-[30px] h-[30px] " />
        ) : (
          <HandHeart className="min-w-[30px] h-[30px] " />
        )}

        <h2
          className={twMerge(
            "mt-3 text-lg font-semibold leading-6 line-clamp-1 ",
            campaña.tipo === SmileType.Fundaciones && "group-hover:text-main",
            campaña.tipo === SmileType.Social && "group-hover:text-alternative"
          )}
        >
          {" "}
          {campaña.nombre}
        </h2>
      </div>
      <div className="relative h-[300px] overflow-hidden">
        <img
          className="object-cover w-full duration-300 aspect-square group-hover:scale-105 hover:duration-300"
          width={300}
          height={300}
          src={campaña.imagenCampaña}
          alt=""
        />
        <span
          className={twMerge(
            `absolute z-[2] rounded-full top-2 right-2  px-3 py-1.5 font-medium `,
            campaña.tipo === SmileType.Social && "bg-alternative text-main_bg",
            campaña.tipo === SmileType.Fundaciones && "bg-main text-main_bg"
          )}
        >
          {campaña.tipo}
        </span>
      </div>
      <div className="px-3 py-1">
        <div className="flex items-center justify-between mt-4 text-xs gap-x-4">
          <span
            className={twMerge(
              "flex items-center gap-2 font-medium",
              campaña.tipo === SmileType.Social && " text-alternative",
              campaña.tipo === SmileType.Fundaciones && " text-main"
            )}
          >
            <HeartHandshake />
            {aprovedDonations.length} Donaciones
          </span>

          <p
            className={twMerge(
              "flex items-center gap-1 ",
              campaña.tipo === SmileType.Social && " text-alternative",
              campaña.tipo === SmileType.Fundaciones && " text-main"
            )}
          >
            <Clock />
            Quedan:
            <span className="font-medium">
              {" "}
              {formatDistanceToNow(new Date(campaña.fechaFinal), {
                locale: es
              })}
            </span>
          </p>
        </div>
        <div className="relative group">
          <p className="mt-5 text-sm leading-relaxed text-content_text line-clamp-3 ">
            {campaña.descripcion}
          </p>
        </div>
        <div className="mt-5">
          <ProgressBar
            progress={parseInt(activeDonations)}
            total={parseInt(campaña.meta)}
          />
        </div>
        <div className="flex justify-between mt-6 ">
          <p className="flex items-center gap-2 ">
            Recaudó
            <span className="font-bold">S/. {activeDonations} </span>
            de
            <span className="font-bold"> S/. {campaña.meta} </span>
          </p>
        </div>
        {/* <div className="relative flex items-center pt-2 mt-4 border-t gap-x-4 border-t-gray-200">
          <img
            src={"/Images/defaultuser.jpg"}
            alt="imagen-de-campaña"
            className="object-cover w-10 h-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6 ">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0"></span>
              {campaña.creador}
            </p>
          </div>
        </div> */}
      </div>
    </article>
  );
}
export default Card;
