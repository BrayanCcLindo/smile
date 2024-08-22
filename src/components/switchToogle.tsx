import * as Switch from "@radix-ui/react-switch";
import { useSmileContext } from "../Api/userContext";
import { Moon, Sun } from "lucide-react";

function SwitchToogle() {
  const { toogleValue } = useSmileContext();

  return (
    <form>
      <div className="flex items-center gap-2 cursor-pointer">
        <Switch.Root
          onCheckedChange={() => {
            const nextTheme = toogleValue.theme === "light" ? "dark" : "light";
            toogleValue.setTheme(nextTheme);
          }}
          defaultValue={toogleValue.theme}
          className="w-[42px] h-[25px] bg-second_bg rounded-full relative data-[state=checked]:bg-second_bg outline-none"
          id="toogle-light-dark"
        >
          <Switch.Thumb className="block w-[21px] h-[21px] bg-main data-[state=checked]:bg-main rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label
          className="text-[15px] cursor-pointer"
          htmlFor="toogle-light-dark"
        >
          {toogleValue.theme === "dark" ? <Moon /> : <Sun />}
        </label>
      </div>
    </form>
  );
}

export default SwitchToogle;
