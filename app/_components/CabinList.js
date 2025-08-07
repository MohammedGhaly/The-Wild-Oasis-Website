import CabinCard from "../_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins || cabins.length === 0) {
    return (
      <p className="text-primary-200">No cabins available at the moment.</p>
    );
  }

  let displayedCabins = cabins;
  if (filter !== "all") {
    if (filter === "small") {
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
    } else if (filter === "medium") {
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity === 4);
    } else if (filter === "large") {
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 4);
    }
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
