import { Skeleton } from "./ui/skeleton";

function SkeletonCardLoader() {
  return (
    <div className="relative flex flex-col items-start justify-between max-w-xl overflow-hidden border group border-card_border rounded-xl">
      <div className="flex items-center justify-between w-full gap-3 p-3">
        <Skeleton className="h-[30px] w-[30px] rounded-full" />
        <Skeleton className="flex-grow h-6" />
      </div>
      <div className="relative h-[300px] w-full">
        <Skeleton className="w-full h-full" />
        <Skeleton className="absolute z-[2] rounded-full top-2 right-2 h-6 w-20" />
      </div>
      <div className="w-full px-3 py-1">
        <div className="flex items-center justify-between w-full mt-4 gap-x-4">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="mt-5">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4 mt-2" />
          <Skeleton className="w-3/4 h-4 mt-2" />
        </div>
        <div className="mt-5">
          <Skeleton className="w-full h-2" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCardLoader;
