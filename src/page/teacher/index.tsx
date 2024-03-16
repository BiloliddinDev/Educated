import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher, FaChartPie } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import type { MenuProps } from "antd";
import { Avatar, Button, Menu } from "antd";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/teacher", <RxDashboard size={20} />),
  getItem("Teachers", "lesson", <FaChalkboardTeacher size={20} />),
  getItem("Students/ classes", "groups", <PiStudent size={20} />),
  getItem("Settings and profile", "courses", <IoMdSettings size={20} />),
  getItem("Exams", "/teacher", <FaChartPie size={20} />),
];

const Teacher = () => {
  const navigation = useNavigate();

  return (
    <div className="w-full">
      <div className="w-[240px] fixed top-0 left-0 h-screen bg-[#152259] flex flex-col items-center pt-[30px]">
        <Avatar
          className="w-[65px] h-[65px]"
          src="https://picsum.photos/200/300"
        />
        <h1 className="text-[20px] font-sans mt-[26px] mb-[45px] text-white">
          Udemy Inter. school
        </h1>
        <Separator className="bg-[#BDBDBD]" />
        <Menu
          onClick={({ key }) => {
            navigation(key);
          }}
          className="bg-transparent text-[14px] text-white mt-[25px]"
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="ml-[245px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
