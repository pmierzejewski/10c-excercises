import { format, isSameDay } from "date-fns";

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

const COMMON_DAY_COLOR = "#DDEBF9";
const START_DAY_COLOR = "#058CF9";
const END_DAY_COLOR = "#058CF9";
const startDayProperties: DateOptions = {
  startingDay: true,
  color: START_DAY_COLOR,
};
const commonDayProperties: DateOptions = {
  color: COMMON_DAY_COLOR,
};
const endDayProperties: DateOptions = {
  endingDay: true,
  color: END_DAY_COLOR,
};
const startAndEndDayProperties: DateOptions = {
  startingDay: true,
  endingDay: true,
  color: END_DAY_COLOR,
};

export const markedDates = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  if (!startDate && !endDate) {
    throw new Error("undefined dates");
  }

  try {
    const hasOnlyOneDate = !startDate || !endDate;
    if (hasOnlyOneDate)
      return { [formatDate(startDate ?? endDate)]: startAndEndDayProperties };
  } catch (error) {
    throw error;
  }

  let dates: Date[] = getDatesForInterval({ startDate, endDate });
  let markedDates: MarkedDates = {};
  dates.forEach((date, index, array) => {
    const key = formatDate(date);
    const value = generateDateValues({ index, arrayLength: array.length });
    markedDates[key] = value;
  });
  return markedDates;
};

export const getDatesForInterval = ({
  startDate,
  endDate,
}: MarkedDatesVars): Date[] => {
  if (!startDate || !endDate) return [];
  let dates: Date[] = [];
  const getNextDay = (date: Date) => {
    const dayInMiliseconds = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + dayInMiliseconds);
  };
  for (
    let currDate = new Date(startDate);
    currDate <= endDate;
    currDate = getNextDay(currDate)
  ) {
    dates.push(currDate);
  }
  return dates;
};

export const formatDate = (date?: Date) => {
  if (!date) throw Error();
  return date.toISOString().substring(0, 10);
};

const generateDateValues = ({
  index,
  arrayLength,
}: {
  index: number;
  arrayLength: number;
}): DateOptions => {
  const isStartDay = index === 0;
  const isEndDay = index === arrayLength - 1;
  if (isStartDay) {
    return startDayProperties;
  }
  if (isEndDay) {
    return endDayProperties;
  }
  return commonDayProperties;
};
