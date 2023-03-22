import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import RegisterPage from "../RegisterPage";

test("it shows four inputs and a button", () => {
  render(<RegisterPage />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
