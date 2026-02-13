//1234.56 -> $1,234.56
import { describe, expect, test } from "vitest";
import {
  formatPrice,
  formatName,
  normalizeEmail,
  truncateText,
} from "./formatters";

// 3A ->
/*
  1000, 'EUR  '€1,000.00'
  1000, 'GBP' '£1,000.00'
  1000, 'JPY' '¥1,000'
*/

// null
// udefined
// division by 0


describe("utils", () => {
  // nubers with decimals points 10.45 -> $10.45 1000.45 -> $1,000.46
  test("should display currences including decimals in right format", () => {
    //arrange
    const want = "$1,000.46";

    //act
    const got = formatPrice(1000.46, "USD");

    //assert
    expect(got).toBe(want);
  });

  test("formatPrice returns correct format for numbers with decimal points", () => {
    const price = formatPrice(10.45);
    const price2 = formatPrice(1000.45);

    expect(price).toBe("$10.45");
    expect(price2).toBe("$1,000.45");
  });

  // // what if the value passed is not a number "hello" -> wil it th
  test("should throw an error when a string is passed into amount", () => {
    expect(() => formatPrice("hello universe", "USD")).toThrow(
      "Amount must be a valid number",
    );
  });

  // what if i pass zero. 0 -> $0.00
  test("should handle zero", () => {
    expect(formatPrice(0, "USD")).toBe("$0.00");
  });

  describe("formatName", () => {
    test("formatName returns correct format", () => {
      const name = formatName("joe", "emmanuel");
      expect(name).toBe("emmanuel, joe");
    });
  });

    test("formatPrice returns correct format for numbers without decimal points", () => {
      const price = formatPrice(10000, "USD");
      expect(price).toBe("$10,000.00");
    });

});
