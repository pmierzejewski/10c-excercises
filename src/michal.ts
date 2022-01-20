import { eachDayOfInterval } from "date-fns";

type DateOptions = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
};

export type MarkedDates = Record<string, DateOptions>;

type MarkedDatesVars = {
  startDate?: Date;
  endDate?: Date;
};

const COLORS = {
  BASIC: "#DDEBF9",
  SELECTED: "#058CF9",
};

export const markedDates = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  let dates: Date[] = [];
  let markedDates: MarkedDates = {};
  const getIsoDate = (date: Date) => {
    return date.toISOString().substring(0, 10);
  };
  if (!startDate && !endDate) {
    throw new Error("undefined dates");
  } else if (!startDate || !endDate) {
    const date = startDate || endDate;
    markedDates[getIsoDate(date)] = {
      startingDay: true,
      endingDay: true,
      color: COLORS.SELECTED,
    };
  } else {
    const days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    days.forEach((day) => {
      day.setHours(day.getHours() + 1); // eachDayOfInterval removes hours -> toISOString gives the day before
      dates.push(day);
    });
    dates.forEach((day) => {
      if (day.valueOf() == startDate?.valueOf()) {
        return (markedDates[getIsoDate(day)] = {
          startingDay: true,
          color: COLORS.SELECTED,
        });
      } else if (day.valueOf() == endDate?.valueOf()) {
        return (markedDates[getIsoDate(day)] = {
          endingDay: true,
          color: COLORS.SELECTED,
        });
      } else {
        return (markedDates[getIsoDate(day)] = { color: COLORS.BASIC });
      }
    });
  }
  return markedDates;
};
