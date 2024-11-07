import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonLinkType = {
  link: string;
  children: ReactNode;
};

function MainLinkButton({ link, children }: ButtonLinkType) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Link
      onClick={scrollToTop}
      to={link}
      className="bg-gradient-to-r flex gap-4 items-center justify-center  from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg  "
    >
      {children}
    </Link>
  );
}

export default MainLinkButton;

type ButtonType = {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  isLoading: boolean;
};

export function MainButton({ type, children, isLoading }: ButtonType) {
  return (
    <button
      type={type}
      className="bg-gradient-to-r  w-full flex gap-4 items-center justify-center from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
