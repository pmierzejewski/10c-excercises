import { format, eachDayOfInterval } from "date-fns";

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

export const markedDates = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  if (startDate === undefined && endDate === undefined) {
    throw "there should be at least one date";
  } else if (startDate === undefined || endDate === undefined) {
    const date = (startDate || endDate) as Date;
    const objKey = format(date, "yyyy-MM-dd");
    return {
      [objKey]: {
        startingDay: true,
        endingDay: true,
        color: EDGE_COLOR,
      },
    };
  } else {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const objEntries = dates.map((date, i) => [
      format(date, "yyyy-MM-dd"),
      generateDateValues(i, dates.length),
    ]);
    const returnedObject = Object.fromEntries(objEntries);
    return returnedObject;
  }
};

const EDGE_COLOR = "#058CF9";
const PRIMARY_COLOR = "#DDEBF9";

const generateDateValues = (i: number, length: number): DateOptions => {
  if (i === 0) {
    return {
      startingDay: true,
      color: EDGE_COLOR,
    };
  }
  if (i === length - 1) {
    return {
      endingDay: true,
      color: EDGE_COLOR,
    };
  }
  return {
    color: PRIMARY_COLOR,
  };
};
