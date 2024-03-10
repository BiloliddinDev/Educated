import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";
import Madal from "../madal";
import { useFolder } from "@/utils/zuztand";

const UserNav = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image: string;
}) => {
  const { onOpen } = useFolder();
  return (
    <div className="w-[260px] h-screen bg-slate-600 flex flex-col items-center pt-[100px] p-3">
      <Avatar className="cursor-pointer" onClick={() => onOpen()}>
        <AvatarImage src={image} />
        <AvatarFallback>BC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-4 text-white mt-7">{children}</div>
    </div>
  );
};

export default UserNav;
