// // Inicializa MercadoPago con tu clave pública
// // initMercadoPago("TEST-2a6a3c6c-6df2-4dcb-b46d-ecb5280c2cec");
// import { useState, useEffect } from "react";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// const MercadoPagoCheckout = () => {
//   const [preferenceId, setPreferenceId] = useState(null);

//   useEffect(() => {
//     // Inicializar MercadoPago
//     initMercadoPago("TEST-2a6a3c6c-6df2-4dcb-b46d-ecb5280c2cec");

//     // Función para crear la preferencia directamente en el frontend
//     const createPreference = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/create_preference",
//           {
//             method: "POST",
//             headers: {
//               Authorization:
//                 "Bearer TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747",
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               title: "Mi Producto",
//               price: 50,
//               quantity: 2
//             })
//           }
//         );

//         const data = await response.json();
//         setPreferenceId(data.id);
//       } catch (error) {
//         console.error("Error al crear la preferencia:", error);
//       }
//     };

//     createPreference();
//   }, []);

//   return (
//     <div>
//       <h2>Finalizar compra</h2>
//       {preferenceId && (
//         <Wallet initialization={{ preferenceId: preferenceId }} />
//       )}
//     </div>
//   );
// };

// export default MercadoPagoCheckout;
