import { formatDate, getDatesForInterval } from "./final";

describe("formatDate", () => {
  it("should return correct key in yyyy-mm-dd format", () => {
    const day = new Date("2022-01-07");
    const expectedResult = "2022-01-07";
    const result = formatDate(day);
    expect(result).toEqual(expectedResult);
  });
});

describe("integrationBetweenFormatDateAndGetDates", () => {
  it("should return correct key in yyyy-mm-dd format", () => {
    const startDate = new Date("2022-01-07");
    const endDate = new Date("2022-01-08");
    const dates = getDatesForInterval({ startDate, endDate });

    const expectedResult = ["2022-01-07", "2022-01-08"];
    const formattedDates = dates.map(formatDate);
    expect(formattedDates).toEqual(expectedResult);
  });
});

describe("getDatesForInterval", () => {});
