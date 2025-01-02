export const ROUTES = {
  HOMEPAGE: "/",
  CAMPANAS: "/campanas",
  COMO_FUNCIONA: "/como-funciona",
  SIGN_IN: "/registrese",
  LOG_IN: "/iniciar-sesion",
  CREAR_CAMPANA: "/crear-campana",
  CONFIGURACION: "/configuracion",
  PERFIL: "/perfil",
  NOSOTROS: "/nosotros"
};

export const routes = [
  {
    to: ROUTES.HOMEPAGE,
    text: "Inicio",
    private: false
  },
  {
    to: ROUTES.COMO_FUNCIONA,
    text: "¿Cómo funciona?",
    private: false
  },

  {
    to: ROUTES.CAMPANAS,
    text: "Campañas",
    private: false
  },
  {
    to: ROUTES.NOSOTROS,
    text: "Nosotros",
    private: false
  }
];

export const profileRoutes = [
  {
    to: ROUTES.COMO_FUNCIONA,
    text: "Como Funciona"
  },
  {
    to: ROUTES.HOMEPAGE,
    text: "Términos y Condiciones"
  },
  {
    to: ROUTES.HOMEPAGE,
    text: "Política de Privacidad"
  }
];
