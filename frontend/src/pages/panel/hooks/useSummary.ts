import { useQuery } from "@tanstack/react-query";

import { getSummary } from "../../../requests/statisticRequests";
import { handleErrors } from "../../../requests/handleErrors";

import { SUMMARY_DELAY } from "../../../constants/delay";

export const queryKey = "summary";

export function useSummary(filters: Record<string, string>) {
  return useQuery({
    queryKey: [queryKey, filters],
    queryFn: async () => {
      try {
        const [response] = await Promise.all([
          getSummary(filters),
          new Promise((resolve) => setTimeout(resolve, SUMMARY_DELAY)),
        ]);

        return response.data;
      } catch (error) {
        handleErrors(error);
      }
    },
    refetchOnWindowFocus: false,
  });
}
