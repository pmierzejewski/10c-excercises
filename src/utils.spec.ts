import Benchmark, { Event } from "benchmark";
import {
  MarkedDates,
  markedDates1,
  markedDates2,
  getDates1,
  getDates2,
} from "./utils";
import { markedDates as markedDatesIgor } from "./igor";
import { markedDates as markedDatesMateusz } from "./mateusz";
import { markedDates as markedDatesMichal } from "./michal";
import { getDatesForInterval, markedDates as markedDatesFinal } from "./final";

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
    const resultFinal = markedDatesFinal({ startDate, endDate });

    // Assert
    expect(result1).toEqual(expectedResult);
    expect(result2).toEqual(expectedResult);
    expect(resultIgor).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
    expect(resultMichal).toEqual(expectedResult);
    expect(resultFinal).toEqual(expectedResult);
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
    const resultFinal = markedDatesFinal({ startDate });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
    expect(resultFinal).toEqual(expectedResult);
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
    const resultFinal = markedDatesFinal({ endDate });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(resultMateusz).toEqual(expectedResult);
    expect(resultFinal).toEqual(expectedResult);
  });

  it("should throw an error if dates are undefined", () => {
    // Act
    const resultFunction = () => markedDatesIgor({});
    const resultFunctionMateusz = () => markedDatesMateusz({});
    const resultFunctionFinal = () => markedDatesFinal({});
    // Assert
    expect(resultFunction).toThrowError();
    expect(resultFunctionMateusz).toThrowError();
    expect(resultFunctionFinal).toThrowError();
  });
});

describe("markedDatesPerformance", () => {
  it("test the speed", () => {
    const startDate = new Date("2012-01-01");
    const endDate = new Date("2022-01-01");
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
      .add("final", () => {
        markedDatesFinal({ startDate, endDate });
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

describe("getDates", () => {
  it("should return same lenght", () => {
    const startDate = new Date("2012-01-01");
    const endDate = new Date("2022-01-01");
    const expectedLenght = 3654;
    const result1 = getDates1({ startDate, endDate }).length;
    const result2 = getDates2({ startDate, endDate }).length;

    expect(result1).toEqual(expectedLenght);
    expect(result2).toEqual(expectedLenght);
  });

  it("performanceTest", () => {
    const startDate = new Date("2012-01-01");
    const endDate = new Date("2022-01-01");
    var suite = new Benchmark.Suite();
    suite
      .add("getInterval", () => {
        getDates1({ startDate, endDate });
      })
      .add("forLoop", () => {
        getDates2({ startDate, endDate });
      })
      .add("forLoopFixed", () => {
        getDatesForInterval({ startDate, endDate });
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
