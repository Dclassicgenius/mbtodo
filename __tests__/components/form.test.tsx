import Form from "@/components/Form";
import { ITask } from "@/types";
import { fireEvent, render } from "@testing-library/react";
import { FormEvent } from "react";

interface FormProps {
  type: string;
  task: ITask;
  setTask: (task: ITask) => void;
  handleSubmit: (e: FormEvent) => void;
}

describe("Form", () => {
  const mockType = "Test";
  const mockTask: ITask = {
    text: "",
    id: "",
    completed: false,
  };
  const mockSetTask = jest.fn();
  const mockHandleSubmit = jest.fn();

  const renderForm = (props: Partial<FormProps> = {}) => {
    const defaultProps: FormProps = {
      type: mockType,
      task: mockTask,
      setTask: mockSetTask,
      handleSubmit: mockHandleSubmit,
    };
    return render(<Form {...defaultProps} {...props} />);
  };

  it("renders the form with the correct title", () => {
    const { getByText } = renderForm();
    const titleElement = getByText(`${mockType} Task`);
    expect(titleElement).toBeTruthy();
  });

  it("calls setTask function when input value changes", () => {
    const { getByPlaceholderText } = renderForm();
    const inputElement = getByPlaceholderText("Your task");
    const inputValue = "Test Task";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(mockSetTask).toHaveBeenCalledWith({ ...mockTask, text: inputValue });
  });

  it("calls handleSubmit function when form is submitted", () => {
    const { getByRole } = renderForm();
    const formElement = getByRole("form");
    fireEvent.submit(formElement);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
