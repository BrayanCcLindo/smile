type LogoType = {
  name: string;
  icon: string;
}[];

function LogoSection() {
  const logos: LogoType = [
    { name: "Wichay UC", icon: "/Images/logo wichay IS (1).png" },
  ];

  return (
    <div className="bg-gradient-to-r from-white to-main/20 rounded-lg p-8  shadow-lg">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
        <h2
          id="campañasTop"
          className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
        >
          Trabajamos de la mano con:
        </h2>
        <div className="h-1 w-20 bg-main rounded"></div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {logos.map((logo) => (
          <div key={logo.name} className="flex flex-col items-center group">
            <a href="https://wichay.pe/" target="_blank">
              <img alt={logo.name} src={logo.icon} />
            </a>
            <span className="opacity-0 mt-2 text-sm font-medium px-3 py-2 bg-main/30 rounded-lg group-hover:opacity-100 duration-300 text-white">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoSection;
