import { ITask } from "@/types";
import { FormEvent } from "react";
import ModalButton from "./ModalButton";
import useModal from "@/hook/useModal";
import Modal from "./Modal";

interface FormProps {
  type: string;
  task: ITask;
  setTask: (task: ITask) => void;
  handleSubmit: (e: FormEvent) => void;
}

const Form = ({ type, task, setTask, handleSubmit }: FormProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        <span>{type} Task</span>
      </h1>
      <form
        role="form"
        className="mt-10 w-full flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Task
          </span>
          <input
            value={task.text}
            onChange={(e) => setTask({ ...task, text: e.target.value })}
            placeholder="Your task"
            required
            className="w-full flex rounded-lg mt-2 p-3 text-sm outline-0"
          />
        </label>
      </form>
    </section>
  );
};

export default Form;
