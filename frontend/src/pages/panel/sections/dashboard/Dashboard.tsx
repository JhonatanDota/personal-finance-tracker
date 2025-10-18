import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";

import FinancialCard from "./components/FinancialCard";

export default function Dashboard() {
  return (
    <SectionContainer>
      <SectionTitle title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialCard
          title="Total Receitas"
          value={1000}
          bgColor="bg-success"
          icon={<HiArrowTrendingUp className="w-8 h-8" />}
        />
        <FinancialCard
          title="Total Despesas"
          value={500}
          bgColor="bg-error"
          icon={<HiArrowTrendingDown className="w-8 h-8" />}
        />
        <FinancialCard
          title="Saldo"
          value={500}
          bgColor="bg-tertiary"
          icon={<HiArrowTrendingUp className="w-8 h-8" />}
        />
      </div>
    </SectionContainer>
  );
}
