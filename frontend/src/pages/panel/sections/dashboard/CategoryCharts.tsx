import { pieMonetaryOptions } from "./components/charts/options";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

import { useStatisticsByCategory } from "../../hooks/useStatisticsByCategory";

import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

import PieChart from "./components/charts/pie/PieChart";
import PieChartLoader from "./components/charts/pie/PieChartLoader";
import NoData from "./components/charts/pie/NoData";

import SectionCard from "../../components/section/SectionCard";
import SectionCardTitle from "../../components/section/SectionCardTitle";

type CategoryChartsProps = {
  filters: Record<string, string>;
};

export default function CategoryCharts(props: CategoryChartsProps) {
  const { filters } = props;
  const { data = [], isFetching } = useStatisticsByCategory(filters);

  const incomeData = buildData(CategoryTypeEnum.INCOME);
  const expenseData = buildData(CategoryTypeEnum.EXPENSE);

  function buildData(categoryType: CategoryTypeEnum) {
    const categoryStatistics = data.filter(
      (category) => category.type === categoryType
    );

    return {
      labels: categoryStatistics.map((category) => category.name),
      datasets: [
        {
          data: categoryStatistics.map((category) => category.total),
        },
      ],
    };
  }

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <SectionCard>
        <SectionCardTitle
          icon={<HiOutlineArrowTrendingUp />}
          title="Receitas por categoria"
        />

        {isFetching ? (
          <PieChartLoader />
        ) : incomeData.labels.length ? (
          <PieChart
            data={buildData(CategoryTypeEnum.INCOME)}
            options={pieMonetaryOptions}
          />
        ) : (
          <NoData />
        )}
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<HiOutlineArrowTrendingDown />}
          title="Despesas por categoria"
        />

        {isFetching ? (
          <PieChartLoader />
        ) : expenseData.labels.length ? (
          <PieChart
            data={buildData(CategoryTypeEnum.EXPENSE)}
            options={pieMonetaryOptions}
          />
        ) : (
          <NoData />
        )}
      </SectionCard>
    </div>
  );
}
