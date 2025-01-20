import Navbar from '../../components/Navbar.tsx';
import DepartmentBtn from "../../components/Buttons/DepartmentBtn.tsx";
import YearBtn from "../../components/Buttons/YearBtn.tsx";
import Carousel from "../../components/SliderImage.tsx";
import Course from "../../components/HomeComponent/CourseComponent.tsx";
import FooterComponent from "../../components/HomeComponent/FooterComponent.tsx";
import WorkshopComponent from "../../components/HomeComponent/WorkshopComponent.tsx";
import TeamComponent from "../../components/HomeComponent/TeamComponent.tsx";
import "../../assets/css/HomePage.css"
import NavbarLink from "../../components/NavbarLink.tsx";
import Training from "../../components/HomeComponent/TrainingComponent.tsx";

const Home = () => {
    return (
        <div className='home-container'>
            <Navbar />
            <div className="mt-[100px]"><NavbarLink/></div>
            <div className="pt-[130px]"><Carousel /></div>
            <section className='course-section p-4'>
                <div className="flex items-center gap-3 mt-6 mb-4 ml-5">
                    <div className='course-container text-2xl font-semibold pr-10'>
                        All Courses
                    </div>
                    <DepartmentBtn  />
                    <YearBtn />
                </div>
                <div className="">
                    <Course/>
                </div>
            </section>
            <section className='train-container p-4 '>
                <div className=' text-2xl font-semibold mb-5 ml-5'>
                    Training
                </div>
                <div>
                    <Training/>
                </div>
            </section>
            <section className='team-container p-4'>
              <TeamComponent/>
            </section>
            <section className='work-container'>
                <WorkshopComponent/>
            </section>
            {/*<section className='about-container'>*/}
            {/*    <AboutComponent/>*/}
            {/*</section>*/}
            {/*<section className='contact-container'>*/}
            {/*    <ContactComponent/>*/}
            {/*</section>*/}
            <section className='footer-container'>
                <FooterComponent/>
            </section>
        </div>
    );
};

export default Home;
