import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { updateTransaction } from "../../../../../../requests/transactionRequests";
import { handleErrors } from "../../../../../../requests/handleErrors";

import {
  TransactionSchemaType,
  transactionSchemaData,
} from "../../../../forms/schemas/transactionSchema";

import { CategoryModel } from "../../../../../../models/categoryModels";
import { TransactionModel } from "../../../../../../models/transactionModels";
import Option from "../../../../../../types/option";

import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";
import InputContainer from "../../../../components/inputs/InputContainer";
import Label from "../../../../components/inputs/Label";
import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";
import DateInput from "../../../../components/inputs/DateInput";
import MoneyInput from "../../../../components/inputs/MoneyInput";
import TextAreaInput from "../../../../components/inputs/TextAreaInput";
import ErrorMessage from "../../../../components/inputs/ErrorMessage";

type UpdateTransactionDialogProps = {
  categories: CategoryModel[];
  transaction: TransactionModel;
  onUpdate: (transaction: TransactionModel) => void;
  close: () => void;
};

export default function UpdateTransactionDialog(
  props: UpdateTransactionDialogProps
) {
  const { categories, transaction, onUpdate, close } = props;

  const [categoriesOptions, _] = useState<Option[]>(
    categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchemaData),
    defaultValues: transaction,
  });

  async function onSubmit(data: TransactionSchemaType): Promise<void> {
    try {
      const response = await updateTransaction(transaction.id, data);

      onUpdate(response.data);
      close();
      toast.success("Transação atualizada com sucesso!");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Editar Transação" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label text="Categoria" />

          <SelectInput
            control={control}
            name="categoryId"
            options={categoriesOptions}
            allowClear={false}
          />
          {errors.categoryId?.message && (
            <ErrorMessage message={errors.categoryId.message} />
          )}
        </InputContainer>

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
        </div>

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
          <Label text="Descrição" required={false} />
          <TextAreaInput
            register={register("description")}
            placeholder="Descreva a transação"
            rows={3}
          />
          {errors.description?.message && (
            <ErrorMessage message={errors.description.message} />
          )}
        </InputContainer>

        <div className="actions-buttons-container">
          <button type="submit" className="button-action col-span-2">
            Atualizar
          </button>

          <button
            onClick={close}
            type="button"
            className="button-cancel-action"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
