import { Button, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import TableGroup from "./table";
// import Modal from '../../../../components/shared/madal'

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { baseurl } from "@/utils/axios";
import Madal from "@/components/shared/madal";
import { useFolder, usePersonStore } from "@/utils/zuztand";

export interface Group {
  _id: string;
  name: string;
  description: string;
  teacher: string;
  students: string[];
}

export interface Student {
  _id: string;
  name: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [form] = Form.useForm();

  const { firstName, lastName, updateFirstName, updateLastName } =
    usePersonStore();

  const createGroup = async (values: any) => {
    try {
      const res = await baseurl.post("/groups", values);
      setGroups([...groups, res.data]);

      onClose;
      message.success("Group created successfully");
    } catch (error) {
      console.error("Error occurred while creating group:", error);
      message.error("Failed to create group");
    }
  };

  function Nimadur() {
    onOpen();
    updateFirstName("");
    updateLastName("");
  }

  const handleSubmit = (values: any) => {
    createGroup(values);
  };
  const { onOpen, onClose } = useFolder();
  return (
    <div className="w-full">
      <h1 className="text-2xl bg-orange-600 p-2 text-white font-bold">
        Groups
      </h1>
      <div className="p-4">
        <Button
          onClick={Nimadur}
          style={{ backgroundColor: "green", color: "white" }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full p-3"
        >
          Create New Group
        </Button>
      </div>
      <TableGroup />
      <Madal>
        <div className="flex flex-col justify-center items-center">
          <Form
            form={form}
            name="group-form"
            onFinish={handleSubmit}
            autoComplete="off"
            className="flex flex-col justify-center w-full"
          >
            <h1 className="text-xl mb-2">Name</h1>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input group name!" }]}
            >
              <Input
                defaultValue={firstName}
                size="large"
                className="rounded-md"
              />
            </Form.Item>
            <h1 className="text-xl mb-2">Description</h1>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input group description!" },
              ]}
            >
              <TextArea
                defaultValue={lastName}
                rows={4}
                className="rounded-md"
              />
            </Form.Item>
            <Button
              // size={"lg"}
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Madal>
    </div>
  );
};

export default Groups;
