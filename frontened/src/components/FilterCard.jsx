import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    type: "location",
    title: "Location",
    options: ["Delhi NCR", "Bangalore", "Pune", "Mumbai", "Chennai", "Indore", "Noida", "Hyderabad","Kochi","Kolkata","Ranchi"],
  },
  {
    type: "jobType",
    title: "Job Type",
    options: ["Internship", "Part-Time", "Full-Time"],
  },
  {
    type: "salary",
    title: "Salary (LPA)",
    options: [
      { label: "Up to 20 LPA", value: "20" },
      { label: "Up to 40 LPA", value: "40" },
      { label: "Up to 60 LPA", value: "60" },
    ],
  },
];

const FilterCard = ({ filters, setFilters }) => {
  const clearFilters = () => {
    setFilters({
      location: "",
      jobType: "",
      salary: "",
    });
  };

  const isClearDisabled =
    !filters.location && !filters.jobType && !filters.salary;

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg text-gray-800">Filter Jobs</h1>

        <button
          onClick={clearFilters}
          disabled={isClearDisabled}
          className="text-sm font-semibold text-black hover:underline disabled:opacity-40"
        >
          Clear
        </button>
      </div>

      <hr className="my-4" />

      {/* Filters */}
      {filterData.map((section) => (
        <div key={section.type} className="mb-5">
          <h2 className="font-semibold text-gray-700 mb-2">
            {section.title}
          </h2>

          <RadioGroup
            value={filters[section.type]}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, [section.type]: value }))
            }
            className="space-y-2"
          >
            {section.options.map((item, index) => {
              const value = typeof item === "string" ? item : item.value;
              const label = typeof item === "string" ? item : item.label;
              const id = `${section.type}-${index}`;

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {/* ✅ BLACK DOT INSIDE CIRCLE */}
                  <RadioGroupItem
                    id={id}
                    value={value}
                    className="
                      border-gray-500
                      data-[state=checked]:border-black
                      data-[state=checked]:bg-indigo
                    "
                  />
                  <Label
                    htmlFor={id}
                    className="cursor-pointer select-none text-gray-800"
                  >
                    {label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

