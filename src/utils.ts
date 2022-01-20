import { format, eachDayOfInterval, isSameDay } from "date-fns";

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
  // TIP: { eachDayOfInterval } from 'date-fns' may be useful
  // but dont feel limited to it
  return {};
};

export const markedDates1 = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  let dates: MarkedDates = {};
  if (startDate === undefined || endDate === undefined) {
    throw new Error();
  }
  if (isSameDay(startDate, endDate)) {
    dates[format(startDate, "yyyy-MM-dd")] = {
      startingDay: true,
      endingDay: true,
      color: "#058CF9",
    };
  } else {
    const datesArray: Array<Date> = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    dates = datesArray.reduce(
      (dateObj: MarkedDates, date: Date, i, ar): MarkedDates => ({
        ...dateObj,
        [format(date, "yyyy-MM-dd")]: {
          color: "#DDEBF9",
        },
      }),
      {}
    );
    dates[format(startDate, "yyyy-MM-dd")] = {
      startingDay: true,
      color: "#058CF9",
    };
    dates[format(endDate, "yyyy-MM-dd")] = {
      endingDay: true,
      color: "#058CF9",
    };
  }
  return dates;
};

export const markedDates2 = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  let dates: MarkedDates = {};
  if (startDate === undefined || endDate === undefined) {
    throw new Error();
  }
  if (isSameDay(startDate, endDate)) {
    dates[format(startDate, "yyyy-MM-dd")] = {
      startingDay: true,
      endingDay: true,
      color: "#058CF9", //TODO refactor colors to light blue
    };
  } else {
    eachDayOfInterval({
      start: startDate,
      end: endDate,
    })
      .map((date, index, array) => {
        const isOnEdge = index === 0 || index === array.length - 1;
        return {
          date: format(date, "yyyy-MM-dd"),
          startingDay: index === 0 ? true : undefined,
          endingDay: index === array.length - 1 ? true : undefined,
          color: isOnEdge ? "#058CF9" : "#DDEBF9",
        };
      })
      .forEach((item) => {
        const newItem: DateOptions = { color: item.color };
        if (item.startingDay) newItem.startingDay = item.startingDay;
        if (item.endingDay) newItem.endingDay = item.endingDay;
        dates[item.date] = newItem;
      });
    return dates;
  }
  return dates;
};

export const getDates1 = ({ startDate, endDate }: MarkedDatesVars): Date[] => {
  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
};

export const getDates2 = ({ startDate, endDate }: MarkedDatesVars): Date[] => {
  let dates: Date[] = [];
  for (
    let currDate = new Date(startDate);
    currDate <= endDate;
    currDate.setDate(currDate.getDate() + 1)
  ) {
    dates.push(currDate);
  }
  return dates;
};
