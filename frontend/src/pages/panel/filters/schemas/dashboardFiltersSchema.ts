import { z } from "zod";

export const dashboardFilterSchemaData = z.object({
  dateGe: z.iso.date().optional(),
  dateLe: z.iso.date().optional(),
});

export type DashboardFilterSchemaType = z.infer<
  typeof dashboardFilterSchemaData
>;
