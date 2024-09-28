import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-main_bg to-second_bg">
      <h1 className="mb-4 font-extrabold text-heading text-9xl">404</h1>
      <h2 className="mb-6 text-4xl font-bold text-heading">
        Página no encontrada
      </h2>
      <p className="max-w-md mb-8 text-xl text-content_text">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="space-x-4">
        <Button className="border border-card_border" asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
