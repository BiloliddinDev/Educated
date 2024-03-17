import { Navigate } from "react-router-dom";

const user = {
  simple: "ghost",
  student: "student",
  teacher: "teacher",
};

export const PuplickRoute = ({ children }: any) => {
  return <>{children}</>;
};

// Students protected router

export const StudentRoute = ({ children }: any) => {
  const curentUser = localStorage.getItem("role");

  if (curentUser === user.student && curentUser !== user.teacher) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

// Teacher protected router

export const TeacherRoute = ({ children }: any) => {
  const curentUser = localStorage.getItem("role");

  if (curentUser === user.teacher) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};
