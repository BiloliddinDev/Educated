import { Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { baseurl } from "@/utils/axios";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    baseurl.post(`/auth/login`, values).then((res) => {
      localStorage.setItem("token", `${res?.data?.token}`);
      localStorage.setItem("role", `${res?.data?.role}`);
      toast({
        title: "You are Welcome ✅✅✅",
      });
      navigate(`/${res?.data?.role}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
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
        <h1 className="text-1xl mb-2">Email</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <h1 className="text-1xl mb-2">Password</h1>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button size={"lg"} type="submit">
          Submit
        </Button>

        <Link to={"/"}>
          <Button variant="link">Go to home</Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
