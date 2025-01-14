import { members } from "../constants/nosotros";

export default function CompanyTeam() {
  return (
    <div className="p-8 rounded-lg shadow-lg bg-second_bg/30">
      <div className="w-full mb-6 lg:mb-10">
        <h2
          id="equipoTop"
          className="mb-2 text-2xl font-medium text-heading sm:text-3xl"
        >
          Nuestro Equipo:
        </h2>
        <div className="w-20 h-1 rounded bg-main"></div>
      </div>
      <div className="grid items-center grid-cols-1 gap-8 sm:grid-cols-3">
        {members.map(member => (
          <div
            key={member.name}
            className="relative flex flex-col items-center group"
          >
            <a
              className="absolute inset-0"
              href={member.linkedIn}
              target="_blank"
            ></a>
            <div className="w-24 h-24 overflow-hidden rounded-full ">
              <img
                loading="lazy"
                width={96}
                height={96}
                className="object-cover w-full h-full"
                src={member.image}
                alt={member.name}
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-heading">
              {member.name}
            </h3>
            <p className="text-content_text">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
