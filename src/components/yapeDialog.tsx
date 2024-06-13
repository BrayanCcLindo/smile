import * as Dialog from "@radix-ui/react-dialog";
import { ListTodo, TriangleAlert, Vote, X } from "lucide-react";
function YapeDialog({ type }: { type: "transferencia" | "yape" }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-gradient-to-r w-full flex gap-4 items-center justify-center  text-sm from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          {type === "yape" && "Donar con Yape"}
          {type === "transferencia" && "Donar con Transferencia"}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-main mb-7 text-[17px] text-center font-medium">
            {type === "yape" && "Antes de yapear ten en cuenta"}
            {type === "transferencia" && "Antes de transferir ten en cuenta"}
          </Dialog.Title>

          <ul className="space-y-7">
            <li className="flex relative  ">
              <div className="flex-shrink-0 w-10 h-10 rounded-full text-main inline-flex items-center justify-center  relative z-10">
                <ListTodo />
              </div>
              <p className="flex-grow pl-4">
                Cuando finalices la transferencia envíanos el{" "}
                <span className="font-medium">Número de operación&nbsp;</span>
                de la transferencia que te entrega tu banco.
              </p>
            </li>
            <li className="flex relative  ">
              <div className="flex-shrink-0 w-10 h-10 rounded-full text-main inline-flex items-center justify-center  relative z-10">
                <Vote />
              </div>
              <p className="flex-grow pl-4">
                Por favor, déjanos tus datos en el formulario breve de abajo
                para{" "}
                <span className="font-medium">validar tu donación&nbsp;</span>y
                mantenerte informado sobre el uso de los fondos recaudados.
              </p>
            </li>
          </ul>
          {type === "yape" && (
            <div className="flex flex-col justify-center items-center">
              <img
                className="object-cover object-center w-2/5 h-w-2/5"
                src="/Images/YapeCesar.jpeg"
                alt="yape-donar"
              />
            </div>
          )}

          <div className="flex relative  bg-red-500/20 px-4 py-2 rounded-lg mt-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full text-red-500 inline-flex items-center justify-center  relative z-10">
              <TriangleAlert />
            </div>
            <p className="flex-grow pl-4">
              <span className="font-medium">Recordar</span> nuestro proceso de
              validación de su donación será entre 15 a 45 minutos
            </p>
          </div>
          <div className="mt-[25px] ">
            <Dialog.Close asChild>
              <button className="bg-gradient-to-r  w-full flex gap-4 items-center justify-center  text-sm from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                Entendido
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default YapeDialog;
