import { Controller, Control } from "react-hook-form";
import { pt } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { parseDate, toISOString, toISOStringBr } from "../../../../utils/date";

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
        const valueIso = value ? parseDate(value) : undefined;

        return (
          <Popover
            trigger={
              <button type="button" className="input">
                {valueIso ? toISOStringBr(valueIso) : placeholder}
              </button>
            }
            content={
              <div className="flex flex-col p-1 bg-primary border-[1px] border-secondary rounded-md">
                <DayPicker
                  mode="single"
                  locale={pt}
                  defaultMonth={value ? parseDate(value) : undefined}
                  selected={valueIso}
                  className="text-primary-text p-2"
                  classNames={{
                    today: "border-success",
                    selected: "bg-success rounded-lg",
                    chevron: "fill-tertiary",
                  }}
                  onSelect={(date: Date | undefined) =>
                    field.onChange(date ? toISOString(date) : undefined)
                  }
                />

                <button
                  type="button"
                  className="m-1 text-error font-bold text-sm self-end"
                  onClick={() => {
                    field.onChange(undefined);
                  }}
                >
                  Limpar data
                </button>
              </div>
            }
          />
        );
      }}
    />
  );
}
