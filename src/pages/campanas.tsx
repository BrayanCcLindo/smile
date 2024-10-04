import Card from "../components/card";
import { useGetCampaigns } from "../Api/getCampaigns";
import CallToAction from "../components/callToAction";
import SkeletonCardLoader from "../components/skeletonCard";
import { SEOComponent } from "../assets/SEO";
import { ROUTES } from "../constants/routes";

function Campaigns() {
  const { data } = useGetCampaigns();

  return (
    <>
      <SEOComponent
        canonicalUrl={`https://kuzifund.com/${ROUTES.CAMPANAS}`}
        title="Campañas - Apoya Emprendedores, Fundaciones y Causas Sociales"
        description="Explora campañas en Kuzi Fund y dona para apoyar a emprendedores, fundaciones y causas sociales. Contribuye a proyectos con impacto positivo y transparente."
      />
      <div className="bg-main_bg">
        <section className="mx-auto body-font max-w-7xl">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
                <h1 className="mb-2 text-2xl font-medium text-heading sm:text-3xl title-font">
                  Tu donación puede cambiar vidas
                </h1>
                <div className="w-20 h-1 rounded bg-main"></div>
              </div>
              <div className="flex flex-col items-start justify-center w-full gap-6 leading-relaxed text-content_text lg:w-1/2">
                <p>
                  Únete a nuestras campañas y marca la diferencia hoy. Tu
                  donación ayudará a muchas personas, cada aporte cuenta.{" "}
                  <span className="font-semibold">
                    ¡Dona hoy desde 4 soles y sé parte de estas historias de
                    esperanza y solidaridad!
                  </span>
                </p>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {data.length > 0
                ? data.map((campaña, index) => (
                    <Card key={index} campaña={campaña} index={index} />
                  ))
                : Array(3)
                    .fill(null)
                    .map((_, index) => <SkeletonCardLoader key={index} />)}
            </div>
          </div>
          <CallToAction />
        </section>
      </div>
    </>
  );
}

export default Campaigns;
