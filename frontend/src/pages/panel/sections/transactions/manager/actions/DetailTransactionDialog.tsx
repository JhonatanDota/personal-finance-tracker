import { formatCurrencyBRL } from "../../../../../../utils/monetary";
import { parseDate, toISOStringBr } from "../../../../../../utils/date";
import { transactionValueColor } from "../../../../../../utils/colors";

import { CategoryModel } from "../../../../../../models/categoryModels";
import { TransactionModel } from "../../../../../../models/transactionModels";

import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

import CategoryTag from "../../../category/CategoryTag";
import CategoryTypeTag from "../../../category/CategoryTypeTag";

import InputContainer from "../../../../components/inputs/InputContainer";
import Label from "../../../../components/inputs/Label";

type DetailTransactionDialogProps = {
  transaction: TransactionModel;
  category: CategoryModel;
  close: () => void;
};

export default function DetailTransactionDialog(
  props: DetailTransactionDialogProps
) {
  const { transaction, category, close } = props;

  return (
    <Dialog close={close}>
      <DialogTitle title="Detalhes da Transação" />

      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <InputContainer>
            <Label text="Tipo" />
            <div>
              <CategoryTypeTag type={transaction.type} />
            </div>
          </InputContainer>

          <InputContainer>
            <Label text="Categoria" />
            <div>
              <CategoryTag name={category.name} />
            </div>
          </InputContainer>
        </div>

        <InputContainer>
          <Label text="Nome" />
          <span className="text-sm font-bold text-primary-text">
            {transaction.name}
          </span>
        </InputContainer>

        <InputContainer>
          <Label text="Data" />
          <span className="text-sm font-bold text-primary-text">
            {toISOStringBr(parseDate(transaction.date))}
          </span>
        </InputContainer>

        <InputContainer>
          <Label text="Valor" />
          <span
            className={`text-sm font-bold ${transactionValueColor(
              transaction
            )}`}
          >
            {formatCurrencyBRL(transaction.value)}
          </span>
        </InputContainer>

        <InputContainer>
          <Label text="Descrição" />
          <span className="text-sm font-bold text-primary-text">
            {transaction.description ?? "-"}
          </span>
        </InputContainer>
      </div>
    </Dialog>
  );
}
