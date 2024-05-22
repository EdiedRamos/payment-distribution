import { MutableRefObject, useEffect, useRef, useState } from "react";

import type { Option } from "@/models";

interface useSelect {
  options: Option[];
  selectedRef?: MutableRefObject<Option | null>;
}

function findOption(options: Option[]): Option {
  if (options.length === 0)
    throw new Error(
      "useSelect must to be provided with options, options length is zero."
    );
  const defaultOption: Option[] = options.filter((option) => !!option.default);
  if (defaultOption.length === 0) return options[0];
  return defaultOption[0];
}

export const useSelect = ({ options, selectedRef }: useSelect) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState<Option>(() =>
    findOption(options)
  );
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (!selectedRef) return;
    selectedRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  });

  return {
    selectRef,
    handleShowOptions,
    selectedOption,
    showOptions,
    handleSelect,
    options,
  };
};
