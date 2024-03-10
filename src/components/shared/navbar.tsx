import { linksByRole } from "../../Constants";
import { Link, NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";

const Saidbar = () => {
  // const curentUser = "admin";

  const curentUser = localStorage.getItem("role");

  const userLinks = linksByRole[curentUser] || [];

  return (
    <div className="py-2 px-7  w-full fixed top-0 left-0 z-20 bg-slate-100 border flex justify-between items-center">
      <Link to={"/"} className="font-bold text-2xl text-black">
        Educeshn
      </Link>
      <div className="ml-3 flex items-center">
        {userLinks.map((e) => (
          <div key={e.id}>
            <NavLink
              className={
                "flex items-center justify-self-end gap-4 opacity-80 hover:opacity-100 p-2 text-black dark:text-white"
              }
              to={e.path}
            >
              <p className="text-1xl">{e.icon}</p>
              {<h3 className="text-1xl font-mono">{e.name}</h3>}
            </NavLink>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saidbar;
