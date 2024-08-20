// const client = new MercadoPagoConfig({
//   accessToken:
//     "TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747"
// });
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();
const port = 3001; // Choose a port for your backend

app.use(cors());
app.use(express.json());

// Configure Mercado Pago
// new mercadopago.MercadoPagoConfig({
//   access_token:
//     "TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747"
// });
const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    "TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747"
});

// Create a route for creating a payment
app.post("/create_preference", async (req, res) => {
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: req.body.title,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity)
          }
        ],
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending"
        },
        auto_return: "approved"
      }
    });

    res.json({
      id: result.id
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the preference" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
