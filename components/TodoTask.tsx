"use client";

import { FormEvent, FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { ITask } from "@/types";
import useModal from "@/hook/useModal";
import Form from "./Form";
import ModalButton from "./ModalButton";
import { deleteTodo, editTodo } from "@/api/api";

interface TaskProps {
  task: ITask;
}

const TodoTask = ({ task }: TaskProps) => {
  const router = useRouter();
  const {
    modalOpen: editModalOpen,
    close: closeEditModal,
    open: openEditModal,
  } = useModal();
  const {
    modalOpen: deleteModalOpen,
    close: closeDeleteModal,
    open: openDeleteModal,
  } = useModal();
  const [taskToEdit, setTaskToEdit] = useState({
    id: "",
    text: "",
    completed: false,
  });

  const handleToggleTask = async () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    await editTodo(updatedTask);
    router.refresh();
  };

  const handleSubmitEditTodo = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await editTodo({
        id: task.id,
        text: taskToEdit.text,
        completed: taskToEdit.completed,
      });

      setTaskToEdit({ id: "", text: "", completed: false });
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    closeEditModal();
  };
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    closeDeleteModal();
    router.refresh();
  };

  return (
    <tbody>
      <tr key={task.id} className="flex justify-between">
        <td className="w-full text-primary-orange text-lg">
          <div className=" flex flex-row gap-4 items-center">
            <input
              type="checkbox"
              role="checkbox"
              checked={task.completed}
              onChange={handleToggleTask}
              className=" w-6 h-6 dark:border-primary-orange accent-primary-pink"
            />
            <span className={task.completed ? ` line-through italic` : ""}>
              {task.text}
            </span>
          </div>
        </td>
        <td>
          <div className="flex gap-5">
            <FiEdit
              onClick={() => {
                setTaskToEdit(task);
                openEditModal();
              }}
              cursor="pointer"
              className="text-primary-blue"
              size={25}
            />
            <Modal handleClose={closeEditModal} modalOpen={editModalOpen}>
              <Form
                type="Edit"
                handleSubmit={handleSubmitEditTodo}
                task={taskToEdit}
                setTask={setTaskToEdit}
              />

              <div className=" flex mt-14 gap-5">
                <ModalButton
                  onClick={handleSubmitEditTodo}
                  label="Submit"
                  disabled={!taskToEdit.text}
                />
                <ModalButton onClick={closeEditModal} label="Close" />
              </div>
            </Modal>
            <FiTrash2
              onClick={openDeleteModal}
              cursor="pointer"
              className="text-red-500"
              size={25}
            />
            <Modal handleClose={closeDeleteModal} modalOpen={deleteModalOpen}>
              <h3 className="text-2xl">
                Are you sure, you want to delete this task?
              </h3>

              <div className=" flex mt-14 gap-5">
                <ModalButton
                  onClick={() => handleDeleteTask(task.id)}
                  label="Delete"
                />
                <ModalButton onClick={closeDeleteModal} label="Close" />
              </div>
            </Modal>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TodoTask;
