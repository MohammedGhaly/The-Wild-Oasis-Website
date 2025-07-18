import CabinCard from "../_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList() {
  const cabins = await getCabins();
  if (!cabins || cabins.length === 0) {
    return (
      <p className="text-primary-200">No cabins available at the moment.</p>
    );
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
