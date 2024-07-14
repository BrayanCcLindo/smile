import * as RadioGroup from "@radix-ui/react-radio-group";
import { Copy, CreditCard, QrCode } from "lucide-react";
import { useRef, useState } from "react";
import YapeDialog from "./yapeDialog";
function SelectPayment() {
  const [radioValue, setRadioValue] = useState("Yape o Plin");
  const cuentaRef = useRef<HTMLParagraphElement>(null);
  const InterCuentaRef = useRef<HTMLParagraphElement>(null);

  const handleAccountCopy = () => {
    if (cuentaRef.current) {
      navigator.clipboard
        .writeText(cuentaRef.current.innerText)
        .then(() => {
          console.log("Contenido copiado al portapapeles!");
        })
        .catch((err) => {
          console.log("Error al copiar el contenido: ", err);
        });
    }
  };
  const handleIntAccountCopy = () => {
    if (InterCuentaRef.current) {
      navigator.clipboard
        .writeText(InterCuentaRef.current.innerText)
        .then(() => {
          console.log("Contenido copiado al portapapeles!");
        })
        .catch((err) => {
          console.log("Error al copiar el contenido: ", err);
        });
    }
  };

  return (
    <section>
      <RadioGroup.Root
        onValueChange={(value) => {
          setRadioValue(value);
        }}
        className="flex flex-col gap-2.5 mt-6  border border-gray-300 rounded-xl py-6"
        defaultValue={radioValue}
        aria-label="View density"
      >
        <div className="flex flex-col border-b border-gray-300 ">
          <div className="flex items-center  px-6 pb-6 ">
            <RadioGroup.Item
              className="shadow-[0_2px_10px]  w-5 w- h-5 rounded-full hover:bg-main/20  focus:bg-main outline-none cursor-default"
              value="Paypal"
              id="Paypal"
            >
              <RadioGroup.Indicator className=" flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] rounded-full data-[state=checked]:bg-main" />
            </RadioGroup.Item>
            <label
              className=" flex items-center gap-4 text-sm font-medium leading-6 text-gray-900 pl-4 w-full"
              htmlFor="Paypal"
            >
              <img
                width={40}
                height={40}
                src="/Images/logo-paypal.jpg"
                alt="logo-paypal"
              />{" "}
              Paypal
            </label>
          </div>
          {radioValue === "Paypal" && (
            <div className="flex flex-col  px-10 p-5 text-sm ">
              <h3 className=" font-medium leading-6 mt-4 ">Titular</h3>
              <p>
                Julio Cervantes Esponda{" "}
                <span className="text-gray-500">@cesar0511</span>
              </p>
              <a
                className="bg-gradient-to-r flex gap-4 items-center justify-center  from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-sm mt-5"
                href="https://www.paypal.me/cesar0511"
                target="_blank"
              >
                Donar con PayPal
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col border-b border-gray-300 ">
          <div className="flex items-center  px-6 pb-6 ">
            <RadioGroup.Item
              className="shadow-[0_2px_10px]  w-5 w- h-5 rounded-full hover:bg-main/20  focus:bg-main outline-none cursor-default "
              value="Yape o Plin"
              id="Yape o Plin"
            >
              <RadioGroup.Indicator className=" flex items-center rounded-full justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11  data-[state=checked]:bg-main" />
            </RadioGroup.Item>
            <label
              className=" flex items-center gap-4 text-sm font-medium leading-6 text-gray-900 pl-4 w-full pt-4"
              htmlFor="Yape o Plin"
            >
              <QrCode />
              Yape o Plin
            </label>
          </div>
          {radioValue === "Yape o Plin" && (
            <div className="flex flex-col  px-10 p-5 text-sm ">
              <h3 className=" font-medium leading-6 mt-4 ">Titular</h3>
              <p>Julio Cervantes Esponda</p>
              <h3 className=" font-medium leading-6 mt-4 ">Numeró a Yapear</h3>
              <p
                ref={cuentaRef}
                className="border flex justify-between items-center border-gray-300 p-2 rounded-lg mb-5"
              >
                912923010
                <button
                  type="button"
                  onClick={handleAccountCopy}
                  className="text-main"
                >
                  <Copy />
                </button>
              </p>
              <YapeDialog type="yape" />
            </div>
          )}
        </div>

        <div className="flex flex-col  ">
          <div className="flex items-center  px-6 pb-6 ">
            <RadioGroup.Item
              className="shadow-[0_2px_10px]  w-5 w- h-5 rounded-full hover:bg-main/20  focus:bg-main outline-none cursor-default"
              value="Transferencia"
              id="Transferencia"
            >
              <RadioGroup.Indicator className=" flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] rounded-full data-[state=checked]:bg-main " />
            </RadioGroup.Item>
            <label
              className=" flex items-center gap-4 text-sm font-medium leading-6 text-gray-900 pl-4 w-full pt-4"
              htmlFor="Transferencia"
            >
              <CreditCard />
              Transferencia
            </label>
          </div>
          {radioValue === "Transferencia" && (
            <div className="flex flex-col  px-10 p-5 text-sm ">
              <h3 className=" font-medium leading-6">Banco</h3>
              <div className="flex gap-4 items-center">
                <img
                  className="object-cover object-center rounded-lg"
                  width={40}
                  height={40}
                  src="https://pbs.twimg.com/profile_images/1607365667950305283/HpdPjItg_400x400.jpg"
                  alt=""
                />
                <p>InterBank</p>
              </div>
              <h3 className=" font-medium leading-6 mt-4 ">Titular</h3>
              <p>JULIO CESAR CERVANTES ESPONDA</p>
              <h3 className=" font-medium leading-6 mt-4 ">Tipo de Cuenta</h3>
              <p>Cuenta Simple - Soles</p>
              <h3 className=" font-medium leading-6 mt-4 ">Numeró de Cuenta</h3>
              <p
                ref={cuentaRef}
                className="border flex justify-between items-center border-gray-300 p-2 rounded-lg"
              >
                5153140681443
                <button
                  type="button"
                  onClick={handleAccountCopy}
                  className="text-main"
                >
                  <Copy />
                </button>
              </p>
              <h3 className=" font-medium leading-6 mt-4 ">
                Numeró de Cuenta Interbancario (CCI)
              </h3>
              <p
                ref={InterCuentaRef}
                className="border flex justify-between items-center border-gray-300 p-2 rounded-lg mb-4"
              >
                00351501314068144347
                <button
                  type="button"
                  onClick={handleIntAccountCopy}
                  className="text-main"
                >
                  <Copy />
                </button>
              </p>
              <YapeDialog type="transferencia" />
            </div>
          )}
        </div>
      </RadioGroup.Root>
    </section>
  );
}

export default SelectPayment;
