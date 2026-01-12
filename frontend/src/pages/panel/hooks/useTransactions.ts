import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "../../../requests/transactionRequests";
import { handleErrors } from "../../../requests/handleErrors";

import { SUMMARY_DELAY } from "../../../constants/delay";

export const queryKey = "transactions";

export function useTransactions(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const [response] = await Promise.all([
          getTransactions(params),
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
