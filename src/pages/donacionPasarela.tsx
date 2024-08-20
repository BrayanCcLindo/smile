import { useNavigate, useParams } from "react-router-dom";
import { Info, ShieldCheck } from "lucide-react";
import { MouseEventHandler, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useGetCampaigns } from "../Api/getCampaigns";
import Loader from "../components/loader";
import { Button } from "../components/mainLinkButton";
import { format } from "date-fns";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import SelectPayment from "../components/selectPayment";
import { toast } from "sonner";
import FormErrors from "../components/formErrors";

type FormPayment = {
  mail: string;
  monto: string;
  id_campana: string;
  nombre: string;
  donation: string;
};

type ButtonDontationType = {
  value: number;
  text: string;
  onclick: MouseEventHandler;
};

const ButtonDonations = ({ value, text, onclick }: ButtonDontationType) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="px-4 py-2 border text-content_text border-card_border rounded-xl"
      value={value}
    >
      {text}
    </button>
  );
};

function DonacionPasarela({
  isLoading,
  setIsloading
}: {
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  const navigate = useNavigate();

  const [initialDonation, setInitialDonation] = useState("");
  const [numberOperation, setNumberOperation] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const validarDonacionRef = useRef<HTMLFieldSetElement>(null);
  const montoDonacionRef = useRef<HTMLDivElement>(null);
  const metodoPagoRef = useRef<HTMLHeadingElement>(null);

  const { slug } = useParams();

  const { data } = useGetCampaigns();
  const campaignIndex = data.findIndex(campaign => campaign.slug === slug);
  const actualPost = data[campaignIndex];

  const handleButtonValue = (value: string) => {
    setInitialDonation(value);
  };

  const mySchema: ZodType<FormPayment> = z.object({
    monto: z.string().min(1, { message: "Ingrese el monto a donar" }),
    mail: z
      .string()
      .email({ message: "Ingrese un email valido" })
      .min(1, { message: "Este campo es requerido" }),
    id_campana: z.string(),
    nombre: z.string().min(1, { message: "Este campo es requerido" }),
    donation: z.string().min(1, { message: "Este campo es requerido" })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormPayment>({
    resolver: zodResolver(mySchema),
    mode: "all"
  });

  const submitData = async (data: FormPayment) => {
    const result = format(new Date(), "d 'de' MMMM yyyy");
    const donationYapeInfo = {
      donadorYapeNombre: data.nombre,
      montoDonacion: data.monto,
      codigoDonacion: numberOperation,
      donadorYapeCorreo: data.mail,
      fechaDonacionYape: result,
      validation: false
    };

    const updatedYapeInfo = {
      ...actualPost,
      donaciones: [...actualPost.donaciones, donationYapeInfo]
    };
    setIsloading(true);

    try {
      if (formRef.current) {
        emailjs
          .sendForm("service_gz3oalc", "template_ee4t0e4", formRef.current, {
            publicKey: "8MaF0S-WNDUM7q1YJ"
          })
          .then(
            () => {
              console.log("SUCCESS!");
              navigate(-1);
            },
            error => {
              console.log("FAILED...", error.text);
            }
          );
      }

      const donationRef = doc(db, "campañas", actualPost.campañaId);
      updateDoc(donationRef, updatedYapeInfo);
      toast.success("Su donación fue realizada con exito", {
        duration: 3000,
        position: "top-center"
      });
    } catch (error) {
      toast.error(
        "Hubo un error con su donación. Por favor, inténtelo de nuevo más tarde.",
        {
          duration: 3000,
          position: "top-center"
        }
      );
    }
  };

  const handleValidationScroll = () => {
    const element = validarDonacionRef?.current;
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  };

  const handleMontoScroll = () => {
    const offset = 150; // Ajusta este valor según tus necesidades
    const element = montoDonacionRef?.current;
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleMetodoDonacion = () => {
    const offset = 105;
    const element = metodoPagoRef?.current;
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {actualPost ? (
        <section className="mt-10 sm:mt-20 text-content_text bg-main_bg">
          <div className="container flex flex-col px-5 py-24 mx-auto">
            <div className="mx-auto lg:w-4/6">
              <div className="h-64 overflow-hidden rounded-lg">
                <img
                  alt="content"
                  className="object-cover object-center w-full h-full"
                  src={actualPost.imagenCampaña}
                />
              </div>
              <div className="flex flex-col justify-center mt-10 sm:flex-row">
                <div className="text-center sm:w-1/3 sm:pr-8 sm:py-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="mt-4 text-lg font-medium text-heading ">
                      {actualPost.nombre}
                    </h2>
                    <div className="w-12 h-1 mt-2 mb-4 rounded bg-main"></div>
                    <p className="text-base">
                      Tu donativo tendrá como beneficiario/a a{" "}
                      <span className="font-medium">{actualPost.creador}</span>
                    </p>
                  </div>
                </div>
                <form
                  ref={formRef}
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit(submitData)}
                  className="pt-4 mt-4 text-center border-t border-card_border sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l sm:border-t-0 sm:mt-0 sm:text-left"
                >
                  <h3 className="font-medium">
                    Realiza tu donación siguiendo estos sencillos pasos:
                  </h3>

                  <ul className="mt-4 mb-10 ml-4 space-y-2 text-sm text-left list-disc lg:text-center marker:text-main">
                    <li>
                      Elige el monto de tu donación{" "}
                      <a
                        className="font-medium cursor-pointer text-main"
                        onClick={handleMontoScroll}
                      >
                        aquí
                      </a>
                    </li>

                    <li>
                      Escoge el metodo de pago, yape/plin o transferencia,{" "}
                      <a
                        className="font-medium cursor-pointer text-main"
                        onClick={handleMetodoDonacion}
                      >
                        aquí
                      </a>
                    </li>
                    <li>
                      Una vez realizada la donación, ayudanos a validarlo
                      rellenando el siguiente{" "}
                      <a
                        className="font-medium cursor-pointer text-main"
                        onClick={handleValidationScroll}
                      >
                        formulario
                      </a>
                    </li>
                  </ul>
                  <ul className="flex items-center justify-between gap-2 mt-3">
                    <li>
                      <ButtonDonations
                        onclick={(
                          event: React.MouseEvent<HTMLInputElement>
                        ) => {
                          const value = (event.target as HTMLInputElement)
                            .value;

                          handleButtonValue(value);
                        }}
                        value={5}
                        text={"S/.5"}
                      />
                    </li>
                    <li>
                      <ButtonDonations
                        onclick={(
                          event: React.MouseEvent<HTMLInputElement>
                        ) => {
                          const value = (event.target as HTMLInputElement)
                            .value;

                          handleButtonValue(value);
                        }}
                        value={10}
                        text={"S/.10"}
                      />
                    </li>
                    <li>
                      <ButtonDonations
                        onclick={(
                          event: React.MouseEvent<HTMLInputElement>
                        ) => {
                          const value = (event.target as HTMLInputElement)
                            .value;

                          handleButtonValue(value);
                        }}
                        value={20}
                        text={"S/.20"}
                      />
                    </li>
                    <li>
                      <ButtonDonations
                        onclick={(
                          event: React.MouseEvent<HTMLInputElement>
                        ) => {
                          const value = (event.target as HTMLInputElement)
                            .value;

                          handleButtonValue(value);
                        }}
                        value={50}
                        text={"S/.50"}
                      />
                    </li>
                    <li>
                      <ButtonDonations
                        onclick={(
                          event: React.MouseEvent<HTMLInputElement>
                        ) => {
                          const value = (event.target as HTMLInputElement)
                            .value;

                          handleButtonValue(value);
                        }}
                        value={100}
                        text={"S/.100"}
                      />
                    </li>
                  </ul>

                  <div ref={montoDonacionRef} className="mt-4">
                    <div className="relative mt-2">
                      <span className="px-4 py-1 rounded-full text-sm  text-heading absolute left-[4px] top-1/2 -translate-y-1/2">
                        S/.
                      </span>
                      <input
                        id="monto"
                        {...register("monto", {
                          onChange: event => {
                            const value = event.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                              handleButtonValue(value);
                            }
                          }
                        })}
                        name="monto"
                        value={initialDonation}
                        placeholder="Otro monto"
                        className="block w-full py-2 pl-10 pr-4 border-0 text-heading rounded-xl ring-1 ring-inset bg-input_bg ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                      />
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-300 dark:bg-slate-500 text-black dark:text-white absolute right-[4px] top-1/2 -translate-y-1/2">
                        PEN
                      </span>
                    </div>
                    {errors.monto ? (
                      <FormErrors message={errors.monto.message} />
                    ) : (
                      <p className="text-sm font-medium text-main">
                        Aporte mínimo S/. 4
                      </p>
                    )}
                  </div>
                  <div className="mt-10 mb-10">
                    <h3 className="font-medium text-heading ">
                      Aportación voluntaria a los servicios de Kuzi
                    </h3>
                    <p className="mt-2 text-base">
                      Kuzi aplica una comisión de la plataforma del 0 % a los
                      usuarios que donen.
                    </p>
                  </div>
                  <h3
                    ref={metodoPagoRef}
                    className="font-medium leading-6 text-heading "
                  >
                    Metodo de Pago
                  </h3>
                  <SelectPayment />
                  <div className="mt-2 sr-only">
                    <input
                      {...register("id_campana")}
                      id="id_campana"
                      name="id_campana"
                      defaultValue={actualPost.campañaId}
                      className="block w-full px-3 py-4 border-0 shadow-sm text-heading rounded-xl ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                    />
                  </div>
                  <fieldset
                    ref={validarDonacionRef}
                    id="validar-donacion"
                    className="mt-6 "
                  >
                    <h3 className="font-medium leading-6 text-heading scroll-mt-11">
                      ¿Hiciste tu donación con Yape, Plin o Transferencia?
                    </h3>
                    <p>Ayúdanos a validar tu donación. </p>

                    <div className="py-6 mt-6 border border-card_border rounded-xl">
                      <div className="border-card_border ">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                            <div className="col-span-3 px-10 sm:pr-0 sm:pl-10">
                              <label
                                htmlFor="mail"
                                className="block text-sm font-medium leading-6 text-heading"
                              >
                                Nombre
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("nombre")}
                                  id="nombre"
                                  name="nombre"
                                  className="block w-full px-3 py-4 border-0 shadow-sm bg-input_bg text-heading rounded-xl ring-1 ring-inset ring-card_border placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                                {errors.nombre && (
                                  <FormErrors message={errors.nombre.message} />
                                )}
                              </div>
                            </div>
                            <div className="col-span-3 px-10 sm:pr-10 sm:pl-0 ">
                              <label
                                htmlFor="mail"
                                className="block text-sm font-medium leading-6 text-heading"
                              >
                                Correo
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("mail")}
                                  id="mail"
                                  name="mail"
                                  className="block w-full px-3 py-4 border-0 shadow-sm text-heading rounded-xl ring-1 ring-inset ring-card_border bg-input_bg placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                                {errors.mail && (
                                  <FormErrors message={errors.mail.message} />
                                )}
                              </div>
                            </div>
                            <div className="col-span-3 px-10 sm:col-span-full">
                              <div className="relative">
                                <label className="block text-sm font-medium leading-6 text-heading">
                                  N° de Operación
                                </label>
                                <div className="absolute top-0 right-0 group">
                                  <Info color="#cccccc" />
                                  <div className="p-5 bg-input_bg absolute right-0 top-0 translate-x-10 rounded-xl hidden  z-10 group-hover:flex w-[300px] translate-y-10">
                                    <img
                                      width={300}
                                      height={300}
                                      className="object-cover object-center"
                                      src="/Images/comprovante.jpg"
                                      alt="ejemplo-comprobante"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <input
                                  id="donation"
                                  {...register("donation", {
                                    onChange: event => {
                                      const value = event.target.value;
                                      if (/^\d*\.?\d*$/.test(value)) {
                                        setNumberOperation(value);
                                      }
                                    }
                                  })}
                                  name="donation"
                                  value={numberOperation}
                                  className="block w-full px-3 py-4 border-0 shadow-sm text-heading rounded-xl ring-1 ring-inset ring-card_border bg-input_bg placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                                {errors.donation && (
                                  <FormErrors
                                    message={errors.donation.message}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div className="mt-10 text-content_text">
                    <div className="w-full mt-3">
                      <Button type="submit" isLoading={isLoading}>
                        Validar Donación
                      </Button>
                    </div>
                    <p className="mt-5 text-sm">
                      Al elegir el método de pago anterior, aceptas los Términos
                      de Servicio de Kuzi y declaras tu conformidad con la
                      Declaración de Privacidad
                    </p>
                  </div>
                  <div className="flex items-start gap-4 py-2 mt-10 border-t border-card_border text-content_text">
                    <ShieldCheck strokeWidth={1} size={30} />
                    <h3 className="font-medium">Kuzi protege tu donativo</h3>
                  </div>
                </form>
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
