import Navbar from '../components/Navbar';
import DepartmentBtn from "../components/Buttons/DepartmentBtn.tsx";
import YearBtn from "../components/Buttons/YearBtn.tsx";
import Carousel from "../components/SliderImage.tsx";
import Course from "../components/HomeComponent/CourseComponent.tsx";
import Trainging from "../components/HomeComponent/TrainingComponent.tsx";
import AboutComponent from "../components/HomeComponent/AboutComponent.tsx";
import ContactComponent from "../components/HomeComponent/ContactComponent.tsx";
import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";
import WorkshopComponent from "../components/HomeComponent/WorkshopComponent.tsx";

const Home = () => {
    return (
        <div className='home-container'>
            <Navbar />
            <Carousel />
            <section className='home-section p-4'>
                <div className="flex items-center gap-3 mt-6 mb-4 ml-5">
                    <div className='home-container text-lg font-semibold pr-10'>
                        All Courses
                    </div>
                    <DepartmentBtn  />
                    <YearBtn />
                </div>
                <div className="">
                    <Course/>
                </div>
            </section>
            <section className='home-container p-4 '>
                <div className='home-container text-lg font-semibold mb-5 ml-5'>
                    Training
                </div>
                <div className="">
                    <Trainging/>
                </div>
            </section>
            <section className='home-container'>
                <WorkshopComponent/>
            </section>
            <section className='home-container'>
                <AboutComponent/>
            </section>
            <section className='home-container'>
                <ContactComponent/>
            </section>
            <section className='home-container'>
                <FooterComponent/>
            </section>
        </div>
    );
};

export default Home;
