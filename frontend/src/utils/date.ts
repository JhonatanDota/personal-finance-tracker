import { format, parseISO } from "date-fns";

export function toISOString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function toISOStringBr(date: Date): string {
  return format(date, "dd/MM/yyyy");
}
