import Saidbar from "@/components/shared/navbar";
import { useLocation } from "react-router-dom";

const Layouts = ({ children }: any) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" ? (
        <div className="text-center bg-slate-700 text-white">
          <Saidbar />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center z-50">{children}</div>
    </div>
  );
};

export default Layouts;
