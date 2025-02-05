import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

function detectarIdiomaDispositivo() {
  return navigator.language || "es"; // 'en' como idioma por defecto
}

const idiomaGuardado = localStorage.getItem("language");
const idiomaDispositivo = detectarIdiomaDispositivo();
const idiomaInicial = idiomaGuardado || idiomaDispositivo;

i18next.init({
  interpolation: { escapeValue: false },
  lng: idiomaInicial,
  resources: {
    en: {
      global: global_en
    },
    es: {
      global: global_es
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
