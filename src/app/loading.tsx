
import { LivingGoldLogo } from "@/components/logo";
import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative w-48 h-48">
           <LivingGoldLogo className="w-full h-full opacity-50" />
           <Icons.loader className="absolute inset-0 m-auto h-12 w-12 animate-spin text-primary" />
        </div>
        <p className="font-headline text-2xl text-white tracking-widest animate-pulse">
            LOADING...
        </p>
      </div>
    </div>
  );
}
