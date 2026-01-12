import { HiOutlineInbox } from "react-icons/hi";

interface NoDataProps {
  message?: string;
}

export default function NoData(props: NoDataProps) {
  const { message = "Sem dados disponíveis" } = props;

  return (
    <div className="flex flex-col p-6 items-center m-auto text-secondary-text gap-2">
      <HiOutlineInbox className="text-3xl md:text-4xl" />
      <p className="text-sm md:text-base">{message}</p>
    </div>
  );
}
