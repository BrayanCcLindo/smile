import Footer from "./components/footer";
import Header from "./components/header";
import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/homepage";
import LogIn from "./pages/logIn";
import SignIn from "./pages/signIn";
import { SmileProvider, useSmileContext } from "./Api/userContext";
import UserProfile from "./pages/UserProfile";
import ComoFunciona from "./pages/comoFunciona";
import Campañas from "./pages/campañas";
import NuevaCampaña from "./pages/iniciarCampaña";
import PostCampaña from "./pages/postCampaña";
import FormularioCamapaña from "./pages/formularioCampaña";
// import CampañasFavoritas from "./pages/campañasFavoritas";
import DonacionPasarela from "./pages/donacionPasarela";
import Configuracion from "./pages/configuracion";
// import Nosotros from "./pages/nosotros";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function RouteGoogleSign({ children }: { children: React.ReactNode }) {
  const { stateProfile } = useSmileContext();
  if (!stateProfile) {
    return <Navigate to="/log-in" />;
  }
  return children;
}

function RouteSignIn({ children }: { children: React.ReactNode }) {
  const { stateProfile } = useSmileContext();
  if (stateProfile) {
    return <Navigate to={"/"} />;
  }
  return children;
}

function App() {
  return (
    <SmileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/log-in"
              element={
                <RouteSignIn>
                  <LogIn />
                </RouteSignIn>
              }
            />
            <Route
              path="/sign-in"
              element={
                <RouteSignIn>
                  <SignIn />
                </RouteSignIn>
              }
            />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/campañas" element={<Campañas />} />
            {/* <Route path="/campañas/favoritos" element={<CampañasFavoritas />} /> */}
            <Route path="/nueva-campaña" element={<NuevaCampaña />} />
            {/* <Route path="/nosotros" element={<Nosotros />} /> */}
            <Route
              path="/configuracion"
              element={
                <RouteGoogleSign>
                  <Configuracion />
                </RouteGoogleSign>
              }
            />
            <Route
              path="/formulario-campaña"
              element={
                <RouteGoogleSign>
                  <FormularioCamapaña />
                </RouteGoogleSign>
              }
            />
            <Route
              path="/campañas/:slug/donar"
              element={<DonacionPasarela />}
            />
            <Route path="/campañas/:slug" element={<PostCampaña />} />
            {/* <Route path="/perfil" element={<UserProfile />} /> */}
            <Route
              path="/perfil"
              element={
                <RouteGoogleSign>
                  <UserProfile />
                </RouteGoogleSign>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </SmileProvider>
  );
}

export default App;
