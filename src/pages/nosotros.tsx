import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Users, Heart, Target, Mail, Phone, MapPin } from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="mx-auto  bg-background body-font max-w-7xl">
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

        {/* Our Team Section */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-main">
              Nuestro Equipo
            </h2>
            <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {[
                {
                  name: "Cesar Cervantes",
                  role: "CEO",
                  image: "/placeholder.svg?height=300&width=300",
                  linkedIn: "https://www.linkedin.com/in/cesarcervantes/"
                },
                {
                  name: "Brayan Ccari",
                  role: "CTO",
                  image: "/placeholder.svg?height=300&width=300",
                  linkedIn: "https://www.linkedin.com/in/brayanccari/"
                }
              ].map(member => (
                <Card key={member.name} className="relative overflow-hidden">
                  <a
                    href={member.linkedIn}
                    className="absolute inset-0 z-10 cursor-pointer"
                  ></a>
                  <img
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-64"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
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
                    href="mailto:brayancclindo@gmail.com"
                    className="flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span>info@empresa.com</span>
                  </a>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>+34 123 456 789</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Calle Principal 123, Madrid, España</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Envíanos un Mensaje
                </h3>
                <form className="space-y-4">
                  <Input placeholder="Nombre" />
                  <Input placeholder="Email" type="email" />
                  <Textarea placeholder="Mensaje" />
                  <Button className="w-full">Enviar Mensaje</Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
