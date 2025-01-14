import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users, Heart, Target, Mail } from "lucide-react";
import { members } from "../constants/nosotros";

export default function NosotrosPage() {
  return (
    <div className="mx-auto bg-background body-font max-w-7xl">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
            <h1 className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font">
              Poder de la Transformación
            </h1>
            <div className="w-20 h-1 rounded bg-main"></div>
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-6 leading-relaxed text-content_text lg:w-1/2">
            <p>
              <span className="font-bold">
                Impulsamos causas sociales, emprendimientos y fundaciones
              </span>
              a través de una plataforma transparente y segura. ¡Juntos, hacemos
              la diferencia!
            </p>
          </div>
        </div>

        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-main">
              Nuestro Equipo
            </h2>
            <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {members.map(member => (
                <Card className="relative w-full max-w-sm mx-auto">
                  <a
                    className="absolute inset-0"
                    href={member.linkedIn}
                    target="_blank"
                  ></a>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                      <img
                        loading="lazy"
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-main">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="w-12 h-12 mb-4 text-main" />,
                title: "Trabajo en Equipo",
                description:
                  "Creemos en el poder de la colaboración y el apoyo mutuo."
              },
              {
                icon: <Heart className="w-12 h-12 mb-4 text-main" />,
                title: "Pasión",
                description:
                  "Amamos lo que hacemos y lo reflejamos en cada proyecto."
              },
              {
                icon: <Target className="w-12 h-12 mb-4 text-main" />,
                title: "Excelencia",
                description:
                  "Nos esforzamos por alcanzar los más altos estándares en todo lo que hacemos."
              }
            ].map(value => (
              <Card
                key={value.title}
                className="flex flex-col items-center p-6 text-center"
              >
                {value.icon}
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center">Contáctanos</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@kuzifund.com"
                    className="flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span>info@kuzifund.com</span>
                  </a>
                  {/* <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>+34 123 456 789</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Calle Principal 123, Madrid, España</span>
                  </div> */}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Tienes consultas o sugerencias?
                </h3>
                <p className="">
                  Agenda tu reunión en segundos: elige tu horario, confirma con
                  un clic y recibe asesoría personalizada. ¡Estamos aquí para
                  ti!
                </p>
                <Button className="relative mt-4">
                  <a
                    className="absolute inset-0"
                    href="https://calendly.com/cervantesespondacesar/30-minute-meeting?month=2025-01"
                    target="_blank"
                  ></a>
                  Agendar
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
