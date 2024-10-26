import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [mercadopago, setMercadopago] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);
  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setExpirationDate(value);
    } else {
      setExpirationDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPaymentStatus(null);
    setStatusMessage("");

    if (!mercadopago) {
      console.error("MercadoPago no está inicializado");
      setIsLoading(false);
      return;
    }

    const [expirationMonth, expirationYear] = expirationDate.split("/");

    const cardData = {
      cardNumber: cardNumber.replace(/\s/g, ""),
      cardholderName,
      cardExpirationMonth: expirationMonth,
      cardExpirationYear: `20${expirationYear}`,
      securityCode,
      identificationType,
      identificationNumber
    };

    try {
      const token = await mercadopago.createCardToken(cardData);

      // Obtener información adicional del método de pago
      // const paymentMethod = await mercadopago.getPaymentMethods({
      //   bin: cardNumber.substring(0, 6)
      // });
      // const paymentMethodId = paymentMethod.results[0].id;
      // const issuerId = paymentMethod.results[0].issuer.id;

      // Enviar el token al backend
      const response = await fetch(
        "http://localhost:3000/api/process-payment",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: token.id,
            transaction_amount: parseInt(amount)
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setPaymentStatus("success");
        setStatusMessage("Pago procesado con éxito");
      } else {
        setPaymentStatus("error");
        setStatusMessage(result.message || "Error al procesar el pago");
      }
    } catch (error: any) {
      console.error("Error al generar el token o procesar el pago:", error);
      setPaymentStatus("error");
      setStatusMessage(error.message || "Error al procesar el pago");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Pago con tarjeta</CardTitle>
        <CardDescription>
          Ingresa los datos de tu tarjeta para realizar el pago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto a donar</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={e => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              placeholder="S/. 4"
              maxLength={19}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <Input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Nombre del titular</Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={e => setCardholderName(e.target.value)}
              placeholder="Juan Pérez"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Fecha de expiración</Label>
              <Input
                id="expirationDate"
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityCode">Código de seguridad</Label>
              <Input
                id="securityCode"
                type="text"
                value={securityCode}
                onChange={e =>
                  setSecurityCode(e.target.value.replace(/\D/g, ""))
                }
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="identificationType">Tipo de documento</Label>
            <Input
              id="identificationType"
              type="text"
              value={identificationType}
              onChange={e => setIdentificationType(e.target.value)}
              placeholder="DNI"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identificationNumber">Número de documento</Label>
            <Input
              id="identificationNumber"
              type="text"
              value={identificationNumber}
              onChange={e => setIdentificationNumber(e.target.value)}
              placeholder="12345678"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? "Procesando..." : "Pagar"}
        </Button>
        {paymentStatus === "success" && (
          <Alert variant="default">
            <CheckCircle2 className="w-4 h-4" />
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        )}
        {paymentStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
