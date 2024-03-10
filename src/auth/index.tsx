import React from "react";
import { Navigate } from "react-router-dom";

const user = {
  simple: "ghost",
  student: "student",
  admin: "admin",
  teacher: "teacher",
};

const curentUser = "admin";

export const PuplickRoute = ({ children }: any) => {
  return <>{children}</>;
};

export const StudentRoute = ({ children }: any) => {
  if (
    curentUser === user.student &&
    curentUser !== user.admin &&
    curentUser !== user.teacher
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export const TeacherRoute = ({ children }: any) => {
  if (
    curentUser === user.teacher &&
    curentUser !== user.admin &&
    curentUser !== user.student
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export const AdminRoute = ({ children }: any) => {
  if (
    curentUser === user.admin &&
    curentUser !== user.teacher &&
    curentUser !== user.student
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};
