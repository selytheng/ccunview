import React from 'react';

const FooterComponent: React.FC = () => {
    return (
        <div className="bg-[#071952] text-white py-12 p-20">
            <div className="container mx-auto grid md:grid-cols-3 gap-8 pb-10 border-b ">
                {/* ITC e-Learning */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">CCUN Website</h2>
                    <ul className="space-y-4">
                        <li>
                            <strong>ITC e-Learning Center</strong> was selected by <strong>ASEAN Cyber University (ACU)</strong> project, which was first proposed at the ASEAN – South Korea Summit in 2009.
                        </li>
                        <li>
                            <strong>Cambodian Cyber University Network (CCUN)</strong> project, ITC provides technical support to the 5 High Education Institutes (HEI) in Cambodia to create e-learning contents and operation on learning management system (LMS). This CCUN project aims to utilize the digital platform to deliver eLearning contents so that students can access from anywhere at anytime.
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-semibold">Phone: </span> (855) 12 818 830 / (855) 11 685 685
                        </li>
                        <li>
                            <span className="font-semibold">Address: </span> Room 220B, Building B, PO Box 86, Russian Conf. Blvd., Phnom Penh, Cambodia
                        </li>
                        <li>
                            <span className="font-semibold">Email: </span>
                            <a href="mailto:info.itcelearning@gmail.com" className="underline">info.itcelearning@gmail.com</a>
                        </li>
                        <li>
                            <span className="font-semibold">Website: </span>
                            <a href="https://elearning.itc.edu.kh" target="_blank" rel="noopener noreferrer" className="underline">elearning.itc.edu.kh</a>
                        </li>
                        <li>
                            <span className="font-semibold">Moodle: </span>
                            <a href="https://moodle.ccun.edu.kh" target="_blank" rel="noopener noreferrer" className="underline">moodle.ccun.edu.kh</a>
                        </li>
                    </ul>

                    <div className="mt-4">
                        <h3 className="font-bold">Social</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" aria-label="Facebook" className="text-2xl">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="Telegram" className="text-2xl">
                                <i className="fab fa-telegram"></i>
                            </a>
                            <a href="#" aria-label="YouTube" className="text-2xl">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Location</h2>
                    <div className="w-full h-64">
                        <iframe
                            title="ITC e-Learning Location"
                            src="https://maps.google.com/maps?q=Phnom%20Penh&amp;output=embed"
                            className="w-full h-full rounded shadow-lg"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;