import React from "react";
import { Form, type FormProps, Input } from "antd";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    navigate("/");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-4xl my-5">Login page</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col justify-center w-[500px]"
      >
        <h1 className="text-1xl mb-2">Username</h1>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <h1 className="text-1xl mb-2">Password</h1>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button size={"lg"} type="submit">
          Submit
        </Button>
        <Link to={"/"}>
          <Button variant={"link"}>Go to home</Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
