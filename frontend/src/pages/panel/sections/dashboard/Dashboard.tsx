import { useState } from "react";

import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";
import DashboardFilters from "./components/DashboardFilters";

import Summary from "./Summary";
import CategoryCharts from "./CategoryCharts";

export default function Dashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <SectionContainer>
      <SectionTitle title="Dashboard" />
      <DashboardFilters setFilters={setFilters} />
      <Summary filters={filters} />
      <CategoryCharts filters={filters} />
    </SectionContainer>
  );
}
