import * as Progress from "@radix-ui/react-progress";
import { twMerge } from "tailwind-merge";
import { SmileType } from "../type/types";

type BarType = {
  progress: number;
  total: number;
  type?: string;
};

function ProgressBar({
  progress,
  total,
  type = SmileType.Fundaciones
}: BarType) {
  const dynamicPercent = Math.ceil((progress / total) * 100);

  return (
    <Progress.Root
      className={twMerge(
        "relative h-5 overflow-hidden rounded-full",
        type === SmileType.Fundaciones && " bg-main",
        type === SmileType.Emprendedores && " bg-entrepreneur",
        type === SmileType.Social && " bg-alternative"
      )}
      style={{
        transform: "translateZ(0)"
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-gray-200 flex items-center font-semibold text-black pl-4 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(${dynamicPercent}%)` }}
      >
        {dynamicPercent}%
      </Progress.Indicator>
    </Progress.Root>
  );
}

export default ProgressBar;
