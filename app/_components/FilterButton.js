function FilterButton({ label, isActive, onClick }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        isActive && "bg-primary-700 text-primary-50"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default FilterButton;
