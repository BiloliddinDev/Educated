import { Button } from "@/components/ui/button";
import React from "react";
import TableGroup from "./table";
import Madal from "@/components/shared/madal";
import { useFolder, useTeacherId } from "@/utils/zuztand";
import { Form, Input } from "antd";

export interface Group {
  _id: string;
  name: string;
  description: string;
  teacher: string;
  students: string[];
}

const Groups = () => {
  const { onOpen } = useFolder();

  const { lastName } = useTeacherId();

  return (
    <div className="w-full">
      <h1 className="text-2xl bg-orange-600 p-2">Groups</h1>
      <Button onClick={onOpen}>Create New Group</Button>
      <TableGroup />
      <Madal key={1}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col justify-center  w-[500px]"
        >
          <h1 className="text-1xl mb-2">Name</h1>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <h1 className="text-1xl mb-2">Date Of Birth</h1>

          <h1 className="text-1xl mb-2">Select your position</h1>
          <Form.Item
            name="position"
            rules={[{ required: true, message: "Please input your position!" }]}
          ></Form.Item>

          <Button size={"lg"} type="submit">
            Submit
          </Button>
        </Form>
      </Madal>
    </div>
  );
};

export default Groups;
