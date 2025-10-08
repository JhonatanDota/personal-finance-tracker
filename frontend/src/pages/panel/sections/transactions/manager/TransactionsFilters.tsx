import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const isFirstRender = useRef(true);

  const { categories, setFilters: setFiltersBase } = props;

  const [filtersOptions, setFiltersOptions] = useState<FilterOption[]>([]);

  const { register, control, watch, reset } =
    useForm<TransactionFilterSchemaType>({
      resolver: zodResolver(transactionFilterSchemaData),
      defaultValues: {
        name: "",
        categoryId: undefined,
      },
    });

  const { name, categoryId } = watch();

  function setFilters() {
    const filters: PaginationParams = {};

    if (name.trim()) {
      filters.name = name.trim();
    }

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    setFiltersBase(filters);
    setFiltersOptions(filterOptionsBuilder);
  }

  function filterOptionsBuilder() {
    const category = categories.find((category) => category.id === categoryId);

    const options = [
      name && {
        label: "Nome",
        value: name,
      },
      category && {
        label: "Categoria",
        value: category.name,
      },
    ].filter(Boolean);

    return options as FilterOption[];
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setFilters();
  }, [name, categoryId]);

  return (
    <>
      {filtersOptions.length > 0 && (
        <div className="flex justify-between">
          <FilterBadges filters={filtersOptions} />

          <button onClick={() => reset()} className="button-cancel-action">
            Limpar Filtros
          </button>
        </div>
      )}

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
