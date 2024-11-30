import { toast } from "react-toastify";

export const warning = {
  dateEmpty: "Date must not be empty",
  datePast: "Date cannot be a past date",
  dateChangedPast: "Date if changed, must not be past date",
  nameEmpty: "Name cannot be empty",
  nameTooLong: "Name length cannot extend 60 characters",
};

export const isValidName = (name: string): boolean => {
  const trimName = name.trim();
  const isValidTrimName = trimName.length > 0 && trimName.length <= 60;
  if (!isValidTrimName) {
    toast.error(trimName.length === 0 ? warning.nameEmpty : warning.nameTooLong);
  }
  return isValidTrimName;
};

export const getDate = (date?: string): string => {
  if (date) return new Date(date).toISOString().split("T")[0];
  else return new Date().toISOString().split("T")[0];
};

export const isEmptyDate = (date?: string): boolean => {
  const isEmpty = date === "";
  isEmpty && toast.error(warning.dateEmpty);
  return isEmpty;
};

export const isPastDate = (date: string): boolean => {
  const today = new Date(getDate()).getTime();
  const givenDateString = new Date(getDate(date)).getTime();
  return givenDateString < today;
};

export const localTasksKey = "tasks";
