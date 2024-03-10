import { useFolder } from "@/utils/zuztand";
import { Modal } from "antd";
import React, { useState } from "react";

interface madalType {
  children: React.ReactNode;
}

const Madal = ({ children }: madalType) => {
  const { isOpen, onClose } = useFolder();
  return (
    <Modal
      width={800}
      title="User Information"
      open={isOpen}
      onCancel={onClose}
    >
      {children}
    </Modal>
  );
};

export default Madal;
