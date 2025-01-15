import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Courses from './Pages/Courses';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminCourse from './Pages/Admin/Course/AdminCourse';
import AdminTraining from './Pages/Admin/AdminTraining';
import AdminWorkshop from './Pages/Admin/AdminWorkshop';
import AdminEvent from './Pages/Admin/AdminEvent';
import AdminMajor from './Pages/Admin/AdminMajor';
import AdminPartner from './Pages/Admin/AdminPartner';
import Feedback from './Pages/Admin/Feedback';
import CourseDetail from './Pages/Admin/Course/CourseDetail';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/course" element={<AdminCourse />} />
          <Route path="/admin/training" element={<AdminTraining />} />
          <Route path="/admin/workshop" element={<AdminWorkshop />} />
          <Route path="/admin/event" element={<AdminEvent />} />
          <Route path="/admin/major" element={<AdminMajor />} />
          <Route path="/admin/partner" element={<AdminPartner />} />
          <Route path="/admin/feedback" element={<Feedback />} />

          <Route path="/course/:id" element={<CourseDetail />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
