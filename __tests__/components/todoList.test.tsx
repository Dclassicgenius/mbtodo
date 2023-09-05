import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";
import TodoList from "@/components/TodoList";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));

const tasks = [
  { id: "1", text: "Task 1", completed: false },
  { id: "2", text: "Task 2", completed: true },
];

describe("TodoList", () => {
  it("should render the tasks", () => {
    render(<TodoList tasks={tasks} />);

    expect(screen.getByText("Task 1")).toBeTruthy();
    expect(screen.getByText("Task 2")).toBeTruthy();
  });

  it("should render the correct number of tasks", () => {
    render(<TodoList tasks={tasks} />);

    expect(screen.getAllByRole("row")).toHaveLength(tasks.length + 1);
  });
});
