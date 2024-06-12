import * as Progress from "@radix-ui/react-progress";

type BarType = {
  progress: number;
  total: number;
};

function ProgressBar({ progress, total }: BarType) {
  //   const prueba = 130;
  //   const prueba2 = 1150;
  const dynamicPercent = Math.ceil((progress / total) * 100);

  return (
    <Progress.Root
      className="relative overflow-hidden bg-main rounded-full h-5 "
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-gray-200 flex items-center font-semibold text-main w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(${dynamicPercent}%)` }}
      >
        {dynamicPercent}%
      </Progress.Indicator>
    </Progress.Root>
  );
}

export default ProgressBar;
