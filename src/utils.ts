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
