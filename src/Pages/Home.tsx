import React from "react";
import Navbar from "../components/Navbar.tsx";
import Carousel from "../components/SliderImage.tsx";
import Course from "../components/HomeComponent/CourseComponent.tsx";
import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";
import TeamComponent from "../components/HomeComponent/TeamComponent.tsx";
import "../assets/css/HomePage.css";
import Events from "./Events.tsx";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="pt-[110px]">
        <Carousel />
      </div>
      <section className="course-section p-4" id="course">
        <div className="flex items-center justify-between gap-3 mt-6 mb-4 ml-5 ">
          <div className="course-container text-2xl font-semibold pr-10">
            All Courses
          </div>
        </div>
        <div className="">
          <Course />
        </div>
      </section>
      <section id="team" className="team-container p-4">
        <TeamComponent />
      </section>
      <section className="work-container">
        <Events />
      </section>
      <section className="footer-container">
        <FooterComponent />
      </section>
    </div>
  );
};

export default Home;
