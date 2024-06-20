import { Link } from "react-router-dom";
import { CampañaGiftSmileType, SmileType } from "../type/types";
import { Clock, HandHeart, HeartHandshake, Rocket } from "lucide-react";
import { twMerge } from "tailwind-merge";
import ProgressBar from "./progressBar";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function Card({
  campaña,
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
    (donations) => donations.validation === true
  );
  const activeDonations = aprovedDonations
    ?.map((donations) => parseInt(donations.montoDonacion))
    .reduce((acc, actual) => acc + actual, 0)
    .toFixed(2);

  return (
    <article
      className={twMerge(
        "group flex max-w-xl flex-col items-start justify-between relative border shadow duration-150 hover:duration-150 rounded-xl hover:shadow-md   group overflow-hidden",
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
        className="absolute inset-0 rounded-xl z-20"
        to={campaña.to}
      ></Link>
      <div
        className={twMerge(
          "flex p-3  items-center justify-between gap-3 ",
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
            "mt-3 text-lg font-semibold leading-6 text-gray-900   line-clamp-1 ",
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
          className=" object-cover w-full  aspect-square group-hover:scale-105 hover:duration-300 duration-300"
          width={300}
          height={300}
          src={campaña.imagenCampaña}
          alt=""
        />
        <span
          className={twMerge(
            `absolute z-[2] rounded-full top-2 right-2  px-3 py-1.5 font-medium `,
            campaña.tipo === SmileType.Social && "bg-alternative text-white",
            campaña.tipo === SmileType.Fundaciones && "bg-main text-white"
          )}
        >
          {campaña.tipo}
        </span>
      </div>
      <div className="px-3 py-1">
        <div className="flex items-center gap-x-4 text-xs mt-4 justify-between">
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
                locale: es,
              })}
            </span>
          </p>
        </div>
        <div className="group relative">
          <p className="mt-5  line-clamp-3 text-sm leading-relaxed text-gray-600  ">
            {campaña.descripcion}
          </p>
        </div>
        <div className="mt-5">
          <ProgressBar
            progress={parseInt(activeDonations)}
            total={parseInt(campaña.meta)}
          />
        </div>
        <div className="flex justify-between  mt-6    ">
          <p className="flex items-center gap-2 ">
            Recaudó
            <span className="font-bold">S/. {activeDonations} </span>
            de
            <span className="font-bold"> S/. {campaña.meta} </span>
          </p>
        </div>
        {/* <div className="relative mt-4 flex items-center gap-x-4 border-t border-t-gray-200 pt-2">
          <img
            src={"/Images/defaultuser.jpg"}
            alt="imagen-de-campaña"
            className="h-10 w-10 object-cover rounded-full bg-gray-50"
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
