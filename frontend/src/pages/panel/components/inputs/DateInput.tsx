import { useState } from "react";
import { Controller, Control, ControllerRenderProps } from "react-hook-form";

import { DayPicker } from "react-day-picker";
import Popover from "../popover/Popover";
import { pt } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface DateInputProps {
  label: string;
  placeholder?: string;
  name: string;
  control: Control<any>;
  error?: string;
}

export default function DateInput({
  label,
  placeholder,
  name,
  control,
  error,
}: DateInputProps) {
  const [selected, setSelected] = useState<Date>();

  function onSelect(date: Date | undefined, field: ControllerRenderProps) {
    setSelected(date);
    field.onChange(date ? date.toISOString().split("T")[0] : "");
  }

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover
            trigger={
              <button type="button" className="input">
                {selected ? selected.toLocaleDateString() : placeholder}
              </button>
            }
            content={
              <DayPicker
                mode="single"
                locale={pt}
                selected={selected}
                className="bg-primary border-[1px] border-secondary text-primary-text p-2 rounded-md"
                classNames={{
                  today: "border-success",
                  selected: "bg-success rounded-lg",
                  chevron: "fill-tertiary",
                }}
                onSelect={(date: Date | undefined) => onSelect(date, field)}
              />
            }
          />
        )}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
