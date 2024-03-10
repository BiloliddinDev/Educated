import Madal from "@/components/shared/madal";
import { useFolder } from "@/utils/zuztand";
import React from "react";

const Curses = () => {
  const { onOpen } = useFolder();
  return (
    <div>
      <h1 className="bg-red-500 p-2 text-white">Curs</h1>
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
