"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

const filters = ["all", "small", "medium", "large"];

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const capacityParam = searchParams.get("capacity") ?? "all";
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-primary-800 flex">
      {filters.map((f) => (
        <FilterButton
          key={f + "_button"}
          label={f}
          isActive={capacityParam === f}
          onClick={() => handleFilter(f)}
        />
      ))}
    </div>
  );
}

export default Filter;
