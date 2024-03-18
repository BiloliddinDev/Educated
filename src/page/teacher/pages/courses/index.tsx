import Madal from "@/components/shared/madal";
import { Button } from "@/components/ui/button";
import { baseurl } from "@/utils/axios";
import { useFolder } from "@/utils/zuztand";
import {
  Avatar,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { File, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";

interface teacher {
  user: {
    email: string;
    name: string;
    role: string;
    createdAt: string;
    __v: number;
    _id: string;
  };
}

const Curses = () => {
  const { onOpen } = useFolder();

  const [data, setData] = useState<teacher>();

  const props: UploadProps = {
    onChange(info) {
      console.log(info);

      // fetch("/api/updateProfile", {
      //   method: "POST",
      //   body: info,
      // })
      //   .then((response) => response.json())
      //   .then((data) => {});

      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  useEffect(() => {
    baseurl.get("/profile").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <div className="p-2 bg-slate-500 h-[200px] flex justify-center relative">
        <Avatar
          className="absolute bottom-[-100px] w-[200px] h-[200px] bg-red-600"
          size={"large"}
        ></Avatar>
      </div>
      <div className="mt-[150px] flex justify-center flex-col items-center gap-4">
        <h1 className="text-4xl">{data?.user?.email}</h1>
        <h1 className="text-4xl">{data?.user?.name}</h1>
        <h1 className="text-4xl uppercase">{data?.user?.role}</h1>
      </div>

      <FloatButton
        onClick={() => onOpen()}
        className="w-[100px] h-[30px]"
        icon={<Pencil />}
        type="primary"
        shape="square"
        style={{ right: 24 }}
      />
      <Madal>
        <div className="flex flex-col justify-center items-center">
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

            <Form.Item
              name="dateOfBirth"
              rules={[
                { required: true, message: "Please input your Date Of Birth!" },
              ]}
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>

            <h1 className="text-1xl mb-2">Select your position</h1>
            <Form.Item
              name="position"
              rules={[
                { required: true, message: "Please input your position!" },
              ]}
            >
              <Select
                defaultValue={"Information Technology"}
                size="large"
                options={[
                  { value: "Language teacher", label: "Language teacher" },
                  {
                    value: "Information Technology",
                    label: "Information Technalogiy",
                  },
                  { value: "Smm Teacher", label: "Smm Teacher" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="profileImage"
              rules={[
                { required: true, message: "Please input your ProfileImage!" },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload!
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
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

export default Curses;
