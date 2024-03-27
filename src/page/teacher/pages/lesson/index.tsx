import { baseurl } from "@/utils/axios";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";

interface Homework {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  group: string;
  student: string;
}

interface Material {
  id: string;
  title: string;
  description: string;
  group: string;
  student: string;
  fileType: string;
  file: string;
}

const { Option } = Select;

const Lesson = () => {
  const [homeworkModalVisible, setHomeworkModalVisible] = useState(false);
  const [materialModalVisible, setMaterialModalVisible] = useState(false);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const [homeworkForm] = Form.useForm();
  const [materialForm] = Form.useForm();

  //   console.log(, 1111);

  useEffect(() => {
    getAllHomework();
    getAllMaterials();
    fetchGroups();
  }, []);

  const handleCreateHomework = () => {
    setHomeworkModalVisible(true);
  };

  const handleCreateMaterial = () => {
    setMaterialModalVisible(true);
  };

  const onFinishHomework = async (values: any) => {
    baseurl
      .post(`/homework`, values)
      .then((res) => message.success("Homework create !"));
  };

  const onFinishMaterial = async (values: any) => {
    // try {
    //   const formData = new FormData();
    //   formData.append("title", values.title);
    //   formData.append("description", values.description);
    //   formData.append("group", values.group);
    //   formData.append("student", values.student);
    //   fileList.forEach((file) => {
    //     formData.append("file", file.originFileObj);
    //   });
    //   const result = await baseurl.post("/materials", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   setMaterials([...materials, result.data]);
    //   setMaterialModalVisible(false);
    //   materialForm.resetFields();
    //   setFileList([]);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const getAllHomework = async () => {
    try {
      const result = await baseurl.get("/homework");
      setHomeworks(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllMaterials = async () => {
    try {
      const result = await baseurl.get("/materials");
      setMaterials(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGroups = async () => {
    try {
      const result = await baseurl.get("/groups");
      setGroups(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteHomework = async (id: string) => {
    try {
      await baseurl.delete(`/homework/${id}`);
      setHomeworks(homeworks.filter((homework) => homework.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      await baseurl.delete(`/material/${materials?._id}/uploud`);
      setMaterials(materials.filter((material) => material.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const groupsdata: any = [];

  groups.map((e: any, i) => {
    groupsdata.push({
      ...e,
      label: e?.name,
      value: e._id,
    });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    const iduploud = materials[0]?._id;

    baseurl
      .post(`materials/${iduploud}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        message.success("Updated profile image");
      })
      .catch((err) => console.log(err));
  };

  const homeworkModal = (
    <Modal
      title="Create Homework"
      open={homeworkModalVisible}
      onCancel={() => setHomeworkModalVisible(false)}
      footer={null}
    >
      <div className="flex w-full items-center">
        <Form
          form={homeworkForm}
          layout="vertical"
          className="w-full"
          onFinish={onFinishHomework}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter homework title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter homework description" rows={4} />
          </Form.Item>
          <Form.Item
            name="dueDate"
            rules={[
              { required: true, message: "Please input your Date Of Birth!" },
            ]}
          >
            <DatePicker size="large" className="w-full" />
          </Form.Item>
          <Form.Item
            name="groupId"
            label="Group"
            rules={[{ required: true, message: "Please select a group" }]}
          >
            <Select options={groupsdata} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );

  const materialModal = (
    <Modal
      title="Create Material"
      open={materialModalVisible}
      onCancel={() => setMaterialModalVisible(false)}
      footer={null}
    >
      <div>
        <Form form={materialForm} layout="vertical" onFinish={onFinishMaterial}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter material title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter material description" rows={4} />
          </Form.Item>
          <Form.Item
            name="groupId"
            label="Group"
            rules={[{ required: true, message: "Please select a group" }]}
          >
            <Select options={groupsdata} />
          </Form.Item>
          <Form.Item
            name="file"
            label="File"
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <label className="cursor-pointer w-full bg-gray-100 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200">
              <input
                onChange={onChange}
                id="picture"
                type="file"
                name="file"
                style={{ display: "none" }}
              />
              Upload Image
            </label>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );

  const homeworkColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Homework, b: Homework) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: Homework, b: Homework) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a: Homework, b: Homework) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      render: (date: Date) =>
        date instanceof Date ? date.toLocaleDateString() : "",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      sorter: (a: Homework, b: Homework) => a.group.localeCompare(b.group),
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      sorter: (a: Homework, b: Homework) => a.student.localeCompare(b.student),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Homework) => (
        <Button onClick={() => handleDeleteHomework(record.id)} danger>
          Delete
        </Button>
      ),
    },
  ];

  const materialColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Material, b: Material) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: Material, b: Material) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      sorter: (a: Material, b: Material) => a.group.localeCompare(b.group),
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      sorter: (a: Material, b: Material) => a.student.localeCompare(b.student),
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
      sorter: (a: Material, b: Material) =>
        a.fileType.localeCompare(b.fileType),
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (text: string, record: Material) => (
        <a href={record.file} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Material) => (
        <Space size="middle">
          <Button
            onClick={() => handleDeleteMaterial(record.id)}
            danger
            type="primary"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 bg-green-500 text-white p-2">
        Lesson
      </h1>
      <div className="flex mb-4">
        <Button
          onClick={handleCreateHomework}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Homework
        </Button>
        <Button
          onClick={handleCreateMaterial}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Material
        </Button>
      </div>

      <h2 className="text-xl font-bold mb-2">Homeworks</h2>
      <Table dataSource={homeworks} columns={homeworkColumns} rowKey="id" />

      <h2 className="text-xl font-bold mb-2 mt-4">Materials</h2>
      <Table dataSource={materials} columns={materialColumns} rowKey="id" />

      {homeworkModal}
      {materialModal}
    </div>
  );
};

export default Lesson;
