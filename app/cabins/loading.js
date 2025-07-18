import Spinner from "../_components/Spinner";

function Loading() {
  console.log("Loading cabins ...");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <Spinner />
      <p className="text-lg">Loading cabins</p>
    </div>
  );
}

export default Loading;
