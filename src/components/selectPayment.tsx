import { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../components/ui/accordion";
import FormErrors from "./formErrors";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CampañaGiftSmileType, FormPayment } from "../type/types";
import { ClipboardCopy } from "lucide-react";
import { sendEmailConfirmation } from "../assets/donationMessages";
import { processPayment } from "../assets/mercadoPagoApi";
import { updateFirebaseDonations } from "../assets/firebase/updateDonations";
import { MainButton } from "./mainLinkButton";

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
      className="px-4 py-2 text-sm border text-content_text border-card_border rounded-xl"
      value={value}
    >
      {text}
    </button>
  );
};

export default function SelectPaymentForm({
  actualPost
}: {
  actualPost: CampañaGiftSmileType;
}) {
  const [paymentMethod, setPaymentMethod] = useState("yape");
  const [mercadopago, setMercadopago] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const isValidCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s/g, "");
    return /^[0-9]{13,19}$/.test(cleanValue);
  };
  const isValidExpiry = (value: string) =>
    /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value);
  const isValidCVV = (value: string) => /^[0-9]{3,4}$/.test(value);
  const isValidEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);

  useEffect(() => {
    const loadMercadoPago = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const mp = new window.MercadoPago(
          "TEST-2a6a3c6c-6df2-4dcb-b46d-ecb5280c2cec"
        );
        setMercadopago(mp);
      };
    };

    loadMercadoPago();

    return () => {
      const script = document.querySelector(
        'script[src="https://sdk.mercadopago.com/js/v2"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormPayment>({
    defaultValues: {
      amount: "",
      paymentMethod: "yape",
      userName: "",
      userMail: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardName: "",
      cardMail: "",
      idType: "",
      idNumber: "",
      campana_id: actualPost.campañaId,
      campana_name: actualPost.nombre
    }
  });

  const watchPaymentMethod = watch("paymentMethod");

  const showConfirmationForm =
    paymentMethod === "yape" || paymentMethod === "transfer";

  const submitData = async (data: FormPayment) => {
    setIsLoading(true);

    try {
      await sendEmailConfirmation(formRef);
      await updateFirebaseDonations(data, actualPost);
      toast.success("Su donación fue realizada con éxito", {
        duration: 3000,
        position: "top-center"
      });
      if (data.paymentMethod === "card") {
        await handleCardPayment(data);
      }
    } catch (error) {
      console.error("Error in submitData:", error);
      toast.error(
        "Hubo un error con su donación. Por favor, inténtelo de nuevo más tarde.",
        {
          duration: 3000,
          position: "top-center"
        }
      );
    } finally {
      setIsLoading(false);
      navigate(-1);
    }
  };

  const handleCardPayment = async (data: FormPayment) => {
    if (!mercadopago) {
      throw new Error("MercadoPago is not initialized");
    }
    const cardData = prepareCardData(data);
    const token = await mercadopago.createCardToken(cardData);
    const response = await processPayment(token.id, data.amount);
    handlePaymentResponse(response);
  };

  const prepareCardData = (data: FormPayment) => {
    const [expirationMonth, expirationYear] = data.expiry?.split("/") || [];
    return {
      cardNumber: data.cardNumber?.replace(/\s/g, ""),
      cardholderName: data.cardName,
      cardExpirationMonth: expirationMonth,
      cardExpirationYear: `20${expirationYear}`,
      securityCode: data.cvv,
      identificationType: data.idType,
      identificationNumber: data.idNumber
    };
  };

  const handlePaymentResponse = (result: any) => {
    if (result.success) {
      toast.success("Pago procesado con éxito", {
        duration: 3000,
        position: "top-center"
      });
    } else {
      toast.error("Error al procesar el pago", {
        duration: 3000,
        position: "top-center"
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className="w-full mx-auto"
    >
      <div className="hidden">
        <Label htmlFor="campana_id">Campana Id</Label>
        <Controller
          name="campana_id"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" id="campana_id" name="campana_id" />
          )}
        />
      </div>
      <div className="hidden">
        <Label htmlFor="campana_name">Campana Id</Label>{" "}
        <Controller
          name="campana_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="campana_name"
              name="campana_name"
            />
          )}
        />
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-main">
            Apoya Nuestro Proyecto
          </CardTitle>
          <CardDescription className="text-lg">
            Cada contribución nos acerca a nuestra meta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2 text-left">
            <Label htmlFor="amount">Monto a donar</Label>
            <ul className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <li>
                <ButtonDonations
                  onclick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const value = (event.target as HTMLInputElement).value;
                    setValue("amount", value);
                    // handleButtonValue(value);
                  }}
                  value={5}
                  text={"S/.5"}
                />
              </li>
              <li>
                <ButtonDonations
                  onclick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const value = (event.target as HTMLInputElement).value;
                    setValue("amount", value);

                    // handleButtonValue(value);
                  }}
                  value={10}
                  text={"S/.10"}
                />
              </li>
              <li>
                <ButtonDonations
                  onclick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const value = (event.target as HTMLInputElement).value;
                    setValue("amount", value);

                    // handleButtonValue(value);
                  }}
                  value={20}
                  text={"S/.20"}
                />
              </li>
              <li>
                <ButtonDonations
                  onclick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const value = (event.target as HTMLInputElement).value;
                    setValue("amount", value);

                    // handleButtonValue(value);
                  }}
                  value={50}
                  text={"S/.50"}
                />
              </li>
            </ul>
            <div className="relative">
              <span className="px-4 text-sm py-1 absolute left-[4px] top-1/2 -translate-y-1/2 text-content_text">
                S/.
              </span>
              <Controller
                control={control}
                rules={{
                  required: "El monto es requerido",
                  min: {
                    value: 4,
                    message: "El monto mínimo de donación es S/.4"
                  },
                  validate: value => {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue)) {
                      return "Por favor, ingrese un número válido";
                    }
                    if (numValue % 1 !== 0) {
                      return "Por favor, ingrese un monto sin céntimos";
                    }
                    return true;
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="amount"
                    type="text"
                    onChange={e => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setValue("amount", value);
                      }
                    }}
                    placeholder="Ingrese el monto"
                    className="pl-10 "
                  />
                )}
                name="amount"
              />
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-main/10 absolute right-[4px] top-1/2 -translate-y-1/2">
                PEN
              </span>
            </div>
            {errors.amount && <FormErrors>{errors.amount.message}</FormErrors>}
          </div>
          <h3 className="text-sm text-left text-heading">Metodo de Pago</h3>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Metodo de pago es requerido" }}
            render={({ field }) => (
              <Tabs
                defaultValue={paymentMethod}
                onValueChange={value => {
                  field.onChange(value);
                  setPaymentMethod(value);
                }}
                className="mt-3"
              >
                <TabsList className="grid w-full grid-cols-3 gap-4 p-1 rounded-lg bg-third_bg">
                  <TabsTrigger
                    value="yape"
                    className="data-[state=active]:bg-main_bg data-[state=active]:text-heading rounded-lg"
                  >
                    Yape
                  </TabsTrigger>
                  <TabsTrigger
                    value="transfer"
                    className="data-[state=active]:bg-main_bg data-[state=active]:text-heading rounded-lg"
                  >
                    Transferencia
                  </TabsTrigger>
                  <TabsTrigger
                    value="card"
                    className="data-[state=active]:bg-main_bg data-[state=active]:text-heading rounded-lg"
                  >
                    Tarjeta
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="yape" className="mt-4">
                  <div className="space-y-2 text-center">
                    <img
                      loading="lazy"
                      className="object-cover object-top w-48 h-48 mx-auto"
                      src="/Images/YapeCesar.jpeg"
                      alt="yape-donar"
                    />

                    <p className="mt-4 text-content_text">
                      Escanea el código QR o copia el número para continuar de
                      manera fácil y rápida
                    </p>
                  </div>
                  <div className="p-4 text-left rounded-lg bg-third_bg">
                    <Label htmlFor="yapeNumber">Número de Yape</Label>
                    <div className="flex mt-1">
                      <Input
                        id="yapeNumber"
                        defaultValue="912-923-010"
                        readOnly
                        className="flex-grow text-content_text"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          navigator.clipboard
                            .writeText("912923010")
                            .then(() => {
                              toast.success("Copiado!", {
                                duration: 3000,
                                position: "top-right"
                              });
                            });
                        }}
                        className="ml-2 text-white bg-main"
                      >
                        <ClipboardCopy className="w-5 h-5" />
                        <span className="sr-only">Copiar número de Yape</span>
                      </Button>
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="yape-guide">
                      <AccordionTrigger className="text-main">
                        Cómo Yapear
                      </AccordionTrigger>
                      <AccordionContent>
                        <ol className="space-y-2 text-left list-decimal list-inside text-heading">
                          <li>Abre tu app de Yape</li>
                          <li>Selecciona la opción "Pagar con QR"</li>
                          <li>Escanea el código QR mostrado arriba</li>
                          <li>Ingresa el monto a donar</li>
                          <li>Confirma tu pago</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="transfer" className="mt-4">
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg shadow-md bg-third_bg">
                      <h3 className="mb-4 text-xl font-semibold text-main">
                        Datos de la cuenta
                      </h3>
                      <div className="space-y-4 text-left">
                        <div>
                          <Label htmlFor="bankName">Banco</Label>
                          <div className="flex">
                            <div className="flex items-center justify-center p-1 mr-2 bg-[#02bf4f] rounded-lg">
                              <img
                                loading="lazy"
                                className="object-cover object-center"
                                src="/svg/interbank-logo.svg"
                                width={40}
                                height={40}
                                alt=""
                              />
                            </div>
                            <Input
                              id="bankName"
                              defaultValue="InterBank"
                              readOnly
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">
                            Número de Cuenta
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              id="accountNumber"
                              defaultValue="5153-1406-81443"
                              readOnly
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText("5153140681443")
                                  .then(() => {
                                    toast.success("Copiado!", {
                                      duration: 3000,
                                      position: "top-right"
                                    });
                                  });
                              }}
                              className="ml-2 text-white bg-main"
                            >
                              <ClipboardCopy className="w-5 h-5" />
                              <span className="sr-only">
                                Copiar número de cuenta
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountNumberInter">
                            Número de Cuenta Interbancaria
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              id="accountNumberInter"
                              defaultValue="003-513-013140681443-47"
                              readOnly
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText("00351301314068144347")
                                  .then(() => {
                                    toast.success("Copiado!", {
                                      duration: 3000,
                                      position: "top-right"
                                    });
                                  });
                                // Aquí puedes agregar una notificación de "Copiado" si lo deseas
                              }}
                              className="ml-2 text-white bg-main"
                            >
                              <ClipboardCopy className="w-5 h-5" />
                              <span className="sr-only">
                                Copiar número de cuenta interbancaria
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountHolder">Titular</Label>
                          <Input
                            id="accountHolder"
                            defaultValue="Julio Cervantes Esponda"
                            readOnly
                            className="mt-1 "
                          />
                        </div>
                      </div>
                    </div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="transfer-guide">
                        <AccordionTrigger className="text-main">
                          Cómo hacer la transferencia
                        </AccordionTrigger>
                        <AccordionContent>
                          <ol className="space-y-2 text-left list-decimal list-inside text-heading">
                            <li>Ingresa a tu banca en línea</li>
                            <li>Selecciona "Transferir a otra cuenta"</li>
                            <li>Ingresa los datos de nuestra cuenta</li>
                            <li>Ingresa el monto a donar</li>
                            <li>Confirma y realiza la transferencia</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </TabsContent>
                <TabsContent value="card" className="mt-4">
                  <div className="p-6 space-y-4 text-left rounded-lg shadow-md bg-third_bg">
                    <Label htmlFor="cardNumber" className="text-left">
                      Número de Tarjeta
                    </Label>
                    <Controller
                      name="cardNumber"
                      control={control}
                      rules={{
                        required:
                          watchPaymentMethod === "card"
                            ? "El número de tarjeta es requerido"
                            : false,
                        validate: value =>
                          isValidCardNumber(value || "") ||
                          "Número de tarjeta inválido"
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          onChange={e => {
                            const value = e.target.value.replace(/\D/g, "");
                            const formattedValue = value
                              .replace(/(\d{4})(?=\d)/g, "$1 ")
                              .trim();

                            setValue("cardNumber", formattedValue);
                          }}
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                          // maxLength={19}
                        />
                      )}
                    />

                    {errors.cardNumber && (
                      <FormErrors>{errors.cardNumber.message}</FormErrors>
                    )}
                    <div>
                      <Label htmlFor="card-name">Nombre del Titular</Label>
                      <Controller
                        name="cardName"
                        control={control}
                        rules={{
                          required:
                            watchPaymentMethod === "card"
                              ? "El nombre es requerido"
                              : false
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="cardName"
                            type="text"
                            placeholder="Juan Perez"
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                    {errors.cardName && (
                      <FormErrors>{errors.cardName.message}</FormErrors>
                    )}

                    <div>
                      <Label htmlFor="cardMail">Correo</Label>
                      <Controller
                        name="cardMail"
                        control={control}
                        rules={{
                          required:
                            watchPaymentMethod === "card"
                              ? "El correo electrónico es requerido"
                              : false,
                          validate: value =>
                            isValidEmail(value || "") ||
                            "Correo electrónico inválido"
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="cardMail"
                            type="text"
                            placeholder="juanperez@gmail.com"
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                    {errors.cardMail && (
                      <FormErrors>{errors.cardMail.message}</FormErrors>
                    )}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div>
                        <Label htmlFor="expiry">Fecha de Expiración</Label>
                        <Controller
                          name="expiry"
                          control={control}
                          rules={{
                            required:
                              watchPaymentMethod === "card"
                                ? "el CVV es requerido"
                                : false,
                            validate: value =>
                              isValidExpiry(value || "") || "CVV inválido"
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              onChange={e => {
                                field.onChange(e);
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 2) {
                                  setValue("expiry", value);
                                } else {
                                  setValue(
                                    "expiry",
                                    `${value.slice(0, 2)}/${value.slice(2, 4)}`
                                  );
                                }
                              }}
                              id="expiry"
                              type="text"
                              placeholder="MM/AA"
                              className="mt-1"
                            />
                          )}
                        />

                        {errors.expiry && (
                          <FormErrors>{errors.expiry.message}</FormErrors>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Controller
                          name="cvv"
                          control={control}
                          rules={{
                            required:
                              watchPaymentMethod === "card"
                                ? "La fecha de expiración es requerida"
                                : false,
                            validate: value =>
                              isValidCVV(value || "") ||
                              "Fecha de expiración inválida (MM/YY)"
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              onChange={e => {
                                field.onChange(e);
                                const value = e.target.value.replace(/\D/g, "");
                                setValue("cvv", value);
                              }}
                              maxLength={4}
                              id="cvv"
                              type="text"
                              placeholder="123"
                              className="mt-1"
                            />
                          )}
                        />

                        {errors.cvv && (
                          <FormErrors>{errors.cvv.message}</FormErrors>
                        )}
                      </div>
                    </div>
                    <div className="text-left">
                      <Label htmlFor="idType">Tipo de Documento</Label>
                      <Controller
                        name="idType"
                        control={control}
                        rules={{
                          required:
                            watchPaymentMethod === "card"
                              ? "El tipo de documento es requerido"
                              : false
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="idType"
                            type="text"
                            placeholder="DNI"
                            className="mt-1"
                          />
                        )}
                      />
                      {errors.idType && (
                        <FormErrors>{errors.idType.message}</FormErrors>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="idNumber">Número de Documento</Label>
                      <Controller
                        name="idNumber"
                        control={control}
                        rules={{
                          required:
                            watchPaymentMethod === "card"
                              ? "El número de documento es requerido"
                              : false
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="idNumber"
                            type="text"
                            placeholder="12345678"
                            className="mt-1"
                          />
                        )}
                      />
                      {errors.idNumber && (
                        <FormErrors>{errors.idNumber.message}</FormErrors>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          />

          <AnimatePresence>
            {showConfirmationForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 mt-6 rounded-lg shadow-md bg-third_bg"
              >
                <h3 className="mb-4 font-semibold text-main">
                  Confirma tu donación
                </h3>
                <div className="space-y-4 text-left">
                  <div>
                    <Label htmlFor="userName">Nombre completo</Label>
                    <Controller
                      name="userName"
                      control={control}
                      rules={{
                        required: showConfirmationForm
                          ? "El nombre es requerido"
                          : false
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Ingresa tu nombre completo"
                          className="mt-1"
                        />
                      )}
                    />
                    {errors.userName && (
                      <FormErrors>{errors.userName.message}</FormErrors>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="userMail">Correo electrónico</Label>
                    <Controller
                      name="userMail"
                      control={control}
                      rules={{
                        required: showConfirmationForm
                          ? "El correo electrónico es requerido"
                          : false,
                        validate: value =>
                          isValidEmail(value || "") ||
                          "Correo electrónico inválido"
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Ingresa tu correo electrónico"
                          className="mt-1"
                        />
                      )}
                    />
                    {errors.userMail && (
                      <FormErrors>{errors.userMail.message}</FormErrors>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <MainButton type="submit" isLoading={isLoading}>
            Donar Ahora
          </MainButton>
        </CardFooter>
      </Card>
    </form>
  );
}
