import Benchmark, { Event } from "benchmark";
import { MarkedDates, markedDates1, markedDates2 } from "./utils";
import { markedDates as markedDatesIgor } from "./igor";
import { markedDates as markedDatesMateusz } from "./mateusz";
import { markedDates as markedDatesMichal } from "./michal";

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
    const result1 = markedDates1({ startDate, endDate });
    const result2 = markedDates2({ startDate, endDate });
    const resultIgor = markedDatesIgor({ startDate, endDate });
    const resultMateusz = markedDatesMateusz({ startDate, endDate });
    const resultMichal = markedDatesMichal({ startDate, endDate });

    // Assert
    expect(result1).toEqual(expectedResult);
    expect(result2).toEqual(expectedResult);
    expect(resultIgor).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
    expect(resultMichal).toEqual(expectedResult);
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
    const result = markedDatesIgor({ startDate });
    const resultMateusz = markedDatesMateusz({ startDate });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
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
    const result = markedDatesIgor({ endDate });
    const resultMateusz = markedDatesMateusz({ endDate });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
  });

  it("should throw an error if dates are undefined", () => {
    // Act
    const resultFunction = () => markedDatesIgor({});
    const resultFunctionMateusz = () => markedDatesMateusz({});
    // Assert
    expect(resultFunction).toThrowError();
    expect(resultFunctionMateusz).toThrowError();
  });
});

describe("markedDatesPerformance", () => {
  it("test the speed", () => {
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-01-07");
    var suite = new Benchmark.Suite();
    suite
      .add("igor", () => {
        markedDatesIgor({ startDate, endDate });
      })
      .add("mateusz", () => {
        markedDatesMateusz({ startDate, endDate });
      })
      .add("michal", () => {
        markedDatesMichal({ startDate, endDate });
      })
      .add("jarek", () => {
        markedDates1({ startDate, endDate });
      })
      .add("jarek+patryk refactor", () => {
        markedDates2({ startDate, endDate });
      })
      .on("cycle", function (event: Event) {
        const meanInSecs = event.target.stats?.mean;
        const mean = meanInSecs
          ? `${(meanInSecs * 1000).toFixed(4)}ms`
          : "no stats available";
        console.log(String(event.target), mean);
      })
      .on("complete", function () {
        console.log("Fastest is " + suite.filter("fastest").map("name"));
      })
      .run();
  });
});
