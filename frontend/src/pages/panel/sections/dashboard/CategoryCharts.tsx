import { useState, useEffect } from "react";

import { pieMonetaryOptions } from "./components/charts/options";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

import { ByCategoryModel } from "../../../../models/StatisticModels";

import { getStatisticsByCategory } from "../../../../requests/statisticRequests";
import { handleErrors } from "../../../../requests/handleErrors";

import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

import PieChart from "./components/charts/PieChart";
import SectionCard from "../../components/section/SectionCard";
import SectionCardTitle from "../../components/section/SectionCardTitle";

type CategoryChartsProps = {
  filters: Record<string, string>;
};

export default function CategoryCharts(props: CategoryChartsProps) {
  const { filters } = props;

  const [byCategoryStatistics, setByCategoryStatistics] = useState<
    ByCategoryModel[]
  >([]);

  async function fetchByCategoryStatistics() {
    try {
      const response = await getStatisticsByCategory(filters);
      setByCategoryStatistics(response.data);
    } catch (error) {
      handleErrors(error);
    }
  }

  function buildData(categoryType: CategoryTypeEnum) {
    const categoryStatistics = byCategoryStatistics.filter(
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

  useEffect(() => {
    fetchByCategoryStatistics();
  }, [filters]);

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <SectionCard>
        <SectionCardTitle
          icon={<HiOutlineArrowTrendingUp />}
          title="Receitas por categoria"
        />
        <PieChart
          data={buildData(CategoryTypeEnum.INCOME)}
          options={pieMonetaryOptions}
        />
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<HiOutlineArrowTrendingDown />}
          title="Despesas por categoria"
        />

        <PieChart
          data={buildData(CategoryTypeEnum.EXPENSE)}
          options={pieMonetaryOptions}
        />
      </SectionCard>
    </div>
  );
}
