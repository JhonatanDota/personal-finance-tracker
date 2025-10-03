import { Controller, Control } from "react-hook-form";
import { pt } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { parseISO } from "date-fns";
import { toISOString, toISOStringBr } from "../../../../utils/date";

import { DayPicker } from "react-day-picker";
import Popover from "../popover/Popover";

interface DateInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export default function DateInput(props: DateInputProps) {
  const { name, control, placeholder } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value: string | undefined = field.value;
        const valueIso = value ? parseISO(value) : undefined;

        return (
          <Popover
            trigger={
              <button type="button" className="input">
                {valueIso ? toISOStringBr(valueIso) : placeholder}
              </button>
            }
            content={
              <DayPicker
                mode="single"
                locale={pt}
                selected={valueIso}
                className="bg-primary border-[1px] border-secondary text-primary-text p-2 rounded-md"
                classNames={{
                  today: "border-success",
                  selected: "bg-success rounded-lg",
                  chevron: "fill-tertiary",
                }}
                onSelect={(date: Date | undefined) =>
                  field.onChange(date ? toISOString(date) : undefined)
                }
              />
            }
          />
        );
      }}
    />
  );
}
