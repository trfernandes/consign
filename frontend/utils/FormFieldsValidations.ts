import {
  CPF_INVALIDO_MESSAGE,
  DATE_SHOULD_SAME_AFTER,
  DATE_SHOULD_SAME_BEFORE,
  EMAIL_INVALIDO_MESSAGE,
  INVALID_DATE_MESSAGE,
} from "./FormConstantsAndTypes";
import { isValidCPF } from "./validations";
import moment from "moment";

export function isValidCpf(value: string): string | boolean {
  if (value === undefined || value.trim() === "") return true;
  if (value.length < 14) return true;
  return isValidCPF(value) || CPF_INVALIDO_MESSAGE;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidMail(value: string): string | boolean {
  if (value === undefined || value.trim() === "") return true;
  return emailRegex.test(value) || EMAIL_INVALIDO_MESSAGE;
}

export function isValidPhone(value: string): string | boolean {
  if (value === undefined || value.trim() === "") return true;
  return value.replace(/\D/g, "").trim().length < 11 || "Um número de telefone/celular deve ter 11 dígitos";
}

export function isValidDate(value: string): string | boolean {
  return moment(value, "DD/MM/YYYY", true).isValid() || INVALID_DATE_MESSAGE;
}

export function isDateSameOrBefore(value: string, date: Date, message?: string): string | boolean {
  return moment(value, "DD/MM/YYYY").isSameOrBefore(date) || DATE_SHOULD_SAME_BEFORE.replace("#VALUE", message);
}

export function isDateSameOrAfter(value: string, date: Date, message?: string): string | boolean {
  return moment(value, "DD/MM/YYYY").isSameOrAfter(date) || DATE_SHOULD_SAME_AFTER.replace("#VALUE", message);
}
