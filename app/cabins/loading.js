import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <Spinner />
      <p className="text-lg">Loading cabin data</p>
    </div>
  );
}

export default Loading;
