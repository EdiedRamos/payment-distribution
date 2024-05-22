import { useDebt } from "@/contexts";

export const AddDebt = () => {
  const { addDebt } = useDebt();

  return (
    <div onClick={addDebt}>
      <button>crear</button>
    </div>
  );
};
