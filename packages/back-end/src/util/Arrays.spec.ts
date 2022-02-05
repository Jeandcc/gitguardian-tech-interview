import ArrayUtils from "./Arrays";

describe("array Utils", () => {
  const EXPECTED_OUTPUT = [1, 3, 4, 5, 6, 7];

  it("returns original array if already flat", () => {
    const input = [1, 3, 4, 5, 6, 7];
    const output = ArrayUtils.flatten(input);
    expect(output).toStrictEqual(EXPECTED_OUTPUT);
  });

  it("flattens 2-levels-deep array", () => {
    const input = [1, 3, 4, [5, 6, 7]];
    const output = ArrayUtils.flatten(input);
    expect(output).toStrictEqual(EXPECTED_OUTPUT);
  });

  it("flattens 3-levels-deep array", () => {
    const input = [1, 3, 4, [5, [6, 7]]];
    const output = ArrayUtils.flatten(input);
    expect(output).toStrictEqual(EXPECTED_OUTPUT);
  });

  it("successfully picks an item from a provided array", () => {
    const inputArray = [1, 2, 3, 4, 5, 6];
    const randomItem = ArrayUtils.pickRandomItem(inputArray);
    expect(inputArray).toContain(randomItem);
  });
});
