"use client";

import { Modal } from "antd";
import FullTab from "./Tab/FullTab";

import NoDocument from "./NoDocument";
import FilledDocument from "./FilledDocument";
import { useAppContext } from "../ContextApi/ContextApi";

const AllDocument = () => {
  const { isModalOpen, setIsModalOpen, documents } = useAppContext();

  const handleCancel = () => {
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };
  // {},{}
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-full  mt-8">
        {documents && documents.length < 1 ? (
          <NoDocument />
        ) : (
          <FilledDocument />
        )}
      </div>
      <Modal
        title=""
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
        getContainer={false}
        width={700}
      >
        <FullTab />
      </Modal>
    </section>
  );
};

export default AllDocument;
