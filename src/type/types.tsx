export type UserType = {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: {
    displayName: null | string;
    email: string;
    phoneNumber: null;
    photoURL: null;
    providerId: string;
    uid: string;
  };
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  uid: string;
};

export type UserData = {
  email: string;
  uid: string;
  name: string;
  userPhoto: string;
};

export type SmileContextType = {
  stateProfile: UserType;
  updateUser: (user: UserData | null) => void;
  logInGoogle: () => void;
  googleSignIn: () => void;
  logOut: () => void;
  toogleValue: { theme: ToogleTheme; setTheme: (theme: ToogleTheme) => void };
  // stateFavorites: CampañaGiftSmileType[] | undefined;
  // addCampaignToFavorite: (campaña: CampañaGiftSmileType) => void;
};

export type CampañaGiftSmileType = {
  nombre: string;
  descripcion: string;
  to: string;
  slug: string;
  imagenCampaña: string;
  meta: number;
  id: string;
  fechaFinal: string;
  campañaId: string;
  fechaInicio: string;
  tipo: string;
  creador: string;
  imagenesCampaña: string[];
  cargo: string;
  imagen: string;
  historia: string;
  donaciones: {
    donadorNombre: string;
    donationType: SmilePaymentMethod;
    fechaDonacionYape: string;
    montoDonacion: number;
    donadorCorreo: string;
    validation: boolean;
  }[];
  ubicación: string;
};
export type FormData = {
  nombre: string;
  email: string;
  password: string;
  "confirm-password": string;
};
export enum SmileType {
  Social = "Impacto Social",
  Fundaciones = "Albergues, fundaciones y ONG",
  Emprendedores = "Emprendedores"
}
export enum SmileForm {
  Social = "social",
  Albergue = "albergue",
  Emprendedores = "emprendedores"
}

export enum SmilePaymentMethod {
  Yape = "Yape",
  Transferencia = "Transferencia",
  Tarjeta = "Tarjeta"
}

export enum PAYMENT_METHODS {
  "YAPE O PLIN" = "Yape o Plin",
  PAYPAL = "Paypal",
  TRANSFERENCIA = "Transferencia",
  TARJETA = "Tarjeta"
}

export type FormPayment = {
  paymentMethod: SmilePaymentMethod;
  amount: string;
  userName?: string;
  userMail?: string;
  cvv?: string;
  expiry?: string;
  cardNumber?: string;
  cardMail?: string;
  cardName?: string;
  idType: string;
  idNumber: string;
  //
  campana_id: string;
  campana_name: string;
};

//Themes
export type ToogleTheme = "dark" | "light" | "system";
