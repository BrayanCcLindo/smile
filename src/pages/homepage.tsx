import { Eye, LockKeyhole, Rocket } from "lucide-react";
import MainLinkButton from "../components/buttons/mainLinkButton";
import { useGetCampaigns } from "../Api/getCampaigns";
import Card from "../components/card";
import { Link } from "react-router-dom";
import CallToAction from "../components/callToAction";
import LogoSection from "../components/logoSection";
import { motion } from "framer-motion";
import SkeletonCardLoader from "../components/ui/loaders/skeletonCard";
import { ROUTES } from "../constants/routes";
import { SEOComponent } from "../assets/SEO";
import CompanyTeam from "../components/teamSection";
import { useTranslation } from "react-i18next";

function Homepage() {
  const { data } = useGetCampaigns();
  const { t } = useTranslation("global");
  const firstThreeCampaigns = [...data].slice(0, 3);

  return (
    <section className="py-24 bg-main_bg sm:py-10">
      <SEOComponent
        canonicalUrl="https://kuzifund.com"
        title="Kuzi Fund - Impulsa Causas, Transforma Comunidades"
        description="Apoya causas sociales, emprendedores innovadores y fundaciones. Dona, apoya y contribuye a crear un impacto positivo en la comunidad."
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-6 py-10 mx-auto max-w-7xl lg:px-8"
      >
        <div className="flex flex-col items-center max-w-2xl mx-auto lg:text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Kuzi
          </h1>
          <p className="my-6 text-lg leading-8 text-center text-content_text ">
            {t("home.hero1")}
            <br />
            {t("home.hero2")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 lg:justify-start">
            <MainLinkButton link={ROUTES.CAMPANAS}>
              {t("cta.primary")}
            </MainLinkButton>
            <Link
              to={ROUTES.COMO_FUNCIONA}
              className="text-sm font-semibold leading-6 text-main "
            >
              {t("cta.secondary")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto body-font max-w-7xl">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full ">
            <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
              <h1
                id="campañasTop"
                className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font"
              >
                {t("home.campaignTitle")}
              </h1>
              <div className="w-20 h-1 rounded bg-main"></div>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 gap-x-8 gap-y-16 sm:mt-5 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {firstThreeCampaigns.length >= 3
              ? firstThreeCampaigns.map((campaña, index) => (
                  <Card key={index} campaña={campaña} index={index} />
                ))
              : Array(3)
                  .fill(null)
                  .map((_, index) => <SkeletonCardLoader key={index} />)}
          </div>
          <div className="flex items-center justify-end">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              to={ROUTES.CAMPANAS}
              className="mt-2 text-sm font-semibold leading-6 text-main"
            >
              {t("cta.quaternary")}
            </Link>
          </div>
        </div>
      </div>

      <div className="px-5 py-10 mx-auto max-w-7xl">
        <div className="w-full mb-6 lg:w-1/2 lg:mb-10 ">
          <h1
            id="campañasTop"
            className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font"
          >
            {t("home.attributes.title")}
          </h1>
          <div className="w-20 h-1 rounded bg-main"></div>
        </div>
        <div className="flex flex-wrap -m-4 text-content_text">
          <div className="p-4 xl:w-1/3 md:w-1/2 ">
            <div className="p-6 border rounded-lg border-card_border ">
              <div className="flex items-center justify-center mb-4 rounded-full text-main">
                <Eye size={50} />
              </div>
              <h2 className="mb-2 text-lg font-medium text-center title-font">
                {t("home.attributes.transparency.title")}
              </h2>
              <p className="text-base leading-relaxed text-center">
                {t("home.attributes.transparency.description")}
              </p>
            </div>
          </div>
          <div className="p-4 xl:w-1/3 md:w-1/2">
            <div className="p-6 border rounded-lg border-card_border">
              <div className="flex items-center justify-center mb-4 rounded-full text-main">
                <LockKeyhole size={50} />
              </div>
              <h2 className="mb-2 text-lg font-medium text-center title-font">
                {t("home.attributes.security.title")}
              </h2>
              <p className="text-base leading-relaxed text-center">
                {t("home.attributes.security.description")}
              </p>
            </div>
          </div>
          <div className="p-4 xl:w-1/3 md:w-1/2">
            <div className="p-6 border rounded-lg border-card_border">
              <div className="flex items-center justify-center mb-4 rounded-full text-main">
                <Rocket size={50} />
              </div>
              <h2 className="mb-2 text-lg font-medium text-center title-font">
                {t("home.attributes.agility.title")}
              </h2>
              <p className="text-base leading-relaxed text-center">
                {t("home.attributes.agility.description")}
              </p>
            </div>
          </div>
        </div>
        <div className="my-20">
          <LogoSection />
        </div>
        <div className="my-20">
          <CompanyTeam />
        </div>
      </div>

      <CallToAction />
    </section>
  );
}

export default Homepage;
