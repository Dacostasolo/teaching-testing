import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { Counter } from "./Counter";
import UserEvent from "@testing-library/user-event";

//getBy...
//findBy..
//queryBy...

describe("Counter", () => {
  beforeEach(() => {
    render(<Counter />);
  });

  test("show show header", () => {
    //arrange
    const header = screen.getByText(/counter/i);
    const parargraph = screen.queryByText("Hello");
    //assert
    expect(header).toBeInTheDocument();
    expect(parargraph).not.toBeInTheDocument();
  });

  test("should increment counter when increment button is clicked", async () => {
    const button = screen.getByTestId("increment-btn");
    const counter = screen.getByTestId("count-display");

    const user = UserEvent.setup();
    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(counter).toHaveTextContent("1");
  });

  test("should show error message when the couter is negative", async () => {
    //arrane
    const button = screen.getByTestId("decrement-btn");
    const counter = screen.getByTestId("count-display");

    const user = UserEvent.setup();
    await user.click(button);

    const errorMessage = await screen.findByText(/negative/i);

    expect(button).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent("-1");
    expect(errorMessage).toBeInTheDocument();
  });
});
