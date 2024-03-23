import { Routes, Route } from "react-router-dom";
import Layouts from "./layouts";
import Home from "./page/home";
import Student from "./page/student";
import { PuplickRoute, StudentRoute, TeacherRoute } from "./auth";
// import Login from "./page/login";
import Teacher from "./page/teacher";
import Materials from "./page/student/pages/materials";
import Info from "./page/student/pages/info/info";
import Groups from "./page/teacher/pages/group";
import Lesson from "./page/teacher/pages/lesson";
import Curses from "./page/teacher/pages/profile";
import { Toaster } from "./components/ui/toaster";
import Profile from './page/teacher/pages/profile'

function App() {
  return (
    <div className="App">
      <Layouts>
        <Toaster />
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
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
            path="/teacher"
            element={
              <TeacherRoute>
                <Teacher />
              </TeacherRoute>
            }
          >
            <Route path="groups" element={<Groups />} />
            <Route path="lesson" element={<Lesson />} />
            <Route path="Profile" element={<Profile />} />
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
