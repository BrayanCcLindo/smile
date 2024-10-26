import emailjs from "@emailjs/browser";
import { RefObject } from "react";

export const sendEmailConfirmation = async (
  itemRef: RefObject<HTMLFormElement>
) => {
  if (!itemRef.current) {
    throw new Error("Form reference is not available");
  }
  return emailjs.sendForm(
    "service_gz3oalc",
    "template_ee4t0e4",
    itemRef.current,
    { publicKey: "8MaF0S-WNDUM7q1YJ" }
  );
};
