import { motion } from "framer-motion";
import React, { FormEvent } from "react";

interface ModalButtonProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}
const ModalButton = ({ onClick, label, disabled }: ModalButtonProps) => {
  return (
    <motion.button
      className={`modal-button ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      type="submit"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
};

export default ModalButton;
