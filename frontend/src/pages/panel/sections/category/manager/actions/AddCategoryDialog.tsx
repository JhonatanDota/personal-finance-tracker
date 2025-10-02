import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { handleErrors } from "../../../../../../requests/handleErrors";

import { addCategory } from "../../../../../../requests/categoryRequests";

import { CategoryModel } from "../../../../../../models/categoryModels";

import {
  CategorySchemaType,
  categorySchemaData,
} from "../../../../forms/schemas/categorySchema";

import { categoryTypeOptions } from "../../../../../../utils/categoryLabels";

import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";

type AddCategoryDialogProps = {
  close: () => void;
  onAdd: (category: CategoryModel) => void;
};

export default function AddCategoryDialog(props: AddCategoryDialogProps) {
  const { close, onAdd } = props;

  const [adding, setAdding] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchemaData),
  });

  async function onSubmit(data: CategorySchemaType): Promise<void> {
    setAdding(true);

    try {
      const response = await addCategory(data);

      reset();
      onAdd(response.data);
      toast.success("Categoria adicionada com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setAdding(false);
    }
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Adicionar Categoria" />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register("name")}
          error={errors.name?.message}
          label="Nome"
          placeholder="Digite o nome da Categoria"
          required={register("name").required}
        />

        <SelectInput
          control={control}
          name="type"
          label="Tipo"
          options={categoryTypeOptions}
          error={errors.type?.message}
        />

        <div className="actions-buttons-container">
          <button
            disabled={adding}
            type="submit"
            className="button-action col-span-2"
          >
            Adicionar
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
