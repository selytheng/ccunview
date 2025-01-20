import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCourse from "./Pages/Admin/Course/AdminCourse";
import CourseEdit from "./Pages/Admin/Course/CourseEdit";
import CourseCreate from "./Pages/Admin/Course/CourseCreate";
import AdminTraining from "./Pages/Admin/AdminTraining";
import AdminWorkshop from "./Pages/Admin/AdminWorkshop";
import AdminEvent from "./Pages/Admin/Event/AdminEvent";
import AdminEventDetail from "./Pages/Admin/Event/AdminEventDetail";
import AdminPartner from "./Pages/Admin/Partner/AdminPartner";
import Feedback from "./Pages/Admin/Feedback";
import CourseDetail from "./Pages/Admin/Course/CourseDetail";
import AdminRoute from "../src/components/AdminRoute";
import AdminProfile from "./Pages/Admin/AdminProfile";
import News from "./Pages/News.tsx";
import AdminMajor from "./Pages/Admin/Major/AdminMajor";
import Users from "./Pages/SuperAdmin/Users";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* SuperAdmin and Admin Routes */}
          <Route
            path="/superadmin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/course"
            element={
              <AdminRoute>
                <AdminCourse />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/course/create"
            element={
              <AdminRoute>
                <CourseCreate />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/course/edit/:courseId"
            element={
              <AdminRoute>
                <CourseEdit />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/course/:id"
            element={
              <AdminRoute>
                <CourseDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/training"
            element={
              <AdminRoute>
                <AdminTraining />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/workshop"
            element={
              <AdminRoute>
                <AdminWorkshop />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/event"
            element={
              <AdminRoute>
                <AdminEvent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events/:id"
            element={
              <AdminRoute>
                <AdminEventDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/major"
            element={
              <AdminRoute>
                <AdminMajor />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/partner"
            element={
              <AdminRoute>
                <AdminPartner />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <AdminRoute>
                <Feedback />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
