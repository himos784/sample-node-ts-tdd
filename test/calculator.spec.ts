// tests/calculator.spec.tx
import addition from "calculator";
import { assert } from "chai";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", () => {
    const result = addition(2, 3);
    assert.equal(result, 5);
  });
});
