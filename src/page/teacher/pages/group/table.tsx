import { Table, Modal, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { baseurl } from "@/utils/axios";
import { PenSquare, Trash } from "lucide-react";
import Madal from "@/components/shared/madal";
import { useFolder } from "@/utils/zuztand";
import TextArea from "antd/es/input/TextArea";

interface Group {
  _id: string;
  name: string;
  description: string;
  teacher: string;
  students: string[];
}

interface Student {
  _id: string;
  name: string;
}

interface TableGroupProps {
  groups: Group[];
  students: Student[];
  onEdit: (group: Group) => void;
  onDelete: (groupId: string) => void;
  onAddStudent: (groupId: string, studentId: string) => void;
  onRemoveStudent: (groupId: string, studentId: string) => void;
}

const TableGroup = () => {
  const [table, setTable] = useState([]);
  const [update, setUpdate] = useState({});

  //   console.log(update);

  useEffect(() => {
    baseurl.get(`/groups`).then((res) => setTable(res.data));
  }, []);

  const { onOpen } = useFolder();

  const data: any = [];

  const Delete = (e: any) => {
    baseurl
      .delete(`/groups/${e._id}`)
      .then((res) => {
        console.log(res), message.success("Group delete");
        //   window.location.reload();
        // window.location.re;
      })
      .catch((err) => console.log(err));
  };

  //   const Update = (e: any) => {
  //     setUpdate(e);
  //     onOpen();
  //     console.log(e, 1111);
  //   };

  table.map((e: any, i) => {
    data.push({
      ...e,
      key: i,
      id: i + 1,
      teacher: (
        <div className="flex flex-col items-center">
          <img src={e?.teacher?.profileImage?.path} width={100} height={100} />
          <h1>{e?.teacher?.name}</h1>
        </div>
      ),
      description: e.description,
      action: (
        <div className="flex gap-4 justify-between">
          <Button
            onClick={() => Delete(e)}
            className="bg-red-600 hover:bg-red-500"
          >
            <Trash />
          </Button>
          <Button
            // onClick={() => Update(e)}
            className="bg-yellow-500 hover:bg-yellow-400"
          >
            <PenSquare />
          </Button>
        </div>
      ),
    });
  });

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a: number, b: number) => a - b,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "actions",
    },
  ];

  return (
    <>
      <Table
        //   pagination
        expandable={{
          expandedRowRender: (record) => <h1>Salom dunyo</h1>,
          // rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        rowKey={columns.id}
        columns={columns}
        dataSource={data}
      />
      <Madal>
        <div className="flex flex-col justify-center items-center">
          <Form
            // form={form}
            name="group-form"
            // onFinish={handleSubmit}
            autoComplete="off"
            className="flex flex-col justify-center w-full"
          >
            <h1 className="text-xl mb-2">Name</h1>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input group name!" }]}
            >
              <Input
                // defaultValue={update.name}
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
              <TextArea rows={4} className="rounded-md" />
            </Form.Item>
            <Button
              // size={"lg"}
              //   type="primary"
              //   htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Madal>
    </>
  );
};

export default TableGroup;
