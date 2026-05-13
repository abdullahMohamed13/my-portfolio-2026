import { FaEllipsisH } from "react-icons/fa";

const separatorStyling = `flex-1 h-0.5 w-[25%] rounded-2xl bg-muted opacity-50`

export function Separator() {
  return (
    <div className="my-4 flex items-center gap-5">
      <div className={separatorStyling} />
      <FaEllipsisH className="text-secondary" />
      <div className={separatorStyling} />
    </div>
  );
}
