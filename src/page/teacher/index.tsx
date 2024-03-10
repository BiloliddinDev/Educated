import Madal from "@/components/shared/madal";
import UserNav from "@/components/shared/userui";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Teacher = () => {
  return (
    <div className="text-center w-full flex">
      <UserNav image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH0xijudlNew8LaynN9dwUQUxWIMHOC1P9qg&usqp=CAU">
        <Link to={"/teacher/groups"}>Groups</Link>
        <Link to={"/teacher/lesson"}>Lesson</Link>
        <Link to={"/teacher/courses"}>Cursess</Link>
      </UserNav>
      <div className="mt-[60px] w-full">
        <Outlet />
      </div>
      <Madal>
        <h1>Title</h1>
      </Madal>
    </div>
  );
};

export default Teacher;
