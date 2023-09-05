"use client";
import { ITask } from "@/types";
import { useState } from "react";
import TodoList from "./TodoList";

type FilterType = "all" | "completed" | "todo"; // possible

interface FilterProps {
  tasks: ITask[];
}
const Filter = ({ tasks }: FilterProps) => {
  const [filter, setFilter] = useState<FilterType>("all");

  let filteredTasks;

  switch (filter) {
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    case "todo":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    default: // 'all'
      filteredTasks = tasks;
  }

  return (
    <section>
      <div className=" flex flex-row gap-4 items-center mb-5">
        <input
          id="all"
          type="checkbox"
          checked={filter === "all"}
          onChange={() => setFilter("all")}
          className=" w-6 h-6  accent-primary-blue"
        />
        <label htmlFor="all" className="text-primary-gray">
          All
        </label>

        <input
          id="completed"
          type="checkbox"
          checked={filter === "completed"}
          onChange={() => setFilter("completed")}
          className=" w-6 h-6 accent-primary-blue"
        />
        <label htmlFor="completed" className="text-primary-gray">
          Completed
        </label>

        <input
          id="todo"
          type="checkbox"
          checked={filter === "todo"}
          onChange={() => setFilter("todo")}
          className=" w-6 h-6 accent-primary-blue"
        />
        <label htmlFor="todo" className="text-primary-gray">
          Todo
        </label>
      </div>
      <TodoList tasks={filteredTasks} />
    </section>
  );
};

export default Filter;
