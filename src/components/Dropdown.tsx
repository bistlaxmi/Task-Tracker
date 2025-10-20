import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  label?: string;
}

const Dropdown = <T extends string>({
  value,
  onChange,
  options,
  label,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-gray-700 mb-1 text-sm">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-500 transition"
      >
        <span>{value}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                opt === value ? "bg-gray-50 font-medium" : ""
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
