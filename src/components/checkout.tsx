import { useState } from "react";
import { Wallet } from "@mercadopago/sdk-react";

// initMercadoPago("TEST-2a6a3c6c-6df2-4dcb-b46d-ecb5280c2cec");

const Payment = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    try {
      const response = await fetch("http://localhost:3001/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "My product",
          price: 100,
          quantity: 1
        })
      });

      const data = await response.json();
      if (data.id) {
        setPreferenceId(data.id);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error creating preference:", error);
    }
  };

  return (
    <div>
      <button onClick={createPreference}>Pay with Mercado Pago</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};

export default Payment;
