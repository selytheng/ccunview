import React, { useState, useEffect, useRef } from 'react';
import { ArrowDropDown } from "@mui/icons-material";

const years: string[] = ['I1', 'I2', 'I3', 'I4', 'I5'];

const DepartmentBtn: React.FC = () => {
    const [isYearsOpen, setIsYearsOpen] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleYearsDropdown = () => {
        setIsYearsOpen(prevState => !prevState);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsYearsOpen(false);
        }
    };

    const handleYearSelect = (year: string) => {
        setSelectedYear(year);
        setIsYearsOpen(false);
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
                    type="button"
                    className="flex items-center gap-3 p-2 rounded-lg border-[#071952] border-2 hover:bg-gray-400 hover:border-[#fff] focus:outline-none"
                    onClick={toggleYearsDropdown}
                >
                    {selectedYear || 'Select Year'} <ArrowDropDown className='icon' />
                </button>
                {isYearsOpen && (
                    <ul className="absolute w-20 left-0 mt-2 border border-black bg-white shadow-lg rounded-md">
                        {years.map((year, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DepartmentBtn;