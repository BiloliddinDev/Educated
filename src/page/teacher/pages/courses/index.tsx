import Madal from "@/components/shared/madal";
import { baseurl } from "@/utils/axios";
import { useFolder } from "@/utils/zuztand";
import { Avatar } from "antd";
import { useEffect, useState } from "react";

const Curses = () => {
  const { onOpen } = useFolder();

  const [data, setData] = useState();

  useEffect(() => {
    baseurl.get("/profile").then((res) => setData(res?.data));
  }, []);

  console.log(data);
  return (
    <div>
      <div className="p-2 bg-slate-500 h-[200px]">
        <Avatar></Avatar>
      </div>
      <div className="flex m-2">
        <div
          onClick={() => onOpen()}
          className="w-[200px] h-[200px] bg-orange-600 flex cursor-pointer flex-col justify-center items-center gap-4 text-white"
        >
          <i className="fa-solid fa-pen text-3xl"></i>
          <p className="text-2xl font-mono">Create Curs</p>
        </div>
      </div>

      <Madal>
        <h1>Create cures</h1>
      </Madal>
    </div>
  );
};

export default Curses;
