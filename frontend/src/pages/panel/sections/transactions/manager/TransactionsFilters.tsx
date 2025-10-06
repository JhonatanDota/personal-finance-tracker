import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDebounce } from "../../../../../hooks/useDebounce";

import { CategoryModel } from "../../../../../models/categoryModels";
import { PaginationParams } from "../../../../../types/pagination";

import {
  TransactionFilterSchemaType,
  transactionFilterSchemaData,
} from "../../../filters/schemas/transactionFiltersSchema";

import Label from "../../../components/inputs/Label";
import InputContainer from "../../../components/inputs/InputContainer";

import TextInput from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";

type TransactionsFiltersProps = {
  categories: CategoryModel[];
  setFilters: (filters: PaginationParams) => void;
};

export default function TransactionsFilters(props: TransactionsFiltersProps) {
  const { setFilters } = props;
  const { register, control, watch } = useForm<TransactionFilterSchemaType>({
    resolver: zodResolver(transactionFilterSchemaData),
  });

  const { name, categoryId } = watch();
  const debouncedName = useDebounce(name);

  useEffect(() => {
    setFilters({
      name: debouncedName,
      categoryId,
    });
  }, [debouncedName]);

  useEffect(() => {
    setFilters({
      name: debouncedName,
      categoryId,
    });
  }, [categoryId]);

  return (
    <>
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
            options={props.categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </InputContainer>
      </div>
    </>
  );
}
