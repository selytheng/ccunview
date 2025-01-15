import { useState, useEffect, useRef } from 'react';
import { ArrowDropDown } from "@mui/icons-material";

const courses = [
    'Web Development',
    'Data Science',
    'Graphic Design',
    'Digital Marketing',
    'Cybersecurity',
    'Mobile App Development',
    'Cloud Computing',
    'Machine Learning',
    'Project Management',
    'UI/UX Design'
];

const DepartmentBtn = () => {
    const [isYearsOpen, setIsYearsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);  // Type added for TypeScript

    const toggleYearsDropdown = () => {
        setIsYearsOpen(prevState => !prevState);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsYearsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='home-container'>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"  // Added for better accessibility and form safety
                    className="flex items-center gap-3 p-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
                    onClick={toggleYearsDropdown}
                >
                    Year <ArrowDropDown className='icon' />
                </button>
                {isYearsOpen && (
                    <ul className="absolute w-52 left-0 mt-2 border border-black bg-white shadow-lg rounded-md">
                        {courses.map((course, index) => (
                            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                                {course}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DepartmentBtn;
