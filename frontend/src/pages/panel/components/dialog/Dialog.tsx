import { RiCloseLargeFill } from "react-icons/ri";

type DialogProps = {
  children: React.ReactNode;
  close: () => void;
};

export function Dialog(props: DialogProps) {
  const { children, close } = props;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="absolute inset-0 bg-muted" onClick={close} />

      <div className="relative flex flex-col gap-3 w-full max-w-lg z-10 bg-primary border-[1px] border-secondary rounded-md p-6 shadow-lg">
        <button
          onClick={close}
          className="absolute right-4 top-4 opacity-80 hover:opacity-100 text-primary-text font-bold"
        >
          <RiCloseLargeFill />
        </button>

        {children}
      </div>
    </div>
  );
}
