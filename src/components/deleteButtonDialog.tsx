import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { handleDeleteCampaign } from "../Api/getCampaigns";
import { CampañaGiftSmileType } from "../type/types";
import { useNavigate } from "react-router-dom";

function DeleteButtonDialog({
  text,
  campaña
}: {
  text: string;
  campaña: CampañaGiftSmileType;
}) {
  const navigate = useNavigate();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" flex  text-white bg-red-500 border-0 py-2 px-6  hover:bg-red-600 rounded focus:shadow-[0_0_0_2px]">
          {text}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-indigo-400 m-0 text-[17px] font-medium">
            ¿Está completamente seguro?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            Esta acción no se puede deshacer. Esto borrará permanentemente tu
            campaña
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className=" bg-slate-200 hover:bg-slate-300 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  handleDeleteCampaign(campaña.campañaId);
                  navigate("/campaigns");
                }}
                className="text-white bg-red-500 hover:bg-red-600 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                Si, borrar campaña
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteButtonDialog;
