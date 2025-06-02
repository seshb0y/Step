import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("добавление новой задачи", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: "Сделать тест" } });
  fireEvent.submit(input);
  expect(screen.getByText("Сделать тест")).toBeInTheDocument();
});
