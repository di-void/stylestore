import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "2X"];

export function ProductsFilters() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [colorsExpanded, setColorsExpanded] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [ratingsExpanded, setRatingsExpanded] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((entry) => entry !== size) : [...prev, size],
    );
  };

  return (
    <aside className="lg:col-span-3">
      <h2 className="text-lg font-black uppercase tracking-tight mb-8">Filters</h2>

      <div className="mb-8">
        <h3 className="text-sm font-bold tracking-[2px] uppercase mb-4">Size</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-[38px] h-[38px] border text-sm font-medium transition ${
                selectedSizes.includes(size)
                  ? "border-black bg-black text-white"
                  : "border-gray-400 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setAvailabilityExpanded(!availabilityExpanded)}
          className="w-full flex items-center justify-between text-sm font-bold tracking-[2px] uppercase mb-4"
        >
          Availability
          <img
            src={availabilityExpanded ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
            alt={availabilityExpanded ? "Collapse" : "Expand"}
            className="w-4 h-4"
          />
        </button>
        {availabilityExpanded && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="w-5 h-5 border border-gray-400" />
              <span>
                Availability <span className="opacity-60">(450)</span>
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="w-5 h-5 border border-gray-400" />
              <span>
                Out Of Stock <span className="opacity-60">(18)</span>
              </span>
            </label>
          </div>
        )}
        <div
          className="h-px bg-rule mt-6"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-rule) 0px, var(--color-rule) 2px, transparent 2px, transparent 4px)",
          }}
        />
      </div>

      {[
        {
          label: "Category",
          expanded: categoryExpanded,
          setExpanded: setCategoryExpanded,
        },
        {
          label: "Colors",
          expanded: colorsExpanded,
          setExpanded: setColorsExpanded,
        },
        {
          label: "Price Range",
          expanded: priceExpanded,
          setExpanded: setPriceExpanded,
        },
        {
          label: "Collections",
          expanded: collectionsExpanded,
          setExpanded: setCollectionsExpanded,
        },
        {
          label: "Tags",
          expanded: tagsExpanded,
          setExpanded: setTagsExpanded,
        },
        {
          label: "Ratings",
          expanded: ratingsExpanded,
          setExpanded: setRatingsExpanded,
        },
      ].map(({ label, expanded, setExpanded }) => (
        <div className="mb-6" key={label}>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-sm font-bold tracking-[2px] uppercase"
          >
            {label}
            <img
              src={expanded ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
              alt={expanded ? "Collapse" : "Expand"}
              className="w-4 h-4"
            />
          </button>
          <div
            className="h-px bg-rule mt-4"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-rule) 0px, var(--color-rule) 2px, transparent 2px, transparent 4px)",
            }}
          />
        </div>
      ))}
    </aside>
  );
}
