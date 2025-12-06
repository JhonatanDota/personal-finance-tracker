import { useQuery } from "@tanstack/react-query";

import { getStatisticsByCategory } from "../../../requests/statisticRequests";
import { handleErrors } from "../../../requests/handleErrors";

import { PIE_CHART_DELAY } from "../../../constants/delay";

export const queryKey = "statisticsByCategory";

export function useStatisticsByCategory(filters: Record<string, string>) {
  return useQuery({
    queryKey: [queryKey, filters],
    queryFn: async () => {
      try {
        const [response] = await Promise.all([
          getStatisticsByCategory(filters),
          new Promise((resolve) => setTimeout(resolve, PIE_CHART_DELAY)),
        ]);

        return response.data;
      } catch (error) {
        handleErrors(error);
      }
    },
  });
}
