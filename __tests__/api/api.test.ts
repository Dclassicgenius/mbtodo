import { getAllTasks, addTask, editTodo, deleteTodo } from "@/api/api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://drim-todo.onrender.com"
    : "http://localhost:3001";

describe("getAllTasks", () => {
  it("should fetch tasks successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    const tasks = await getAllTasks();

    expect(tasks).toEqual([]);
  });

  it("should throw an error if response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getAllTasks()).rejects.toThrow("HTTP error! status: 500");
  });

  it("should throw an error if an error occurs during fetch", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(getAllTasks()).rejects.toThrow("Network error");
  });
});

describe("addTask", () => {
  it("should add a task successfully", async () => {
    const mockTask = { id: "1", text: "Task 1", completed: false };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockTask),
    });

    const newTask = await addTask(mockTask);

    expect(newTask).toEqual(mockTask);
  });

  it("should throw an error if response is not ok", async () => {
    const mockTask = { id: "1", text: "Task 1", completed: false };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(addTask(mockTask)).rejects.toThrow("HTTP error! status: 500");
  });

  it("should throw an error if an error occurs during fetch", async () => {
    const mockTask = { id: "1", text: "Task 1", completed: false };

    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(addTask(mockTask)).rejects.toThrow("Network error");
  });
});

describe("editTodo", () => {
  it("should make a PUT request to update the todo", async () => {
    const mockTodo = { id: "1", text: "New text", completed: true };
    const mockResponse = { id: "1", text: "New text", completed: true };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const updatedTodo = await editTodo(mockTodo);

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/tasks/${mockTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockTodo),
    });
    expect(updatedTodo).toEqual(mockResponse);
  });

  it("should throw an error if an error occurs", async () => {
    const mockTodo = { id: "1", text: "New text", completed: true };
    const mockError = new Error("Failed to edit todo");

    global.fetch = jest.fn().mockRejectedValue(mockError);

    await expect(editTodo(mockTodo)).rejects.toThrow(mockError);
  });
});

describe("deleteTodo", () => {
  it("should make a DELETE request to delete the todo", async () => {
    const mockId = "1";

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    await deleteTodo(mockId);

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/tasks/${mockId}`, {
      method: "DELETE",
    });
  });

  it("should throw an error if deletion fails", async () => {
    const mockId = "1";
    const mockError = new Error("Failed to delete todo");

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(deleteTodo(mockId)).rejects.toThrow(mockError);
  });
});
