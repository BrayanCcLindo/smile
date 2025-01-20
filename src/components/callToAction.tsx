import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLinkButton from "./mainLinkButton";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ROUTES } from "../constants/routes";
import { useTranslation } from "react-i18next";

function CallToAction() {
  const callRef = useRef(null);
  const { t } = useTranslation("global");

  const isInView = useInView(callRef, { once: true });

  return (
    <div className="pb-10 bg-main_bg">
      <motion.div
        ref={callRef}
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
        className="py-24 mx-auto max-w-7xl sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="relative px-6 pt-16 overflow-hidden shadow-2xl bg-second_bg isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-main sm:text-4xl">
              {t("banner.title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-content_text">
              {t("banner.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 lg:justify-start">
              <MainLinkButton link={ROUTES.CAMPANAS}>
                {t("cta.primary")}
              </MainLinkButton>

              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                to={ROUTES.COMO_FUNCIONA}
                className="text-sm font-semibold leading-6 text-main"
              >
                {t("cta.secondary")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              loading="lazy"
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="/Images/giftSmile.jpg"
              alt="App screenshot"
              width="1824"
              height="1080"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CallToAction;
