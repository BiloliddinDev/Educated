import Madal from "@/components/shared/madal";
import { Button } from "@/components/ui/button";
import { useFolder } from "@/utils/zuztand";
import React from "react";

const Admin = () => {
  const { onOpen } = useFolder();
  return (
    <div className="mt-[60px] w-full flex">
      <div className="bg-slate-400 w-[200px] h-[682px] py-10 px-4 flex flex-col gap-4">
        <Button onClick={() => onOpen()}>Create Teacher</Button>
        <Button onClick={() => onOpen()}>Create Group</Button>
        <Button onClick={() => onOpen()}>Create Student</Button>
      </div>
      <h1 className="w-full">Admin page</h1>

      <Madal>
        <h1>Salom Dunyo</h1>
      </Madal>
    </div>
  );
};

export default Admin;
