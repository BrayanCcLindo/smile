import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center py-48 text-main bg-main_bg">
      <LoaderCircle className="animate-spin" strokeWidth={2} size={100} />
    </div>
  );
}

export default Loader;
