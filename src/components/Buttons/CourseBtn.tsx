import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api";

const CourseBtn = ({ onFilterChange }) => {
    console.log("CourseBtn rendered");
    const [partners, setPartners] = useState([]);
    const [majors, setMajors] = useState([]);

    const [selectedPartner, setSelectedPartner] = useState(null);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const [isPartnerOpen, setIsPartnerOpen] = useState(false);
    const [isMajorOpen, setIsMajorOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);

    const partnerRef = useRef(null);
    const majorRef = useRef(null);
    const yearRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/partners`)
            .then(res => res.json())
            .then(data => setPartners(data));
    }, []);

    useEffect(() => {
        if (selectedPartner) {
            fetch(`${API_BASE_URL}/partners/${selectedPartner}/majors`)
                .then(res => res.json())
                .then(data => setMajors(data));
        }
    }, [selectedPartner]);

    useEffect(() => {
        // Notify parent component of filter changes
        onFilterChange({
            partnerId: selectedPartner,
            majorId: selectedMajor,
            yearId: selectedYear
        });
    }, [selectedPartner, selectedMajor, selectedYear, onFilterChange]);

    const handleOutsideClick = (event) => {
        if (partnerRef.current && !partnerRef.current.contains(event.target)) {
            setIsPartnerOpen(false);
        }
        if (majorRef.current && !majorRef.current.contains(event.target)) {
            setIsMajorOpen(false);
        }
        if (yearRef.current && !yearRef.current.contains(event.target)) {
            setIsYearOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex gap-2 z-10">
            <div className="relative" ref={partnerRef}>
                <button
                    className="flex items-center gap-3 p-2 rounded-lg border-2 border-[#071952] hover:bg-gray-400"
                    onClick={() => setIsPartnerOpen(!isPartnerOpen)}
                >
                    {selectedPartner ? partners.find(p => p.id === selectedPartner)?.name : 'Select Partner'} 
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isPartnerOpen && (
                    <ul className="absolute w-56 left-0 mt-2 border bg-white shadow-lg rounded-md">
                        <li
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setSelectedPartner(null);
                                setSelectedMajor(null);
                                setIsPartnerOpen(false);
                            }}
                        >
                            All Partners
                        </li>
                        {partners.map(partner => (
                            <li
                                key={partner.id}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    setSelectedPartner(partner.id);
                                    setSelectedMajor(null);
                                    setIsPartnerOpen(false);
                                }}
                            >
                                {partner.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative" ref={majorRef}>
                <button
                    className="flex items-center gap-3 p-2 rounded-lg border-2 border-[#071952] hover:bg-gray-400"
                    onClick={() => setIsMajorOpen(!isMajorOpen)}
                    disabled={!selectedPartner}
                >
                    {selectedMajor ? majors.find(m => m.id === selectedMajor)?.name : 'Select Major'} 
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isMajorOpen && selectedPartner && (
                    <ul className="absolute w-56 left-0 mt-2 border bg-white shadow-lg rounded-md">
                        <li
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setSelectedMajor(null);
                                setIsMajorOpen(false);
                            }}
                        >
                            All Majors
                        </li>
                        {majors.map(major => (
                            <li
                                key={major.id}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    setSelectedMajor(major.id);
                                    setIsMajorOpen(false);
                                }}
                            >
                                {major.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative" ref={yearRef}>
                <button
                    className="flex items-center gap-3 p-2 rounded-lg border-2 border-[#071952] hover:bg-gray-400"
                    onClick={() => setIsYearOpen(!isYearOpen)}
                >
                    {selectedYear ? `Year ${selectedYear}` : 'Select Year'} 
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isYearOpen && (
                    <ul className="absolute w-32 left-0 mt-2 border bg-white shadow-lg rounded-md">
                        <li
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setSelectedYear(null);
                                setIsYearOpen(false);
                            }}
                        >
                            All Years
                        </li>
                        {[1, 2, 3, 4, 5].map(year => (
                            <li
                                key={year}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    setSelectedYear(year);
                                    setIsYearOpen(false);
                                }}
                            >
                                {`Year ${year}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CourseBtn;
