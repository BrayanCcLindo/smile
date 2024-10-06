import Footer from "./components/footer";
import Header from "./components/header";
import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { SmileProvider, useSmileContext } from "./Api/userContext";
import { Toaster } from "sonner";
import { lazy, Suspense, useEffect, useState } from "react";
import { SmileForm } from "./type/types";

import Loader from "./components/loader";
import { ROUTES } from "./constants/routes";

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
    return <Navigate to={ROUTES.LOG_IN} />;
  }
  return children;
}

function RouteSignIn({ children }: { children: React.ReactNode }) {
  const { stateProfile } = useSmileContext();
  if (stateProfile) {
    return <Navigate to={ROUTES.HOMEPAGE} />;
  }
  return children;
}

const LazyComponent = ({
  Component,
  ...props
}: {
  Component: React.ComponentType;
}) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

function App() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsloading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const Homepage = lazy(() => import("./pages/homepage"));
  const LogIn = lazy(() => import("./pages/logIn"));
  const SignIn = lazy(() => import("./pages/signIn"));
  const UserProfile = lazy(() => import("./pages/UserProfile"));
  const ComoFunciona = lazy(() => import("./pages/comoFunciona"));
  const Campaigns = lazy(() => import("./pages/campanas"));
  const StartCampaign = lazy(() => import("./pages/crearCampana"));
  const PostCampaign = lazy(() => import("./pages/postCampaign"));
  const DonacionPasarela = lazy(() => import("./pages/donacionPasarela"));
  const Configuracion = lazy(() => import("./pages/configuracion"));
  const FormAlbergue = lazy(() => import("./pages/formAlbergue"));
  const FormEmprendedor = lazy(() => import("./pages/formEmprendedor"));
  const FormSocial = lazy(() => import("./pages/formSocial"));
  const Error404 = lazy(() => import("./pages/404"));
  return (
    <BrowserRouter>
      <SmileProvider defaultTheme="dark">
        <Toaster
          richColors
          theme="light"
          // toastOptions={{
          //   unstyled: true,
          //   classNames: { toast: "bg-red-500", title: "text-red-500" },
          // }}
          position="top-right"
        />
        <Routes>
          <Route
            path={ROUTES.HOMEPAGE}
            element={
              <Suspense fallback={<Loader />}>
                <MainLayout />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.HOMEPAGE}
              Component={() => <LazyComponent Component={Homepage} />}
            />{" "}
            <Route
              path="*"
              Component={() => <LazyComponent Component={Error404} />}
            />
            <Route
              path={ROUTES.LOG_IN}
              element={
                <RouteSignIn>
                  <LogIn />
                </RouteSignIn>
              }
            />
            <Route
              path={ROUTES.SIGN_IN}
              element={
                <RouteSignIn>
                  <SignIn />
                </RouteSignIn>
              }
            />
            <Route
              path={ROUTES.COMO_FUNCIONA}
              Component={() => <LazyComponent Component={ComoFunciona} />}
            />
            <Route
              path={ROUTES.CAMPANAS}
              Component={() => <LazyComponent Component={Campaigns} />}
            />
            <Route
              path={ROUTES.CREAR_CAMPANA}
              Component={() => <LazyComponent Component={StartCampaign} />}
            />
            <Route
              path={`${ROUTES.CREAR_CAMPANA}/${SmileForm.Albergue}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormAlbergue} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={`${ROUTES.CREAR_CAMPANA}/${SmileForm.Emprendedores}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormEmprendedor} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={`${ROUTES.CREAR_CAMPANA}/${SmileForm.Social}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormSocial} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={ROUTES.CONFIGURACION}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={Configuracion} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={`${ROUTES.CAMPANAS}/:slug/donar`}
              element={
                <DonacionPasarela
                  setIsloading={setIsloading}
                  isLoading={isLoading}
                />
              }
            />
            <Route path={`${ROUTES.CAMPANAS}/:slug`} Component={PostCampaign} />
            <Route
              path={ROUTES.PERFIL}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={UserProfile} />
                </RouteGoogleSign>
              }
            />
          </Route>
        </Routes>
      </SmileProvider>
    </BrowserRouter>
  );
}

export default App;
