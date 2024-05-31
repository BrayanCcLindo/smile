import { useNavigate, useParams } from "react-router-dom";
import { Copy, CreditCard, QrCode, ShieldCheck } from "lucide-react";
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
import YapeDialog from "../components/yapeDialog";
import emailjs from "@emailjs/browser";
import { useSmileContext } from "../Api/userContext";

type FormPayment = {
  mail: string;
  monto: string;
  id_campana: string;
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

function DonacionPasarela() {
  const navigate = useNavigate();

  const [initialDonation, setInitialDonation] = useState("0");
  const [image, setImage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const cuentaRef = useRef<HTMLParagraphElement>(null);
  const InterCuentaRef = useRef<HTMLParagraphElement>(null);
  // const smileTip = (Number(initialDonation) * 0.1).toFixed(2);

  // const totalDonation = (Number(initialDonation) + Number(smileTip)).toFixed(2);

  const { slug } = useParams();
  // const { user } = useGetUserData();
  const { stateProfile } = useSmileContext();

  const { data } = useGetCampaigns();
  const campaignIndex = data.findIndex((campaign) => campaign.slug === slug);
  const actualPost = data[campaignIndex];

  const handleButtonValue = (value: string) => {
    setInitialDonation(value);
  };

  const handleAccountCopy = () => {
    if (cuentaRef.current) {
      navigator.clipboard
        .writeText(cuentaRef.current.innerText)
        .then(() => {
          console.log("Contenido copiado al portapapeles!");
        })
        .catch((err) => {
          console.log("Error al copiar el contenido: ", err);
        });
    }
  };
  const handleIntAccountCopy = () => {
    if (InterCuentaRef.current) {
      navigator.clipboard
        .writeText(InterCuentaRef.current.innerText)
        .then(() => {
          console.log("Contenido copiado al portapapeles!");
        })
        .catch((err) => {
          console.log("Error al copiar el contenido: ", err);
        });
    }
  };

  const mySchema: ZodType<FormPayment> = z.object({
    monto: z.string().min(1, { message: "Ingrese el monto a donar" }),
    mail: z.string().email(),
    id_campana: z.string(),
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
      donadorYapeNombre: stateProfile.displayName,
      montoDonacion: data.monto,
      imagenDonacion: image,
      donadorYapeCorreo: data.mail,
      fechaDonacionYape: result,
      validation: false,
    };

    const updatedYapeInfo = {
      ...actualPost,
      donaciones: [...actualPost.donaciones, donationYapeInfo],
    };

    try {
      if (formRef.current) {
        emailjs
          .sendForm("service_gz3oalc", "template_ee4t0e4", formRef.current, {
            publicKey: "8MaF0S-WNDUM7q1YJ",
          })
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
      }

      const donationRef = doc(db, "campañas", actualPost.campañaId);
      updateDoc(donationRef, updatedYapeInfo);
      navigate(-1);
    } catch (error) {
      console.log(error, "error al donar");
    }
  };

  return (
    <>
      {actualPost ? (
        <section className="text-gray-600 body-font">
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
                  <h3 className="font-medium">Iniciar el Donativo</h3>
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

                  <div className="mt-4">
                    <div className="mt-2 relative">
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
                        placeholder="S/. Otro monto"
                        className="block w-full rounded-xl border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
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
                      <p className="font-medium text-red-500 text-sm">
                        Aporte mínimo S/. 4
                      </p>
                    )}
                  </div>
                  <div className="mt-10 mb-10">
                    <h3 className=" font-medium title-font text-gray-900">
                      Aportación voluntaria a los servicios de Smile
                    </h3>
                    <p className="text-base mt-2">
                      Smile aplica una comisión de la plataforma del 0 % a los
                      usuarios que donen.
                    </p>
                  </div>
                  <fieldset className="">
                    <legend className=" font-medium title-font leading-6 text-gray-900">
                      Metodo de Pago
                    </legend>

                    <div className="mt-6  border border-gray-300 rounded-xl pb-6">
                      <div className=" border-gray-300">
                        <div className="flex  items-center gap-x-3 p-6 border-">
                          <label
                            htmlFor="yape-plin"
                            className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900"
                          >
                            <QrCode strokeWidth={1} /> Yape o Plin
                          </label>
                        </div>
                        <div className="space-y-6">
                          <div className="">
                            <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                              <div className="py-5 px-10 flex flex-col col-span-3 sm:col-span-full gap-x-3 gap-y-4 border-b border-gray-300">
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
                                    readOnly
                                    defaultValue={stateProfile.email}
                                    className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                  />
                                </div>
                                <div className="col-span-full">
                                  <YapeDialog type="yape" />
                                </div>
                              </div>

                              <div className="col-span-3 sm:col-span-full ">
                                <div className="flex  items-center gap-x-3  px-6 pb-6 pt-3">
                                  <label
                                    htmlFor="transferencia"
                                    className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <CreditCard strokeWidth={1} /> Transferencia
                                  </label>
                                </div>
                                <div className="mt-2 sr-only">
                                  <input
                                    {...register("id_campana")}
                                    id="id_campana"
                                    name="id_campana"
                                    defaultValue={actualPost.campañaId}
                                    className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="col-span-3 sm:col-span-full text-gray-900">
                                <div className="flex flex-col  px-10 pb-5 text-sm border-b border-gray-300">
                                  <h3 className=" font-medium leading-6">
                                    Banco
                                  </h3>
                                  <div className="flex gap-4 items-center">
                                    <img
                                      className="object-cover object-center rounded-lg"
                                      width={40}
                                      height={40}
                                      src="https://pbs.twimg.com/profile_images/1607365667950305283/HpdPjItg_400x400.jpg"
                                      alt=""
                                    />
                                    <p>InterBank</p>
                                  </div>
                                  <h3 className=" font-medium leading-6 mt-4 ">
                                    Titular
                                  </h3>
                                  <p>JULIO CESAR CERVANTES ESPONDA</p>
                                  <h3 className=" font-medium leading-6 mt-4 ">
                                    Tipo de Cuenta
                                  </h3>
                                  <p>Cuenta Simple - Soles</p>
                                  <h3 className=" font-medium leading-6 mt-4 ">
                                    Numeró de Cuenta
                                  </h3>
                                  <p
                                    ref={cuentaRef}
                                    className="border flex justify-between items-center border-gray-300 p-2 rounded-lg"
                                  >
                                    5153140681443
                                    <button
                                      type="button"
                                      onClick={handleAccountCopy}
                                      className="text-main"
                                    >
                                      <Copy />
                                    </button>
                                  </p>
                                  <h3 className=" font-medium leading-6 mt-4 ">
                                    Numeró de Cuenta Interbancario (CCI)
                                  </h3>
                                  <p
                                    ref={InterCuentaRef}
                                    className="border flex justify-between items-center border-gray-300 p-2 rounded-lg mb-4"
                                  >
                                    00351501314068144347
                                    <button
                                      type="button"
                                      onClick={handleIntAccountCopy}
                                      className="text-main"
                                    >
                                      <Copy />
                                    </button>
                                  </p>
                                  <YapeDialog type="transferencia" />
                                </div>
                              </div>

                              <div className="col-span-full px-10">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Comprobante
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                  <div className="text-center text-gray-600">
                                    <div className="mt-4 flex text-sm justify-center  leading-6 text-gray-600">
                                      <label className="relative cursor-pointer text-center rounded-md bg-white font-semibold text-main focus-within:outline-none focus-within:ring-2 focus-within:ring-main focus-within:ring-offset-2 hover:text-main">
                                        <span> Subir Comprobante</span>
                                        <input
                                          onChange={(event) => {
                                            const mainImage =
                                              event.target.files?.[0];

                                            const reader = new FileReader();
                                            reader.addEventListener(
                                              "load",
                                              () => {
                                                setImage(
                                                  reader.result as string
                                                );
                                              }
                                            );
                                            if (mainImage) {
                                              reader.readAsDataURL(mainImage);
                                            }
                                          }}
                                          // {...register("imagen", {
                                          //   onChange: (event) => {

                                          //   },
                                          // })}
                                          accept="image/png image/jpg imgage/jpeg"
                                          id="imagen"
                                          type="file"
                                          className="sr-only"
                                        />
                                      </label>
                                      <p className="pl-1">en formato</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                      PNG, JPG, JPEG
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center">
                                  {image && (
                                    <img
                                      className="object-cover"
                                      width={150}
                                      height={150}
                                      src={image}
                                      alt="comprobante"
                                    />
                                  )}
                                  {/* {errors.imagen && (
                                      <p className="font-medium text-red-500 text-sm">
                                        {errors.imagen.message}
                                      </p>
                                    )} */}
                                </div>
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
                    <div className="w-full mt-3">
                      {/* {inputValue === "credito-debito" && (
                        <Button type="submit">Donar Ahora</Button>
                      )} */}
                      <Button type="submit">Yapear</Button>
                    </div>

                    <p className="text-sm text-gray-500 mt-5">
                      Al elegir el método de pago anterior, aceptas los Términos
                      de Servicio de Smile y declaras tu conformidad con la
                      Declaración de Privacidad
                    </p>
                  </div>
                  <div className="border-t border-gray-200  py-2 mt-10 flex gap-4 items-start text-main">
                    <ShieldCheck strokeWidth={1} size={30} />
                    <div className="text-gray-900">
                      <h3 className=" font-medium title-font ">
                        Smile protege tu donativo
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
