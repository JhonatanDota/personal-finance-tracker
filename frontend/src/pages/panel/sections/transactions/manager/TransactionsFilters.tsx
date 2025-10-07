import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDebounce } from "../../../../../hooks/useDebounce";

import { CategoryModel } from "../../../../../models/categoryModels";
import { PaginationParams } from "../../../../../types/pagination";
import FilterOption from "../../../../../types/filterOption";

import {
  TransactionFilterSchemaType,
  transactionFilterSchemaData,
} from "../../../filters/schemas/transactionFiltersSchema";

import Label from "../../../components/inputs/Label";
import InputContainer from "../../../components/inputs/InputContainer";

import TextInput from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";

import { FilterBadges } from "../../../components/filter/FilterBadge";

type TransactionsFiltersProps = {
  categories: CategoryModel[];
  setFilters: (filters: PaginationParams) => void;
};

export default function TransactionsFilters(props: TransactionsFiltersProps) {
  const { categories, setFilters: setFiltersBase } = props;

  const [filtersOptions, setFiltersOptions] = useState<FilterOption[]>([]);

  const { register, control, watch } = useForm<TransactionFilterSchemaType>({
    resolver: zodResolver(transactionFilterSchemaData),
    defaultValues: {
      name: "",
      categoryId: undefined,
    },
  });

  const { name, categoryId } = watch();
  const debouncedName = useDebounce(name);

  function setFilters() {
    setFiltersBase({
      name: debouncedName,
      categoryId,
    });

    setFiltersOptions(filterOptionsBuilder);
  }

  function filterOptionsBuilder() {
    const category = categories.find((category) => category.id === categoryId);

    const options = [
      debouncedName && {
        label: "Nome",
        value: debouncedName,
      },
      category && {
        label: "Categoria",
        value: category.name,
      },
    ].filter(Boolean);

    return options as FilterOption[];
  }

  useEffect(() => {
    setFilters();
  }, [debouncedName, categoryId]);

  return (
    <>
      <FilterBadges filters={filtersOptions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputContainer>
          <Label text="Nome" />
          <TextInput
            register={register("name")}
            placeholder="Buscar por nome"
          />
        </InputContainer>

        <InputContainer>
          <Label text="Categoria" />

          <SelectInput
            control={control}
            name="categoryId"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </InputContainer>
      </div>
    </>
  );
}
