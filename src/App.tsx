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
  const Campaigns = lazy(() => import("./pages/campaigns"));
  const StartCampaign = lazy(() => import("./pages/startCampaign"));
  const PostCampaign = lazy(() => import("./pages/postCampaign"));
  const DonacionPasarela = lazy(() => import("./pages/donacionPasarela"));
  const Configuracion = lazy(() => import("./pages/configuracion"));
  const FormAlbergue = lazy(() => import("./pages/formAlbergue"));
  const FormEmprendedor = lazy(() => import("./pages/formEmprendedor"));
  const FormSocial = lazy(() => import("./pages/formSocial"));
  const Error404 = lazy(() => import("./pages/404"));
  return (
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Cargando layout...</div>}>
                <MainLayout />
              </Suspense>
            }
          >
            <Route
              path="/"
              Component={() => <LazyComponent Component={Homepage} />}
            />{" "}
            <Route
              path="*"
              Component={() => <LazyComponent Component={Error404} />}
            />
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
            <Route
              path="/how-it-works"
              Component={() => <LazyComponent Component={ComoFunciona} />}
            />
            <Route
              path="/campaigns"
              Component={() => <LazyComponent Component={Campaigns} />}
            />
            <Route
              path="/new-campaign"
              Component={() => <LazyComponent Component={StartCampaign} />}
            />
            <Route
              path={`/new-campaign/${SmileForm.Albergue}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormAlbergue} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={`/new-campaign/${SmileForm.Emprendedores}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormEmprendedor} />
                </RouteGoogleSign>
              }
            />
            <Route
              path={`/new-campaign/${SmileForm.Social}`}
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={FormSocial} />
                </RouteGoogleSign>
              }
            />
            <Route
              path="/configuracion"
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={Configuracion} />
                </RouteGoogleSign>
              }
            />
            <Route
              path="/campaigns/:slug/donar"
              element={
                <DonacionPasarela
                  setIsloading={setIsloading}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/campaigns/:slug" Component={PostCampaign} />
            <Route
              path="/perfil"
              element={
                <RouteGoogleSign>
                  <LazyComponent Component={UserProfile} />
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
