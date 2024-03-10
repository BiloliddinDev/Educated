import Madal from "@/components/shared/madal";
import UserNav from "@/components/shared/userui";
import { Link, Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div className="text-center w-full flex">
      <UserNav image="https://github.com/shadcn.png">
        <Link to={"/student/courses"}>Courses</Link>
        <Link to={"/student/materials"}>Materials</Link>
        <Link to={"/student/info"}>Information</Link>
      </UserNav>
      <div className="mt-[60px]">
        <Outlet />
      </div>
      <Madal>
        <h1>Title</h1>
      </Madal>
    </div>
  );
};

export default Student;
