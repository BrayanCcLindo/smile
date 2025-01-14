import { logos } from "../constants/logoPartners";

function LogoSection() {
  return (
    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-white to-second_bg">
      <div className="w-full mb-6 lg:w-1/2 lg:mb-10">
        <h2
          id="campañasTop"
          className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font"
        >
          Trabajamos de la mano con:
        </h2>
        <div className="w-20 h-1 rounded bg-main"></div>
      </div>
      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-6">
        {logos.map(logo => (
          <div
            key={logo.name}
            className="relative flex flex-col items-center group"
          >
            <a className="object-cover" href={logo.href} target="_blank">
              <img
                loading="lazy"
                width={150}
                height={150}
                alt={logo.name}
                src={logo.icon}
              />
            </a>
            <span className="absolute hidden px-3 py-2 mt-2 text-sm font-medium text-white duration-500 rounded-lg -bottom-11 bg-main group-hover:block group-hover:duration-500">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoSection;
