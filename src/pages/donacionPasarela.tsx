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

type FormPayment = {
  mail: string;
  monto: string;
  id_campana: string;
  nombre: string;
  operacion: number;
  // imagen: FileList;
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
      className="border border-gray-300 px-4 py-2 rounded-xl text-gray-600"
      value={value}
    >
      {text}
    </button>
  );
};

function DonacionPasarela({
  isLoading,
  setIsloading,
}: {
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  const navigate = useNavigate();

  const [initialDonation, setInitialDonation] = useState("0");

  // const [image, setImage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const validarDonacionRef = useRef<HTMLFieldSetElement>(null);
  const montoDonacionRef = useRef<HTMLDivElement>(null);
  const metodoPagoRef = useRef<HTMLHeadingElement>(null);

  const { slug } = useParams();

  const { data } = useGetCampaigns();
  const campaignIndex = data.findIndex((campaign) => campaign.slug === slug);
  const actualPost = data[campaignIndex];

  const handleButtonValue = (value: string) => {
    setInitialDonation(value);
  };

  const mySchema: ZodType<FormPayment> = z.object({
    monto: z.string().min(1, { message: "Ingrese el monto a donar" }),
    mail: z.string().email().min(1, { message: "Este campo es requerido" }),
    id_campana: z.string(),
    nombre: z.string(),
    operacion: z.number().min(1, { message: "Este campo es requerido" }),
    // imagen: z
    //   .instanceof(FileList)
    //   .refine((val) => val.length > 0, "Este campo es requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPayment>({
    resolver: zodResolver(mySchema),
  });

  const submitData = async (data: FormPayment) => {
    const result = format(new Date(), "d 'de' MMMM yyyy");
    const donationYapeInfo = {
      donadorYapeNombre: data.nombre,
      montoDonacion: data.monto,
      codigoDonacion: data.operacion,
      donadorYapeCorreo: data.mail,
      fechaDonacionYape: result,
      validation: false,
    };

    const updatedYapeInfo = {
      ...actualPost,
      donaciones: [...actualPost.donaciones, donationYapeInfo],
    };
    setIsloading(true);

    try {
      if (formRef.current) {
        emailjs
          .sendForm("service_gz3oalc", "template_ee4t0e4", formRef.current, {
            publicKey: "8MaF0S-WNDUM7q1YJ",
          })
          .then(
            () => {
              console.log("SUCCESS!");
              navigate(-1);
            },
            (error) => {
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
      console.log(error, "error al donar");
    }
  };

  const handleValidationScroll = () => {
    // const offset = 105; // Ajusta este valor según tus necesidades
    const element = validarDonacionRef?.current;
    if (element) {
      // const y =
      //   element.getBoundingClientRect().top + window.pageYOffset - offset;
      // window.scrollTo({ top: y, behavior: "smooth" });
      element.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave
        block: "center", // Alineación vertical al centro
        inline: "nearest", // Alineación horizontal a la posición más cercana
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
    const offset = 105; // Ajusta este valor según tus necesidades
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
        <section className="text-gray-600 body-font mt-20">
          <div className="container  px-5 py-24 mx-auto flex flex-col">
            <div className=" lg:w-4/6 mx-auto">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={actualPost.imagenCampaña}
                />
              </div>
              <div className="flex flex-col sm:flex-row mt-10 justify-center">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg ">
                      {actualPost.nombre}
                    </h2>
                    <div className="w-12 h-1 bg-main rounded mt-2 mb-4"></div>
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
                  className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left"
                >
                  <h3 className="font-medium">
                    Realiza tu donación siguiendo estos sencillos pasos:
                  </h3>

                  <ul className="text-sm list-disc ml-4 marker:text-main mb-10 mt-4 space-y-2">
                    <li>
                      Elige el monto de tu donación{" "}
                      <a
                        className="font-medium text-main cursor-pointer"
                        // href={"#validar-donacion"}
                        onClick={handleMontoScroll}
                      >
                        aquí
                      </a>
                    </li>

                    <li>
                      Escoge el metodo de pago, yape/plin o transferencia,{" "}
                      <a
                        className="font-medium text-main cursor-pointer"
                        // href={"#validar-donacion"}
                        onClick={handleMetodoDonacion}
                      >
                        aquí
                      </a>
                    </li>
                    <li>
                      Una vez realizada la donación, ayudanos a validarlo
                      rellenando el siguiente{" "}
                      <a
                        className="font-medium text-main cursor-pointer"
                        // href={"#validar-donacion"}
                        onClick={handleValidationScroll}
                      >
                        formulario
                      </a>
                    </li>
                  </ul>
                  <ul className="flex items-center gap-2 justify-between mt-3">
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
                    <div className="mt-2 relative">
                      <span className="px-4 py-1 rounded-full text-sm  text-black absolute left-[4px] top-1/2 -translate-y-1/2">
                        S/.
                      </span>
                      <input
                        id="monto"
                        {...register("monto", {
                          onChange: (event) => {
                            const value = event.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                              handleButtonValue(value);
                            }
                          },
                        })}
                        name="monto"
                        value={initialDonation}
                        placeholder="Otro monto"
                        className="pl-10 block w-full rounded-xl border-0 pr-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                      />
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-200 text-black absolute right-[4px] top-1/2 -translate-y-1/2">
                        PEN
                      </span>
                    </div>
                    {errors.monto ? (
                      <p className="font-medium text-red-500 text-sm">
                        {errors.monto.message}
                      </p>
                    ) : (
                      <p className="font-medium text-main text-sm">
                        Aporte mínimo S/. 4
                      </p>
                    )}
                  </div>
                  <div className="mt-10 mb-10">
                    <h3 className=" font-medium title-font text-gray-900">
                      Aportación voluntaria a los servicios de Kuzi
                    </h3>
                    <p className="text-base mt-2">
                      Kuzi aplica una comisión de la plataforma del 0 % a los
                      usuarios que donen.
                    </p>
                  </div>
                  <h3
                    ref={metodoPagoRef}
                    className=" font-medium title-font leading-6 text-gray-900"
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
                      className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                    />
                  </div>
                  <fieldset
                    ref={validarDonacionRef}
                    id="validar-donacion"
                    className="mt-6 "
                  >
                    <h3 className="font-medium title-font leading-6 text-gray-900 scroll-mt-11">
                      ¿Hiciste tu donación con Yape, Plin o Transferencia?
                    </h3>
                    <p>Ayúdanos a validar tu donación. </p>

                    <div className="mt-6  border border-gray-300 rounded-xl py-6">
                      <div className=" border-gray-300">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                            <div className="col-span-3 sm:pr-0 sm:pl-10 px-10">
                              <label
                                htmlFor="mail"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("nombre")}
                                  id="nombre"
                                  name="nombre"
                                  className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="col-span-3 sm:pr-10 sm:pl-0 px-10 ">
                              <label
                                htmlFor="mail"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Correo
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("mail")}
                                  id="mail"
                                  name="mail"
                                  className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="col-span-3 sm:col-span-full px-10">
                              <div className=" relative ">
                                <label
                                  htmlFor="mail"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  N° de Operación
                                </label>
                                <div className="  group absolute right-0 top-0">
                                  <Info className="" color="#cccccc" />
                                  <div className="p-5 bg-[#f2f2f2] absolute right-0 top-0 translate-x-10 rounded-xl hidden  z-10 group-hover:flex w-[300px] translate-y-10">
                                    <img
                                      width={300}
                                      height={300}
                                      className="object-cover object-center"
                                      src="/Images/comprovante.jpg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <input
                                  {...register("operacion")}
                                  id="operacion"
                                  name="operacion"
                                  className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="">
                        <div className="flex  items-center gap-x-3 p-6 ">
                          <input
                            onChange={(e) => {
                              SetInputValue(e.target.value);
                            }}
                            value="credito-debito"
                            id="credito-debito"
                            name="Metodo-pago"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-main focus:ring-main"
                          />
                          <label
                            htmlFor="credito-debito"
                            className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900"
                          >
                            <CreditCard strokeWidth={1} /> Crédito o Débito
                          </label>
                        </div>
                        {inputValue === "credito-debito" && (
                          <div className="px-10">
                            <div className="space-y-6">
                              <div className="border-b border-gray-900/10 pb-6">
                                <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                                  <div className="col-span-3 sm:col-span-full">
                                    <label
                                      htmlFor="mail"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Correo
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        {...register("email")}
                                        id="mail"
                                        name="mail"
                                        defaultValue={stateProfile.email}
                                        className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-3 sm:col-span-full">
                                    <label
                                      htmlFor="nombres"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Nombres
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        {...register("nombres")}
                                        id="nombres"
                                        name="nombres"
                                        className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className=" pb-12">
                                <div className=" grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                                  <div className="col-span-3 sm:col-span-full ">
                                    <label
                                      htmlFor="tarjeta"
                                      className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                                    >
                                      Número de Tarjeta
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        {...register("tarjeta")}
                                        type="text"
                                        name="tarjeta"
                                        id="tarjeta"
                                        placeholder="Número de Tarjeta"
                                        autoComplete="given-name"
                                        className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-3">
                                    <label
                                      htmlFor="vencimiento"
                                      className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                                    >
                                      vencimiento
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        id="vencimiento"
                                        name="vencimiento"
                                        placeholder="MM / AA"
                                        className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-3">
                                    <label
                                      htmlFor="codigo-acceso"
                                      className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                                    >
                                      codigo-acceso
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        id="codigo-acceso"
                                        name="codigo-acceso"
                                        placeholder="CVV"
                                        className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div> */}
                    </div>
                  </fieldset>
                  <div className="mt-10 text-gray-500">
                    {/* <h3 className=" font-medium title-font text-gray-900">
                      Tu donación
                    </h3>
                    <div className="flex mt-3 py-2">
                      <span className="text-gray-500">Tu donativo</span>
                      <span className="ml-auto ">S/. {initialDonation}.00</span>
                    </div> */}
                    {/* <div className="flex  py-2">
                      <span className="text-gray-500">
                        Aportación para Smile
                      </span>
                      <span className="ml-auto ">S/. {smileTip}</span>
                    </div> */}
                    {/* <div className="flex border-t border-gray-200  py-2">
                      <span className="text-gray-500 ">Aportación Total</span>
                      <span className="ml-auto ">S/. {totalDonation}</span>
                    </div> */}
                    {/* {inputValue === "credito-debito" && (
                        <Button type="submit">Donar Ahora</Button>
                      )} */}
                    <div className="w-full mt-3">
                      <Button type="submit" isLoading={isLoading}>
                        Validar Donación
                      </Button>
                    </div>

                    <p className="text-sm text-gray-500 mt-5">
                      Al elegir el método de pago anterior, aceptas los Términos
                      de Servicio de Kuzi y declaras tu conformidad con la
                      Declaración de Privacidad
                    </p>
                  </div>
                  <div className="border-t border-gray-200  py-2 mt-10 flex gap-4 items-start text-main">
                    <ShieldCheck strokeWidth={1} size={30} />
                    <div className="text-gray-900">
                      <h3 className=" font-medium title-font ">
                        Kuzi protege tu donativo
                      </h3>
                      {/* <p className="text-sm text-gray-500 mt-2">
                        Te garantizamos un reembolso completo de tu donativo
                        durante un año en el caso poco probable de que se
                        produzca algún tipo fraude. Consulta la Garantía de
                        Smile.
                      </p> */}
                    </div>
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
