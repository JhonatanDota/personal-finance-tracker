import { useState } from "react";
import { Popover as BasePopover, PopoverPosition } from "react-tiny-popover";

type PopoverProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  positions?: PopoverPosition[];
};

export default function Popover(props: PopoverProps) {
  const { trigger, content, positions = ["bottom", "top"] } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BasePopover
      isOpen={isOpen}
      positions={positions}
      containerClassName="p-3"
      onClickOutside={() => setIsOpen(false)}
      content={content}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
    </BasePopover>
  );
}
