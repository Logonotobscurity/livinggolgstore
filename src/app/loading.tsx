
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="loadingspinner">
          <div id="square1"></div>
          <div id="square2"></div>
          <div id="square3"></div>
          <div id="square4"></div>
          <div id="square5"></div>
        </div>
        <p className="font-headline text-2xl text-white tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
}
