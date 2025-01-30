import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home.tsx";
import Courses from "./Pages/Courses.tsx";
import Login from "./Pages/Login";
import About from "./Pages/About.tsx";
import Contact from "./Pages/Contact.tsx";
import Feedback from "./Pages/Feedback";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCourse from "./Pages/Admin/Course/AdminCourse";
import CourseEdit from "./Pages/Admin/Course/CourseEdit";
// import CourseCreate from "./Pages/Admin/Course/CourseCreate";
import AdminTraining from "./Pages/Admin/Trainings/AdminTraining.tsx";
import AdminTrainingDetail from "./Pages/Admin/Trainings/AdminTrainingDetail";
import AdminWorkshop from "./Pages/Admin/Workshops/AdminWorkshop.tsx";
import AdminWorkshopDetail from "./Pages/Admin/Workshops/AdminWorkshopDetail.tsx";
import AdminEvent from "./Pages/Admin/Event/AdminEvent";
import AdminEventDetail from "./Pages/Admin/Event/AdminEventDetail";
import AdminPartner from "./Pages/Admin/Partner/AdminPartner";
import AdminFeedback from "./Pages/Admin/Feedback/AdminFeedback.tsx";
import CourseDetail from "./Pages/Admin/Course/CourseDetail";
import AdminRoute from "../src/components/AdminRoute";
import AdminProfile from "./Pages/Admin/Profile/AdminProfile";
import News from "./Pages/News.tsx";
import AdminMajor from "./Pages/Admin/Major/AdminMajor";
import Users from "./Pages/SuperAdmin/Users";
import Workshop from "./Pages/Workshops";
import Training from "./Pages/Training";
import CourseCreate from "./Pages/Admin/Course/CourseCreate";
import SuperAdminRoute from "../src/components/SuperAdminRoute";
import Major from "./Pages/Major.tsx";
import CourseDetailUser from "./Pages/User/Course/CourseDetail.tsx";
import AdminEventDetailUser from "./Pages/User/Event/EventsDetail.tsx";
import EventDetailUser from "./Pages/User/Event/EventsDetail.tsx";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/training" element={<Training />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/major" element={<Major />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/user/course/:id" element={<CourseDetailUser />} />
          <Route path="/user/events/:id" element={<EventDetailUser />} />
          <Route path="/login" element={<Login />} />


          {/* SuperAdmin Routes */}
          <Route
            path="superadmin/*"
            element={
              <SuperAdminRoute>
                <Routes>
                  <Route path="users" element={<Users />} />
                  <Route path="partner" element={<AdminPartner />} />
                  {/* Add more SuperAdmin routes here */}
                </Routes>
              </SuperAdminRoute>
            }
          />
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route
                    path="course/*"
                    element={
                      <Routes>
                        <Route path="" element={<AdminCourse />} />
                        <Route path="create" element={<CourseCreate />} />
                        <Route path="edit/:courseId" element={<CourseEdit />} />
                        <Route path=":id" element={<CourseDetail />} />
                      </Routes>
                    }
                  />
                  <Route path="trainings" element={<AdminTraining />} />
                  <Route path="trainings/:id" element={<AdminTrainingDetail />} />
                  <Route path="workshops" element={<AdminWorkshop />} />
                  <Route path="workshops/:id" element={<AdminWorkshopDetail />} />
                  <Route path="events/:id" element={<AdminEventDetail />} />
                  <Route path="events" element={<AdminEvent />} />
                  <Route path="events/:id" element={<AdminEventDetail />} />
                  <Route path="major" element={<AdminMajor />} />
                  <Route path="feedback" element={<AdminFeedback />} />
                  <Route path="profile" element={<AdminProfile />} />
                  {/* Add more Admin routes here */}
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
