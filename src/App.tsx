import { Routes, Route } from "react-router-dom";
import Layouts from "./layouts";
import Home from "./page/home";
import Admin from "./page/admin";
import Student from "./page/student";
import { AdminRoute, PuplickRoute, StudentRoute, TeacherRoute } from "./auth";
import Login from "./page/login";
import Teacher from "./page/teacher";
import Materials from "./page/student/pages/materials";
import Info from "./page/student/pages/info/info";
import Groups from "./page/teacher/pages/group";
import Lesson from "./page/teacher/pages/lesson";
import Curses from "./page/teacher/pages/courses";

function App() {
  return (
    <div className="App">
      <Layouts>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            index
            path="/"
            element={
              <PuplickRoute>
                <Home />
              </PuplickRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <TeacherRoute>
                <Teacher />
              </TeacherRoute>
            }
          >
            <Route path="groups" element={<Groups />} />
            <Route path="lesson" element={<Lesson />} />
            <Route path="courses" element={<Curses />} />
          </Route>
          <Route
            path="/student"
            element={
              <StudentRoute>
                <Student />
              </StudentRoute>
            }
          >
            <Route path="courses" element={<Curses />} />
            <Route path="materials" element={<Materials />} />
            <Route path="info" element={<Info />} />
          </Route>
          <Route
            path="*"
            element={
              <h1 className="text-center flex justify-center items-center h-screen">
                Page not Faund
              </h1>
            }
          />
        </Routes>
      </Layouts>
    </div>
  );
}

export default App;
