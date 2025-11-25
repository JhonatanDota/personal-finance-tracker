import { useState } from "react";

import Summary from "./Summary";
import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";
import DashboardFilters from "./components/DashboardFilters";

export default function Dashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <SectionContainer>
      <SectionTitle title="Dashboard" />
      <DashboardFilters setFilters={setFilters} />
      <Summary filters={filters} />
    </SectionContainer>
  );
}
