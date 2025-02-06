import React from 'react';
import img1 from '../../../public/teacher.png'
import img2 from '../../../public/muy.jpg'
import img3 from '../../../public/lang.jpg'
import img4 from '../../../public/theng.png'
import img5 from '../../../public/tey.jpg'

const TeamComponent: React.FC = () => {
    return (
        <section>
            <div className="relative w-full h-96 ">
                <div className="absolute inset-0 h-4/6 w-full"></div>
                <div className="relative pt-2 text-center">
                    <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-black mb-4 text-[20px] lg:text-4xl mt-10">
                        Our Team
                    </h2>
                    <p className="block antialiased font-sans text-[14px] font-normal leading-relaxed text-black mb-9 opacity-70">
                        The section appears to be a simple and straightforward way to introduce the team members to the
                        website visitors.<br/>
                        It provides basic information about each person's role and background.
                    </p>
                </div>
            </div>
            <div className="-mt-44 mb-8 px-8">
                <div className="container mx-auto">
                    <div
                        className="py-10 flex justify-center items-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
                    <div className="flex flex-col justify-center ">
                            <div
                                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                <div className="w-full md:w-[150px] bg-white grid place-items-center">
                                    <img
                                        src={img1}
                                        alt="tailwind logo"
                                        className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                    />
                                </div>
                                <div className="w-full md:w-2/1 bg-white flex flex-col space-y-2 p-3">
                                    <div className="flex justify-between items-center">
                                    </div>
                                    <h3 className="font-black text-gray-800 md:text-[20px] text-[16px]">BOU Channa</h3>
                                    <p className="md:text-[14px] text-gray-500 text-base">
                                    - Client of Project: CCUN <br/>
                                        - Lecturer of Institute of Technology of Cambodia
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between gap-6 mt-6">
                                <div className="flex flex-col justify-center ">
                                    <div
                                        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                        <div className="w-full md:w-[150px] bg-white grid place-items-center">
                                            <img
                                                src={img4}
                                                alt="tailwind logo"
                                                className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/1 bg-white flex flex-col space-y-2 p-3">
                                            <div className="flex justify-between items-center">
                                            </div>
                                            <h3 className="font-black text-gray-800 md:text-[20px] text-[16px]">SE
                                                LYTHENG</h3>
                                            <p className="md:text-[14px] text-gray-500 text-base">
                                                - Leader Team AND Project Management<br/>
                                                - Back-End Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center ">
                                    <div
                                        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                        <div className="w-full md:w-[150px] bg-white grid place-items-center">
                                            <img
                                                src={img5}
                                                alt="tailwind logo"
                                                className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/1 bg-white flex flex-col space-y-2 p-3">
                                            <div className="flex justify-between items-center">
                                            </div>
                                            <h3 className="font-black text-gray-800 md:text-[20px] text-[16px]">SORPORN
                                                SOVORTEY</h3>
                                            <p className="md:text-[14px] text-gray-500 text-base">
                                                - Back-End Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div><div className="flex justify-between gap-10 mt-6">
                                <div className="flex flex-col justify-center ">
                                    <div
                                        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                        <div className="w-full md:w-[150px] bg-white grid place-items-center">
                                            <img
                                                src={img2}
                                                alt="tailwind logo"
                                                className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/1 bg-white flex flex-col space-y-2 p-3">
                                            <div className="flex justify-between items-center">
                                            </div>
                                            <h3 className="font-black text-gray-800 md:text-[20px] text-[16px]">PIN
                                                SEAVMUY</h3>
                                            <p className="md:text-[14px] text-gray-500 text-base">
                                                - Front-End Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center mr-[43px]">
                                    <div
                                        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                        <div className="w-full md:w-[150px] bg-white grid place-items-center">
                                            <img
                                                src={img3}
                                                alt="tailwind logo"
                                                className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/1 bg-white flex flex-col space-y-2 p-3 ">
                                            <div className="flex justify-between items-center">
                                            </div>
                                            <h3 className="font-black text-gray-800 md:text-[20px] text-[16px]">POM
                                                MOUYLANG </h3>
                                            <p className="md:text-[14px] text-gray-500 text-base">
                                                - Front-End Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    </div>

                    </div>

                </div>
            </div>
        </section>
    );
};


export default TeamComponent;