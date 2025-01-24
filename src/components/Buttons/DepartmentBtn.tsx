import { useState, useEffect, useRef } from 'react';
import { ArrowDropDown } from "@mui/icons-material";

const departments = [
    'Computer Science',
    'Information Technology',
    'Business Administration',
    'Graphic Design',
    'Marketing',
    'Cybersecurity',
    'Data Science',
    'Software Engineering',
    'Web Development',
    'Artificial Intelligence'
];

const DepartmentBtn = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);  // Type added for TypeScript

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    const handleDepartmentSelect = (department: string) => {
        setSelectedDepartment(department);
        setIsDropdownOpen(false);
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
                    className="flex items-center gap-3 p-2  rounded-lg border-[#071952] border-2 hover:bg-gray-400 hover:border-[#fff] focus:outline-none"
                    onClick={toggleDropdown}
                >
                    {selectedDepartment || 'Select Department'} <ArrowDropDown className='icon' />
                </button>
                {isDropdownOpen && (
                    <ul className="absolute w-52 left-0 mt-2 border border-black bg-white shadow-lg rounded-md">
                        {departments.map((department, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleDepartmentSelect(department)}
                            >
                                {department}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DepartmentBtn;