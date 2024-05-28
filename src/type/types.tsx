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
  id: string;
  name: string;
  userPhoto: string;
};

export type SmileContextType = {
  stateProfile: UserType;
  updateUser: (user: UserType | null) => void;

  googleSignIn: () => void;
  logOut: () => void;
  // stateFavorites: CampañaGiftSmileType[] | undefined;
  // addCampaignToFavorite: (campaña: CampañaGiftSmileType) => void;
};

export type CampañaGiftSmileType = {
  nombre: string;
  descripcion: string;
  to: string;
  slug: string;
  imagenCampaña: string;
  meta: string;
  id: string;
  fechaCreacion: string;
  campañaId: string;
  fechaInicio: string;
  tipo: string;
  creador: string;
  cargo: string;
  imagen: string;
  donaciones: {
    donadorYapeNombre: string;
    fechaDonacionYape: string;
    montoDonacion: string;
    donadorYapeCorreo: string;
    validation: boolean;
  }[];
};
export type FormData = {
  nombre: string;
  email: string;
  password: string;
  "confirm-password": string;
};
