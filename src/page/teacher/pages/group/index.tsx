import { Button } from "@/components/ui/button";
import React from "react";
import TableGroup from "./table";
import Madal from "@/components/shared/madal";
import { useFolder, useTeacherId } from "@/utils/zuztand";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { baseurl } from "@/utils/axios";

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

  console.log(lastName, 111);

  const onFinish = (vale: any) => {
    baseurl
      .post(`/groups`, {
        ...vale,
        teacher: lastName,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl bg-orange-600 p-2">Groups</h1>
      <Button onClick={onOpen}>Create New Group</Button>
      <TableGroup />
      <Madal key={1}>
        <div className="flex flex-col justify-center items-center">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
            <h1 className="text-1xl mb-2">Select your position</h1>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Button size={"lg"} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Madal>
    </div>
  );
};

export default Groups;
