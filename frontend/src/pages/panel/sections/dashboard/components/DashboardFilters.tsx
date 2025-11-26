import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMonth, endOfMonth, format } from "date-fns";

import { toISOStringBr, parseDate } from "../../../../../utils/date";

import {
  DashboardFilterSchemaType,
  dashboardFilterSchemaData,
} from "../../../filters/schemas/dashboardFiltersSchema";

import FilterOption from "../../../../../types/filterOption";

import { MdOutlineFilterList } from "react-icons/md";

import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";

import Label from "../../../components/inputs/Label";
import DateInput from "../../../components/inputs/DateInput";
import InputContainer from "../../../components/inputs/InputContainer";

import { FilterBadges } from "../../../components/filter/FilterBadge";

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

  function filterOptionsBuilder(): FilterOption[] {
    const options = [
      dateGe && {
        label: "Data Inicial",
        value: toISOStringBr(parseDate(dateGe)),
      },
      dateLe && {
        label: "Data Final",
        value: toISOStringBr(parseDate(dateLe)),
      },
    ].filter(Boolean);

    return options as FilterOption[];
  }

  return (
    <SectionCard>
      <SectionCardTitle
        icon={<MdOutlineFilterList className="w-6 h-6 text-success" />}
        title="Filtros"
      />

      <FilterBadges filters={filterOptionsBuilder()} />

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
