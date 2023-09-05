import { ITask } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://drim-todo.onrender.com"
    : "http://localhost:3001";

export const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tasks = await response.json();

    return tasks;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTask = async (todo: ITask): Promise<ITask> => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newTask = await response.json();

    return newTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const updatedTodo = await res.json();
    return updatedTodo;
  } catch (error) {
    console.log("An error occurred while editing the todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
