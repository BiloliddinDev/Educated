import Madal from "@/components/shared/madal";
import { Button } from "@/components/ui/button";
import { useFolder } from "@/utils/zuztand";
import { Calendar, Form, FormProps, Input } from "antd";
import { useState } from "react";

const Admin = () => {
  const { onOpen } = useFolder();
  const [event, setEvent] = useState("");
  type FieldType = {
    name?: string;
    email?: string;
    surname?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-[60px] w-full flex">
      <div className="bg-slate-400 w-[200px] h-[682px] py-10 px-4 flex flex-col gap-4">
        <Button
          onClick={() => {
            onOpen(), setEvent("teacher");
          }}
        >
          Create Teacher
        </Button>
        <Button
          onClick={() => {
            onOpen(), setEvent("group");
          }}
        >
          Create Group
        </Button>
        <Button
          onClick={() => {
            onOpen(), setEvent("student");
          }}
        >
          Create Student
        </Button>
      </div>
      <h1 className="w-full">Admin page</h1>

      <Madal>
        <h1>Create Teacher</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="surname"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="surname"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="date" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="surname"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="submit" size={"lg"}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Madal>
    </div>
  );
};

export default Admin;
