import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCategories } from "../../../../../requests/categoryRequests";
import { handleErrors } from "../../../../../requests/handleErrors";

import { categoryTypeOptions } from "../../../../../utils/categoryLabels";

import Option from "../../../../../types/option";

import {
  TransactionSchemaType,
  transactionSchemaData,
} from "../../../forms/schemas/transactionSchema";

import { CategoryModel } from "../../../../../models/categoryModels";

import TextInput from "../../../components/inputs/TextInput";
import DateInput from "../../../components/inputs/DateInput";
import MoneyInput from "../../../components/inputs/MoneyInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextAreaInput from "../../../components/inputs/TextAreaInput";

export default function AddTransactionForm() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchemaData),
  });

  const categoryType = watch("type");

  async function fetchCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      handleErrors(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredCategories = categories.filter(
      (category) => category.type === categoryType
    );

    setCategoriesOptions(
      filteredCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }))
    );
  }, [categoryType, categories]);

  async function onSubmit(data: TransactionSchemaType): Promise<void> {}

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <SelectInput
          register={register("type")}
          label="Tipo"
          options={categoryTypeOptions}
          error={errors.category?.message}
        />

        <SelectInput
          register={register("category")}
          label="Categoria"
          options={categoriesOptions}
          error={errors.category?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TextInput
          register={register("name")}
          error={errors.name?.message}
          label="Nome"
          placeholder="Digite o nome da Transação"
          required={register("name").required}
        />

        <MoneyInput
          register={register("value")}
          error={errors.value?.message}
          label="Valor"
          placeholder="Informe o valor da Transação"
          required={register("value").required}
        />

        <DateInput
          register={register("date")}
          error={errors.date?.message}
          label="Data"
          required={register("date").required}
        />

        <TextAreaInput
          register={register("description")}
          error={errors.description?.message}
          label="Descrição"
          placeholder="Descreva a transação"
          required={register("description").required}
          rows={3}
        />
      </div>
    </form>
  );
}
