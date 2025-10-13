import { format, parseISO } from "date-fns";

export function parseDate(date: string): Date {
  return parseISO(date);
}

export function toISOString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function toISOStringBr(date: Date): string {
  return format(date, "dd/MM/yyyy");
}
