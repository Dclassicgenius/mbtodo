import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./BackDrop";
import { FormEvent, ReactNode } from "react";
import useModal from "@/hook/useModal";

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  modalOpen: boolean;
}

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps) => (
  <AnimatePresence>{children}</AnimatePresence>
);

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ children, handleClose, modalOpen }: ModalProps) => {
  return (
    <ModalContainer>
      {modalOpen && (
        <Backdrop onClick={handleClose}>
          <motion.dialog
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            className="orange-gradient modal modal-bottom sm:modal-middle"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.dialog>
        </Backdrop>
      )}
    </ModalContainer>
  );
};

export default Modal;
