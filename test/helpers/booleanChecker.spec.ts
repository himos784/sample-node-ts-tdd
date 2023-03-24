import { expect } from "chai";
import { numberToBoolean } from "helpers/booleanChecker";

describe("booleanChecker - helper", () => {
  it("returns false when numberToBoolean executed", () => {
    const value = 1;
    const compareWith = 0;

    const result = numberToBoolean(value, compareWith);

    expect(result).to.eql(false);
  });

  it("returns true when numberToBoolean executed", () => {
    const value = 1;
    const compareWith = 1;

    const result = numberToBoolean(value, compareWith);

    expect(result).to.eql(true);
  });
});
