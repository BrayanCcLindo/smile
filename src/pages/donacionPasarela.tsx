import { useParams } from "react-router-dom";
import { ArrowRightLeft, CreditCard, QrCode } from "lucide-react";

import SelectPaymentForm from "../components/selectPayment";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import Loader from "../components/ui/loaders/loader";
import { useGetCampaigns } from "../Api/getCampaigns";
import { SmilePaymentMethod } from "../type/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function DonacionPasarela() {
  const { slug } = useParams();
  const { t } = useTranslation("global");

  const [paymentMethod, setPaymentMethod] = useState<SmilePaymentMethod>(
    SmilePaymentMethod.Yape
  );
  const { data } = useGetCampaigns();
  const campaignIndex = data.findIndex(campaign => campaign.slug === slug);
  const actualPost = data[campaignIndex];

  const handleTabls = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaymentMethod((e.target as HTMLInputElement).id as SmilePaymentMethod);
  };

  return (
    <>
      {actualPost ? (
        <section className="text-content_text bg-main_bg">
          <div className="container flex flex-col px-5 py-24 mx-auto">
            <div className="w-4/5 mx-auto">
              <div className="h-64 overflow-hidden rounded-lg">
                <img
                  loading="lazy"
                  alt="content"
                  className="object-cover object-center w-full h-full"
                  src={actualPost.imagenCampaña}
                />
              </div>
              <div className="flex flex-col justify-center gap-8 mx-auto mt-10 lg:w-4/5 sm:flex-row">
                <div className="w-full space-y-4 text-center sm:w-1/2 sm:py-8 sm:p-6">
                  <Card className="p-0 border-none">
                    <CardHeader className="p-0 py-6">
                      <CardTitle className="text-2xl font-bold text-center text-main">
                        {t("campaignDonation.title")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <div className="relative p-6 text-sm rounded-lg shadow-md bg-third_bg lg:flex">
                        <button
                          onClick={handleTabls}
                          className="absolute inset-0"
                          id={SmilePaymentMethod.Yape}
                        ></button>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-white rounded-full bg-main">
                          <QrCode />
                        </div>
                        <div className="flex-grow ttext-center lg:text-left lg:pl-3">
                          <h2 className="mb-2 text-lg font-medium text-heading title-font">
                            {t("campaignDonation.sections.yape.title")}
                          </h2>
                          <p className="leading-relaxed text-content_text">
                            {t("campaignDonation.sections.yape.description")}
                          </p>
                        </div>
                      </div>
                      <div className="relative p-6 text-sm rounded-lg shadow-md bg-third_bg lg:flex">
                        <button
                          onClick={handleTabls}
                          className="absolute inset-0"
                          id={SmilePaymentMethod.Transferencia}
                        ></button>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-white rounded-full bg-main">
                          <ArrowRightLeft />
                        </div>
                        <div className="flex-grow text-center lg:text-left lg:pl-3">
                          <h2 className="mb-2 text-lg font-medium text-heading title-font">
                            {t("campaignDonation.sections.transfer.title")}
                          </h2>
                          <p className="leading-relaxed text-content_text">
                            {t(
                              "campaignDonation.sections.transfer.description"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="relative p-6 text-sm rounded-lg shadow-md bg-third_bg lg:flex">
                        <button
                          onClick={() => {
                            setPaymentMethod(SmilePaymentMethod.Tarjeta);
                          }}
                          className="absolute inset-0"
                          id={SmilePaymentMethod.Tarjeta}
                        ></button>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-white rounded-full bg-main">
                          <CreditCard />
                        </div>
                        <div className="flex-grow text-center lg:text-left lg:pl-3">
                          <h2 className="mb-2 text-lg font-medium text-heading title-font">
                            {t("campaignDonation.sections.card.title")}
                          </h2>
                          <p className="leading-relaxed text-content_text">
                            {t("campaignDonation.sections.card.description")}
                          </p>
                        </div>
                      </div>
                      <Alert className="flex items-center justify-center p-6">
                        <div className="text-main">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock-alert"
                          >
                            <path d="M12 6v6l4 2" />
                            <path d="M16 21.16a10 10 0 1 1 5-13.516" />
                            <path d="M20 11.5v6" />
                            <path d="M20 21.5h.01" />
                          </svg>
                        </div>
                        <div>
                          <AlertTitle className="text-heading">
                            {t("campaignDonation.sections.important.title")}
                          </AlertTitle>
                          <AlertDescription className="flex items-center">
                            {t(
                              "campaignDonation.sections.important.description"
                            )}
                          </AlertDescription>
                        </div>
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full text-center sm:w-1/2 border-card_border sm:py-8 sm:border-t-0 sm:mt-0">
                  <SelectPaymentForm
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    actualPost={actualPost}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default DonacionPasarela;
