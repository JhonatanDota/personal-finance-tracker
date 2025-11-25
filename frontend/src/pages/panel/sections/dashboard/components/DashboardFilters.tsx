import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMonth, endOfMonth, format } from "date-fns";

import {
  DashboardFilterSchemaType,
  dashboardFilterSchemaData,
} from "../../../filters/schemas/dashboardFiltersSchema";

import InputContainer from "../../../components/inputs/InputContainer";
import Label from "../../../components/inputs/Label";
import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";
import { MdOutlineFilterList } from "react-icons/md";
import DateInput from "../../../components/inputs/DateInput";

type DashboardFiltersProps = {
  setFilters: (filters: {}) => void;
};

export default function DashboardFilters(props: DashboardFiltersProps) {
  const { setFilters } = props;

  const { control, watch, reset } = useForm<DashboardFilterSchemaType>({
    resolver: zodResolver(dashboardFilterSchemaData),
  });

  useEffect(() => {
    reset({
      dateGe: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      dateLe: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    });
  }, [reset]);

  const { dateGe, dateLe } = watch();

  useEffect(() => {
    setFilters({ dateGe, dateLe });
  }, [dateGe, dateLe]);

  return (
    <SectionCard>
      <SectionCardTitle
        icon={<MdOutlineFilterList className="w-6 h-6 text-success" />}
        title="Filtros"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputContainer>
          <Label text="Data Inicial" />
          <DateInput
            placeholder="Selecione uma data"
            name="dateGe"
            control={control}
          />
        </InputContainer>

        <InputContainer>
          <Label text="Data Final" />
          <DateInput
            placeholder="Selecione uma data"
            name="dateLe"
            control={control}
          />
        </InputContainer>
      </div>
    </SectionCard>
  );
}
