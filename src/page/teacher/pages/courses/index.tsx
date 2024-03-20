import Madal from "@/components/shared/madal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { baseurl } from "@/utils/axios";
import { useFolder, useTeacherId } from "@/utils/zuztand";
import {
  Avatar,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface Teacher {
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

const Courses = () => {
  const { onOpen, onClose } = useFolder();

  const { updateLastName } = useTeacherId();

  const [data, setData] = useState<Teacher>();
  const [form] = Form.useForm();

<<<<<<< HEAD
  useEffect(() => {
    baseurl.get("/profile").then((res) => {
      setData(res.data), updateLastName(res?.data.user._id);
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
=======
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files: any = e.target.files
		const formData = new FormData()
		formData.append('profileImage', files[0])
	
		baseurl
			.put(`/profile/image`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => {
				setData(res.data)
				message.success('Updated profile image')
			})
	}
	
>>>>>>> 793419aa8d5d4d333d96975614b4569981a2c817

    baseurl
      .put(`/profile/image`, {
        profileImage: files[0],
      })
      .then((res) => {
        setData(res.data);
        message.success("Updated profile image");
      })
      .catch((err) => message.error("Updated profile cannot image"));
  };

  const onFinish = async (values: any) => {
    baseurl
      .put(`/profile`, {
        user: {
          ...values,
        },
      })
      .then((res) => {
        setData(res.data);
        onClose();
        form.resetFields();
      });
  };

  return (
    <div className="relative">
      <div className="p-2 bg-slate-500 h-[200px] flex justify-center items-center relative">
        <Avatar
          src={data?.user.profileImage?.path}
          className="absolute bottom-[-100px] w-[200px] h-[200px] bg-red-600 rounded-full border-4 border-white"
          size={"large"}
        />
      </div>
      <div className="mt-[150px] flex justify-center flex-col items-center gap-4">
        <h1 className="text-4xl">{data?.user?.email}</h1>
        <h1 className="text-4xl">{data?.user?.name}</h1>
        <h1 className="text-4xl uppercase">{data?.user?.role}</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="text-lg font-bold"></Label>
          <label className="cursor-pointer bg-gray-100 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200">
            <input
              onChange={onChange}
              id="picture"
              type="file"
              className="hidden"
            />
            Upload Image
          </label>
        </div>
      </div>

      <FloatButton
        onClick={() => onOpen()}
        className="w-[100px] h-[30px] absolute top-[20px] right-[20px] rounded-full bg-blue-500 shadow-lg"
        icon={<Pencil />}
        type="primary"
        shape="square"
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

export default Courses;
