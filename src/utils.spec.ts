import { MarkedDates, markedDates } from "./utils";

describe("markedDates", () => {
  it("should return parsed object given both dates", () => {
    // Arrange
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-01-07");
    const expectedResult: MarkedDates = {
      "2022-01-01": {
        startingDay: true,
        color: "#058CF9",
      },
      "2022-01-02": {
        color: "#DDEBF9",
      },
      "2022-01-03": {
        color: "#DDEBF9",
      },
      "2022-01-04": {
        color: "#DDEBF9",
      },
      "2022-01-05": {
        color: "#DDEBF9",
      },
      "2022-01-06": {
        color: "#DDEBF9",
      },
      "2022-01-07": {
        endingDay: true,
        color: "#058CF9",
      },
    };
    // Act
    const result = markedDates({ startDate, endDate });
    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("should return single date given only start date", () => {
    // Arrange
    const startDate = new Date("2022-01-01");
    const expectedResult: MarkedDates = {
      "2022-01-01": {
        startingDay: true,
        endingDay: true,
        color: "#058CF9",
      },
    };
    // Act
    const result = markedDates({ startDate });
    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("should return single date given only end date", () => {
    // Arrange
    const endDate = new Date("2022-01-07");
    const expectedResult: MarkedDates = {
      "2022-01-07": {
        startingDay: true,
        endingDay: true,
        color: "#058CF9",
      },
    };
    // Act
    const result = markedDates({ endDate });
    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error if dates are undefined", () => {
    // Act
    const resultFunction = () => markedDates({});
    // Assert
    expect(resultFunction).toThrowError();
  });
});
