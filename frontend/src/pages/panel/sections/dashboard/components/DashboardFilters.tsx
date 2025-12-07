import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

import {
  toISOStringBr,
  toISOString,
  parseDate,
} from "../../../../../utils/date";

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

import FilterPick from "../../../components/filter/FilterPick";
import { FilterBadges } from "../../../components/filter/FilterBadge";

type DashboardFiltersProps = {
  setFilters: (filters: {}) => void;
};

export default function DashboardFilters(props: DashboardFiltersProps) {
  const { setFilters } = props;

  const { control, watch, reset } = useForm<DashboardFilterSchemaType>({
    resolver: zodResolver(dashboardFilterSchemaData),
  });

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

  function setCurrentWeekFilter(): void {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    reset({
      dateGe: toISOString(start),
      dateLe: toISOString(end),
    });
  }

  function setCurrentMonthFilter(): void {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    reset({
      dateGe: toISOString(start),
      dateLe: toISOString(end),
    });
  }

  function setCurrentYearFilter(): void {
    const today = new Date();
    const start = startOfYear(today);
    const end = endOfYear(today);

    reset({
      dateGe: toISOString(start),
      dateLe: toISOString(end),
    });
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

      <div className="flex gap-2">
        <FilterPick label="Esta semana" action={setCurrentWeekFilter} />
        <FilterPick label="Este mês" action={setCurrentMonthFilter} />
        <FilterPick label="Este ano" action={setCurrentYearFilter} />
        <FilterPick label="Limpar filtros" action={reset} />
      </div>
    </SectionCard>
  );
}
