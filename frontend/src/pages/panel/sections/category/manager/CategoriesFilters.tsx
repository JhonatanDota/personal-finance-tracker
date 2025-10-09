import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CategoryFilterSchemaType,
  categoryFilterSchemaData,
} from "../../../filters/schemas/categoryFiltersSchema";

import { categoryTypeOptions } from "../../../../../utils/categoryLabels";

import InputContainer from "../../../components/inputs/InputContainer";
import Label from "../../../components/inputs/Label";
import TextInput from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";

type CategoriesFiltersProps = {
  setFilters: (filters: {}) => void;
};

export default function CategoriesFilters(props: CategoriesFiltersProps) {
  const { setFilters } = props;

  const { register, control, watch } = useForm<CategoryFilterSchemaType>({
    resolver: zodResolver(categoryFilterSchemaData),
  });

  const { name, type } = watch();

  useEffect(() => {
    setFilters({ name, type });
  }, [name, type]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <InputContainer>
        <Label text="Nome" />
        <TextInput register={register("name")} placeholder="Buscar por nome" />
      </InputContainer>

      <InputContainer>
        <Label text="Tipo" />
        <SelectInput
          control={control}
          name="type"
          placeholder="Buscar por tipo"
          options={categoryTypeOptions}
        />
      </InputContainer>
    </div>
  );
}
