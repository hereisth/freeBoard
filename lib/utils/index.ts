import { isThisWeek, format, isToday, isYesterday } from "date-fns";

export const formatTimeToNow = (date: Date) => {
  if (isToday(date)) {
    return `Today, ${format(date, "HH:mm")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "HH:mm")}`;
  }

  // if in this week, show the day of the week
  if (isThisWeek(date)) {
    return format(date, "EEEE HH:mm");
  }
  
  // more than one week, show the date
  return format(date, "yyyy/M/d, HH:mm");
};

export { cn } from "./cn";
export { encodedRedirect } from "./utils";
