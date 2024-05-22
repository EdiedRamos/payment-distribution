import { MdExpandMore } from "react-icons/md";
import { MutableRefObject } from "react";
import type { Option } from "@/models";
import { SelectOptions } from "@/components";
import { useSelect } from "@/hooks";

interface Select {
  selectedRef?: MutableRefObject<Option | null>;
  options: Option[];
}

export const Select = ({ options, selectedRef }: Select) => {
  const select = useSelect({ options, selectedRef });
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
