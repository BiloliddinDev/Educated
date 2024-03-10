export const linksByRole = {
  ghost: [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: 2,
      name: "Login",
      path: "/login",
      icon: <i className="fa-solid fa-right-to-bracket"></i>,
    },
  ],

  admin: [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: 4,
      name: "Admin",
      path: "/admin",
      icon: <i className="fa-solid fa-lock"></i>,
    },
  ],
  teacher: [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: 3,
      name: "Teacher",
      path: "/teacher",
      icon: <i className="fa-solid fa-user-tie"></i>,
    },
  ],
  student: [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: 2,
      name: "Student",
      path: "/student",
      icon: <i className="fa-solid fa-graduation-cap"></i>,
    },
  ],
};
