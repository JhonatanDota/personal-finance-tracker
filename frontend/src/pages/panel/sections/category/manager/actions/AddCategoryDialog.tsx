import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CategorySchemaType,
  categorySchemaData,
} from "../../../../forms/schemas/categorySchema";

import { categoryOptions } from "../../../../../../utils/categoryLabels";

import { Dialog } from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

import TextInput from "../../../../components/inputs/InputText";
import SelectInput from "../../../../components/inputs/SelectInput";

type AddCategoryDialogProps = {
  close: () => void;
};

export default function AddCategoryDialog(props: AddCategoryDialogProps) {
  const { close } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchemaData),
  });

  async function onSubmit(data: CategorySchemaType): Promise<void> {}

  return (
    <Dialog close={close}>
      <DialogTitle title="Adicionar Categoria" />

      <form className="panel-form" onSubmit={handleSubmit(onSubmit)}>
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
          options={categoryOptions}
          error={errors.type?.message}
        />

        <div className="panel-actions-buttons-container">
          <button type="submit" className="button-action col-span-2">
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
