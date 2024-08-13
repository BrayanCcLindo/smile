// import { Card, Payment } from '@mercadopago/sdk-react'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";

const CheckOutMercadoPago = () => {
  initMercadoPago("TEST-2a6a3c6c-6df2-4dcb-b46d-ecb5280c2cec", {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);
  const createPreference = async () => {
    try {
      const response = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "bananitas 10",
          price: 20,
          quantity: 2,
        }),
      });
      const data = await response.json();
      // const { id } = response.data;
      return data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    console.log(id, "id");

    if (id) {
      setPreferenceId(id);
    }
    console.log(preferenceId, "preferenceId");
  };

  return (
    <div>
      Producto1
      <h2>Camapana 2222</h2>
      <p>pecio: 250$</p>
      <button onClick={handleBuy}>comprar</button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default CheckOutMercadoPago;
