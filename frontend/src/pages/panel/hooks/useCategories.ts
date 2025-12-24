import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../../../requests/categoryRequests";
import { handleErrors } from "../../../requests/handleErrors";

import { TABLE_PAGINATION_DELAY_MS } from "../../../constants/delay";

export const queryKey = "categories";

export function useCategories(options?: {
  filters?: Record<string, any>;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [queryKey, options?.filters],
    queryFn: async () => {
      try {
        const [response] = await Promise.all([
          getCategories(options?.filters),
          new Promise((resolve) =>
            setTimeout(resolve, TABLE_PAGINATION_DELAY_MS)
          ),
        ]);

        return response.data;
      } catch (error) {
        handleErrors(error);
      }
    },
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: false,
  });
}
