"use client";

import useModal from "@/hook/useModal";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import Form from "./Form";
import { addTask } from "@/api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import ModalButton from "./ModalButton";

const AddTodo = () => {
  const [task, setTask] = useState({ id: "", text: "", completed: false });

  const router = useRouter();

  const { modalOpen, close, open } = useModal();
  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addTask({
        id: uuidv4(),
        text: task.text,
        completed: task.completed,
      });

      setTask({ id: "", text: "", completed: false });
    } catch (error) {
      console.log(error);
    }

    close();
    router.refresh();
  };

  return (
    <div>
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={open}
        className="add-button flex items-center mx-auto gap-2 my-5 cursor-pointer"
      >
        Add new task <AiOutlinePlus size={18} />
      </motion.button>

      <Modal handleClose={close} modalOpen={modalOpen}>
        <Form
          type="Create"
          handleSubmit={createTask}
          task={task}
          setTask={setTask}
        />

        <div className=" flex mt-14 gap-5">
          <ModalButton
            onClick={createTask}
            label="Submit"
            disabled={!task.text}
          />
          <ModalButton onClick={close} label="Close" />
        </div>
      </Modal>
    </div>
  );
};

export default AddTodo;
