import { useState } from "react";

import toast from "react-hot-toast";

import { deleteTransaction } from "../../../../../../requests/transactionRequests";

import { handleErrors } from "../../../../../../requests/handleErrors";

import { TransactionModel } from "../../../../../../models/transactionModels";

import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

type DeleteTransactionDialogProps = {
  transaction: TransactionModel;
  onDelete: (transaction: TransactionModel) => void;
  close: () => void;
};

export default function DeleteTransactionDialog(
  props: DeleteTransactionDialogProps
) {
  const { transaction, onDelete, close } = props;

  const [deleting, setDeleting] = useState(false);

  async function handleDeleteTransaction() {
    setDeleting(true);

    try {
      await deleteTransaction(transaction);

      close();
      onDelete(transaction);
      toast.success("Transação excluida com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Excluir Transação" />

      <p className="text-sm md:text-base text-secondary-text">
        Tem certeza de que deseja remover a transação{" "}
        <span className="font-bold text-primary-text">{transaction.name}</span>?
      </p>

      <div className="actions-buttons-container">
        <button
          disabled={deleting}
          onClick={handleDeleteTransaction}
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
