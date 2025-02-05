import { Link } from "react-router-dom";
import { useSmileContext } from "../Api/userContext";
import { SmileForm } from "../type/types";
import { SEOComponent } from "../assets/SEO";
import { ROUTES } from "../constants/routes";
import { useTranslation } from "react-i18next";

function StartCampaign() {
  const { stateProfile } = useSmileContext();
  const { t } = useTranslation("global");

  return (
    <>
      <SEOComponent
        canonicalUrl="https://kuzifund.com/new-campaign"
        title="Ayúdanos a definir tu Kuzi"
        description="Crea tu campaña en Kuzi Fund y apoya emprendedores, fundaciones o causas sociales. Recauda fondos fácilmente y genera un impacto positivo en la comunidad."
      />
      <section className="text-content_text body-font bg-main_bg">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-col flex-wrap py-6 mb-12 sm:flex-row">
              <h1 className="mb-2 text-2xl font-medium text-heading sm:w-2/5 title-font sm:mb-0">
                {t("createCampaign.hero.title")}
              </h1>
              <p className="pl-0 text-base leading-relaxed text-content_text sm:w-3/5 sm:pl-10">
                {t("createCampaign.hero.description1")}
                <span className="font-bold text-main"> KUZI</span>{" "}
                {t("createCampaign.hero.description2")}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap pb-12 -mx-4 -mt-4 -mb-10 sm:-m-4 ">
            <div className="relative p-4 md:w-1/3 group">
              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="absolute inset-0"
                to={
                  stateProfile
                    ? `${ROUTES.CREAR_CAMPANA}/${SmileForm.Albergue}`
                    : ROUTES.SIGN_IN
                }
              ></Link>
              <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border group border-opacity-60 hover:shadow-lg ">
                <img
                  loading="lazy"
                  className="object-cover object-center w-full lg:h-48 md:h-36"
                  src="/Images/giftSmile.jpg"
                  alt="blog"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                    {t("createCampaign.categories.ngo.type")}
                  </h3>
                  <h2 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                    {t("createCampaign.categories.ngo.title")}
                  </h2>
                  <p className="mb-3 leading-relaxed text-content_text">
                    {t("createCampaign.categories.ngo.description")}
                  </p>
                  <div className="flex flex-wrap items-center ">
                    <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                      {t("cta.tertiary")}
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative p-4 md:w-1/3 group">
              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="absolute inset-0"
                to={
                  stateProfile
                    ? `${ROUTES.CREAR_CAMPANA}/${SmileForm.Emprendedores}`
                    : ROUTES.SIGN_IN
                }
              ></Link>
              <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border group border-opacity-60 hover:shadow-lg ">
                <img
                  loading="lazy"
                  className="object-cover object-center w-full lg:h-48 md:h-36"
                  src="/Images/startSmile.jpg"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                    {t("createCampaign.categories.entrepreneurs.type")}
                  </h2>
                  <h1 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                    {t("createCampaign.categories.entrepreneurs.title")}
                  </h1>
                  <p className="mb-3 leading-relaxed text-content_text">
                    {t("createCampaign.categories.entrepreneurs.description")}
                  </p>
                  <div className="flex flex-wrap items-center ">
                    <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                      {t("cta.tertiary")}
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative p-4 md:w-1/3 group">
              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="absolute inset-0"
                to={
                  stateProfile
                    ? `${ROUTES.CREAR_CAMPANA}/${SmileForm.Social}`
                    : ROUTES.SIGN_IN
                }
              ></Link>
              <div className="h-full overflow-hidden border rounded-lg cursor-pointer border-card_border border-opacity-60 hover:shadow-lg">
                <img
                  loading="lazy"
                  className="object-cover object-center w-full lg:h-48 md:h-36"
                  src="/Images/socialSmile.jpg"
                  alt="blog"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-xs font-medium tracking-widest text-content_text title-font">
                    {t("createCampaign.categories.socialImpact.type")}
                  </h3>
                  <h2 className="mb-3 text-lg font-medium text-heading title-font group-hover:text-main">
                    {t("createCampaign.categories.socialImpact.title")}
                  </h2>
                  <p className="mb-3 leading-relaxed text-content_text">
                    {t("createCampaign.categories.socialImpact.description")}
                  </p>
                  <div className="flex flex-wrap items-center ">
                    <p className="inline-flex items-center font-semibold text-main md:mb-2 lg:mb-0">
                      {t("cta.tertiary")}
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StartCampaign;
