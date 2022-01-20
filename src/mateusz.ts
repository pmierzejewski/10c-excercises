const { format } = require("date-fns");
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
type DataParserVars = {
  startDate?: Date;
  endDate?: Date;
  currDate: Date;
};
const DATE_FORMAT = "yyyy-MM-dd";
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

const formatDate = (date: Date) => format(new Date(date), DATE_FORMAT);

const parseDateToDateOptionsObject = ({
  startDate,
  endDate,
  currDate,
}: DataParserVars): MarkedDates => {
  const isStartDay = startDate?.toDateString() === currDate.toDateString();
  const isEndDay = endDate?.toDateString() === currDate.toDateString();
  const formattedDate = formatDate(currDate);
  let parsedObject = {};
  if (isStartDay) parsedObject = { [formattedDate]: startDayProperties };
  else if (isEndDay) parsedObject = { [formattedDate]: endDayProperties };
  else parsedObject = { [formattedDate]: commonDayProperties };
  return parsedObject;
};
export const markedDates = ({
  startDate,
  endDate,
}: MarkedDatesVars): MarkedDates => {
  if (!startDate && !endDate) throw new Error("Dates not provided");
  if (!startDate && endDate)
    return { [formatDate(endDate)]: startAndEndDayProperties };
  if (startDate && !endDate)
    return { [formatDate(startDate)]: startAndEndDayProperties };
  let markedDatesArray = [];
  for (
    let currDate = new Date(startDate);
    currDate <= endDate;
    currDate.setDate(currDate.getDate() + 1)
  ) {
    const parsedData = parseDateToDateOptionsObject({
      startDate,
      endDate,
      currDate,
    });
    markedDatesArray.push(parsedData);
  }
  const markedDatesObject = Object.assign({}, ...markedDatesArray);
  return markedDatesObject;
};
