import SectionContainer from "../../../components/section/SectionContainer";
import SectionTitle from "../../../components/section/SectionTitle";
import SectionSubtitle from "../../../components/section/SectionSubtitle";

import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";

import { TiPlusOutline } from "react-icons/ti";

import AddTransactionForm from "./AddTransactionForm";

export default function TransactionsManager() {
  return (
    <SectionContainer>
      <SectionTitle title="Transações" />
      <SectionSubtitle title="Adicione, visualize e gerencie todas as suas transações financeiras" />

      <SectionCard>
        <SectionCardTitle
          icon={<TiPlusOutline className="w-6 h-6 text-success" />}
          title="Nova Transação"
        />
        <AddTransactionForm />
      </SectionCard>
    </SectionContainer>
  );
}
