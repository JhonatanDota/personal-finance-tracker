import toast from "react-hot-toast";

import { deleteCategory } from "../../../../../../requests/categoryRequests";

import { handleErrors } from "../../../../../../requests/handleErrors";

import { CategoryModel } from "../../../../../../models/categoryModels";

import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

type DeleteCategoryDialogProps = {
  category: CategoryModel;
  onDelete: (category: CategoryModel) => void;
  close: () => void;
};

export default function DeleteCategoryDialog(props: DeleteCategoryDialogProps) {
  const { category, onDelete, close } = props;

  async function handleDeleteCategory() {
    try {
      await deleteCategory(category);

      close();
      onDelete(category);
      toast.success("Categoria excluida com sucesso!");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Excluir Categoria" />

      <p className="text-sm md:text-base text-secondary-text">
        Ao remover a categoria{" "}
        <span className="font-bold text-primary-text">{category.name}</span>,
        todas as transações referentes a ela também serão excluidas, tem certeza
        de que deseja prosseguir?
      </p>

      <div className="actions-buttons-container">
        <button
          onClick={handleDeleteCategory}
          className="button-action col-span-2"
        >
          Confirmar
        </button>

        <button onClick={close} className="button-cancel-action">
          Cancelar
        </button>
      </div>
    </Dialog>
  );
}
