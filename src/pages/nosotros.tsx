import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/buttons/button";
import { Users, Heart, Target, Mail } from "lucide-react";
import { members } from "../constants/nosotros";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export default function NosotrosPage() {
  const { t } = useTranslation("global");

  return (
    <div className="mx-auto bg-background body-font max-w-7xl">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
            <h1 className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font">
              {t("aboutPage.title")}
            </h1>
            <div className="w-20 h-1 rounded bg-main"></div>
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-6 leading-relaxed text-content_text lg:w-1/2">
            <p>
              <span className="font-bold">{t("aboutPage.description1")}</span>{" "}
              {t("aboutPage.description2")}
            </p>
          </div>
        </div>

        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-main">
              {t("aboutPage.ourTeam")}
            </h2>
            <div
              className={twMerge(
                `grid items-center grid-cols-1 gap-8 ${
                  members.length <= 4
                    ? `sm:grid-cols-${members.length.toString()}`
                    : `sm:grid-cols-3`
                }`
              )}
            >
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
            {t("aboutPage.values.title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="w-12 h-12 mb-4 text-main" />,
                title: t("aboutPage.values.title1"),
                description: t("aboutPage.values.description1")
              },
              {
                icon: <Heart className="w-12 h-12 mb-4 text-main" />,
                title: t("aboutPage.values.title2"),
                description: t("aboutPage.values.description2")
              },
              {
                icon: <Target className="w-12 h-12 mb-4 text-main" />,
                title: t("aboutPage.values.title3"),
                description: t("aboutPage.values.description3")
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

        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-main">
              {t("aboutPage.contact.title")}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  {t("aboutPage.contact.contactUs")}
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
                  {t("aboutPage.contact.meeting.title")}
                </h3>
                <p className="">{t("aboutPage.contact.meeting.description")}</p>
                <Button className="relative mt-4" variant="secondar">
                  <a
                    className="absolute inset-0"
                    href="https://calendly.com/cervantesespondacesar/30-minute-meeting?month=2025-01"
                    target="_blank"
                  ></a>
                  {t("aboutPage.contact.meeting.buttonText")}
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
