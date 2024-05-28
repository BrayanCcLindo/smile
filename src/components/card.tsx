import { Link } from "react-router-dom";
import { CampañaGiftSmileType } from "../type/types";
import { Rocket } from "lucide-react";

function Card({
  campaña,
  photo,
}: {
  campaña: CampañaGiftSmileType;
  photo: string | undefined;
}) {
  return (
    <article className="group flex max-w-xl flex-col items-start justify-between relative border shadow-md duration-150 hover:duration-150 rounded-xl hover:shadow-xl hover:-translate-y-2 group">
      <Link className="absolute inset-0 rounded-xl z-20" to={campaña.to}></Link>
      <div className="flex p-3 items-center justify-start gap-4 group-hover:text-main">
        <Rocket />
        <h2 className="mt-3 text-lg font-semibold leading-6 text-gray-900  group-hover:text-main  ">
          {" "}
          {campaña.nombre}
        </h2>
      </div>
      <img
        className=" object-cover h-[300px] w-full"
        width={300}
        height={300}
        src={campaña.imagenCampaña}
        alt=""
      />
      <div className="px-3 py-1">
        <div className="flex items-center gap-x-4 text-xs mt-4">
          <time dateTime="2020-03-16" className="text-gray-500">
            {campaña.fechaCreacion}
          </time>
          <span className="relative z-10 rounded-full bg-main/10 px-3 py-1.5 font-medium text-main ">
            {campaña.tipo}
          </span>
        </div>
        <div className="group relative">
          <p className="mt-5  line-clamp-3 text-sm leading-relaxed text-gray-600  ">
            {campaña.descripcion}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4 border-t border-t-gray-200 pt-2">
          <img
            src={photo ?? "/Images/defaultuser.jpg"}
            alt="imagen-de-campaña"
            className="h-10 w-10 object-cover rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6 ">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0"></span>
              {campaña.creador}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Card;
