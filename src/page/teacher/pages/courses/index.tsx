import Madal from "@/components/shared/madal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    profileImage: {
      path: string;
    };
  };
}

interface imae {
  image: any;
}

const Curses = () => {
  const { onOpen } = useFolder();
  const token1 = localStorage.getItem("token");

  const [data, setData] = useState<teacher>();

  useEffect(() => {
    baseurl.get("/profile").then((res) => setData(res.data));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;

    baseurl
      .put(`/profile/image`, {
        profileImage: files[0],
      })
      .then((res) => console.log(res));
  };

  const onFinish = async (values: any) => {
    baseurl
      .put(`/profile`, {
        user: {
          ...values,
        },
      })
      .then((res) => console.log(res.data, "Zapros jonatildi"));
  };

  return (
    <div>
      <div className="p-2 bg-slate-500 h-[200px] flex justify-center relative">
        <Avatar
          src={data?.user.profileImage?.path}
          className="absolute bottom-[-100px] w-[200px] h-[200px] bg-red-600"
          size={"large"}
        ></Avatar>
      </div>
      <div className="mt-[150px] flex justify-center flex-col items-center gap-4">
        <h1 className="text-4xl">{data?.user?.email}</h1>
        <h1 className="text-4xl">{data?.user?.name}</h1>
        <h1 className="text-4xl uppercase">{data?.user?.role}</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input onChange={onChange} id="picture" type="file" />
        </div>
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
            onFinish={onFinish}
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
