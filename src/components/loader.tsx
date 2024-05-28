import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center text-main py-20 pt-40">
      <LoaderCircle className="animate-spin" strokeWidth={2} size={100} />
    </div>
  );
}

export default Loader;
