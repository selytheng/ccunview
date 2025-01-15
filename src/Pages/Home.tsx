import { useState } from 'react';
import Navbar from '../components/Navbar';
import DepartmentBtn from "../components/Buttons/DepartmentBtn.tsx";
import YearBtn from "../components/Buttons/YearBtn.tsx";
import Carousel from "../components/SliderImage.tsx";

const Home = () => {
    const [activeDropdown, setActiveDropdown] = useState<null | 'department' | 'year'>(null);

    const handleDropdownToggle = (dropdown: 'department' | 'year') => {
        setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
    };

    return (
        <div className='home-container'>
            <Navbar />
            <Carousel />
            <section className='home-section p-4'>
                <div className="flex items-center gap-3 mt-6 mb-4">
                    <div className='home-container text-lg font-semibold pr-10'>
                        All Courses
                    </div>
                    <DepartmentBtn isOpen={activeDropdown === 'department'} onToggle={() => handleDropdownToggle('department')} />
                    <YearBtn isOpen={activeDropdown === 'year'} onToggle={() => handleDropdownToggle('year')} />
                </div>
                <div className="border-2 border-black h-96 ">
                    {/*<CourseComponent/>*/}
                </div>
            </section>
        </div>
    );
};

export default Home;
