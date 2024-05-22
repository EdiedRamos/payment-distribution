import { MdExpandMore } from "react-icons/md";
import type { Option } from "@/models";
import { SelectOptions } from "@/components";
import { useSelect } from "@/hooks";

interface Select {
  options: Option[];
}

export const Select = ({ options }: Select) => {
  const select = useSelect({ options });
  const { selectRef, handleShowOptions, selectedOption, showOptions } = select;

  return (
    <div className="relative max-w-[200px] select-none" ref={selectRef}>
      <div
        className="flex justify-between items-center hover:cursor-pointer hover:opacity-80 text-cc-light border-[3px] p-2 rounded-lg border-cc-dark"
        onClick={handleShowOptions}
      >
        <p>{selectedOption.name} </p>
        <MdExpandMore className={showOptions ? "rotate-180" : ""} />
      </div>
      <SelectOptions {...select} />
    </div>
  );
};
