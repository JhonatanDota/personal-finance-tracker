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

import Label from "../../../components/inputs/Label";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import InputContainer from "../../../components/inputs/InputContainer";

type AddTransactionFormProps = {
  categories: CategoryModel[];
  onAdd: () => void;
};

export default function AddTransactionForm(props: AddTransactionFormProps) {
  const { categories, onAdd } = props;

  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchemaData),
    defaultValues: {
      value: 0,
    },
  });

  const categoryType = watch("type");

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
      reset();
      toast.success("Transação adicionada com sucesso!");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputContainer>
          <Label text="Tipo" />
          <SelectInput
            control={control}
            name="type"
            options={categoryTypeOptions}
          />
          {errors.type?.message && (
            <ErrorMessage message={errors.type.message} />
          )}
        </InputContainer>

        <InputContainer>
          <Label text="Categoria" />
          <SelectInput
            control={control}
            name="categoryId"
            options={categoriesOptions}
          />
          {errors.categoryId?.message && (
            <ErrorMessage message={errors.categoryId.message} />
          )}
        </InputContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputContainer>
          <Label text="Nome" />
          <TextInput
            register={register("name")}
            placeholder="Digite o nome da Transação"
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}
        </InputContainer>

        <InputContainer>
          <Label text="Valor" />
          <MoneyInput
            control={control}
            name={register("value").name}
            placeholder="Informe o valor da Transação"
          />
          {errors.value?.message && (
            <ErrorMessage message={errors.value.message} />
          )}
        </InputContainer>

        <InputContainer>
          <Label text="Data" />
          <DateInput
            placeholder="Selecione uma data"
            name="date"
            control={control}
          />
          {errors.date?.message && (
            <ErrorMessage message={errors.date.message} />
          )}
        </InputContainer>

        <InputContainer>
          <Label text="Descrição" />
          <TextAreaInput
            register={register("description")}
            placeholder="Descreva a transação"
            rows={3}
          />
          {errors.description?.message && (
            <ErrorMessage message={errors.description.message} />
          )}
        </InputContainer>
      </div>

      <button className="button-action md:self-end" type="submit">
        Adicionar
      </button>
    </form>
  );
}
