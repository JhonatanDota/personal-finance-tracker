import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCategories } from "../../../../../requests/categoryRequests";
import { addTransaction } from "../../../../../requests/transactionRequests";
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

type AddTransactionFormProps = {
  onAdd: () => void;
};

export default function AddTransactionForm(props: AddTransactionFormProps) {
  const { onAdd } = props;

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
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

    resetField("categoryId");
  }, [categoryType, categories]);

  async function onSubmit(data: TransactionSchemaType): Promise<void> {
    try {
      await addTransaction(data);

      onAdd();
      toast.success("Transação adicionada com sucesso!");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <SelectInput
          register={register("type")}
          label="Tipo"
          options={categoryTypeOptions}
          error={errors.type?.message}
          showEmptyOption={false}
        />

        <SelectInput
          register={register("categoryId", { valueAsNumber: true })}
          label="Categoria"
          options={categoriesOptions}
          error={errors.categoryId?.message}
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
          control={control}
          name={register("value").name}
          error={errors.value?.message}
          label="Valor"
          placeholder="Informe o valor da Transação"
          required={register("value").required}
        />

        <DateInput
          label="Data"
          placeholder="Selecione uma data"
          name="date"
          control={control}
          error={errors.date?.message}
        />

        <TextAreaInput
          register={register("description")}
          error={errors.description?.message}
          label="Descrição (opcional)"
          placeholder="Descreva a transação"
          required={register("description").required}
          rows={3}
        />
      </div>

      <button className="button-action" type="submit">
        Adicionar
      </button>
    </form>
  );
}
