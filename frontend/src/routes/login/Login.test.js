import { render, fireEvent } from "@testing-library/svelte";
import Login from "./+page.svelte";

test("renders login form", () => {
  const { getByPlaceholderText, getByText } = render(Login);

  expect(getByPlaceholderText("Username")).toBeInTheDocument();
  expect(getByPlaceholderText("Password")).toBeInTheDocument();
  expect(getByText("Login")).toBeInTheDocument();
});

test("displays error message on failed login", async () => {
  const { getByPlaceholderText, getByText } = render(Login);

  // Simulate user input
  await fireEvent.input(getByPlaceholderText("Username"), {
    target: { value: "wrongUser" },
  });
  await fireEvent.input(getByPlaceholderText("Password"), {
    target: { value: "wrongPassword" },
  });

  // Simulate form submission
  await fireEvent.click(getByText("Login"));

  // Check for error message
  expect(getByText("Login failed")).toBeInTheDocument();
});
