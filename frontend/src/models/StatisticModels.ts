export type SummaryModel = {
  count: number;
  total: number;
};

export type SummaryResponse = Record<"income" | "expense", SummaryModel>;
