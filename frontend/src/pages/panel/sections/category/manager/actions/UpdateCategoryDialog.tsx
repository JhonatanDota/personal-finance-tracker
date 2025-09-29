import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { handleErrors } from "../../../../../../requests/handleErrors";

import { updateCategory } from "../../../../../../requests/categoryRequests";

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

type UpdateCategoryDialogProps = {
  close: () => void;
  category: CategoryModel;
  onUpdate: (category: CategoryModel) => void;
};

export default function UpdateCategoryDialog(props: UpdateCategoryDialogProps) {
  const { close, category, onUpdate } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchemaData),
    defaultValues: category,
  });

  async function onSubmit(data: CategorySchemaType): Promise<void> {
    try {
      const response = await updateCategory(category.id, data);

      onUpdate(response.data);
      toast.success("Categoria atualizada com sucesso!");
      close();
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Editar Categoria" />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register("name")}
          error={errors.name?.message}
          label="Nome"
          placeholder="Digite o nome da Categoria"
          required={register("name").required}
        />

        <SelectInput
          register={register("type")}
          label="Tipo"
          options={categoryTypeOptions}
          error={errors.type?.message}
        />

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
