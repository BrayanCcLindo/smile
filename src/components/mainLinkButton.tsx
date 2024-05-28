import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonLinkType = {
  link: string;
  children: ReactNode;
};

function MainLinkButton({ link, children }: ButtonLinkType) {
  return (
    <Link
      to={link}
      className="bg-gradient-to-r flex gap-4 items-center justify-center  text-sm from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {children}
    </Link>
  );
}

export default MainLinkButton;

type ButtonType = {
  type: "button" | "submit" | "reset";
  children: ReactNode;
};

export function Button({ type, children }: ButtonType) {
  return (
    <button
      type={type}
      className="bg-gradient-to-r  w-full flex gap-4 items-center justify-center  text-sm from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}
