import React from 'react';
import Navbar from "../components/Navbar.tsx";
import NavbarLink from "../components/NavbarLink.tsx";

const News: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div className="mb-[-2px]"><NavbarLink/></div>
            <section>
                <div className="relative w-full h-96 mt-28">
                    {/*<img*/}
                    {/*    className="absolute h-full w-full object-cover object-center"*/}
                    {/*    src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"*/}
                    {/*    alt="nature image"*/}
                    {/*/>*/}
                    <div className="absolute inset-0 h-full w-full bg-[#071952]"></div>
                    <div className="relative pt-28 text-center">
                        <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
                            News
                        </h2>
                        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum
                            mi nec, ultricies metus.
                        </p>
                    </div>
                </div>
                <div className="-mt-16 mb-8 px-4 sm:px-8">
                    <div className="container mx-auto">
                        <div
                            className="py-12 flex flex-col sm:flex-row justify-center rounded-xl border border-white bg-white  shadow-black/5 saturate-200">
                            <div className="flex flex-col justify-center w-full sm:w-auto">
                                {/* Card */}
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                                    {/* First Card */}
                                    <div className="flex justify-center items-center w-full sm:w-1/2">
                                        <div className="max-w-[720px] mx-auto">
                                            {/* Centering wrapper */}
                                            <div
                                                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                                                <div
                                                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                        UI/UX Review Check
                                                    </h5>
                                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                        The place is close to Barceloneta Beach and bus stop just 2 min
                                                        by walk and near to "Naviglio"
                                                        where you can enjoy the main night life in Barcelona.
                                                    </p>
                                                </div>
                                                <div className="p-6 pt-0">
                                                    <button
                                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text -xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                        type="button"
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Second Card */}
                                    <div className="flex justify-center items-center w-full sm:w-1/2">
                                        <div className="max-w-[720px] mx-auto">

                                            {/* Centering wrapper */}
                                            <div
                                                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                                                <div
                                                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                        UI/UX Review Check
                                                    </h5>
                                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                        The place is close to Barceloneta Beach and bus stop just 2 min
                                                        by walk and near to "Naviglio"
                                                        where you can enjoy the main night life in Barcelona.
                                                    </p>
                                                </div>
                                                <div className="p-6 pt-0">
                                                    <button
                                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                        type="button"
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-20">
                                    {/* First Card */}
                                    <div className="flex justify-center items-center w-full sm:w-1/2">
                                        <div className="max-w-[720px] mx-auto">
                                            {/* Centering wrapper */}
                                            <div
                                                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                                                <div
                                                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                        UI/UX Review Check
                                                    </h5>
                                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                        The place is close to Barceloneta Beach and bus stop just 2 min
                                                        by walk and near to "Naviglio"
                                                        where you can enjoy the main night life in Barcelona.
                                                    </p>
                                                </div>
                                                <div className="p-6 pt-0">
                                                    <button
                                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text -xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                        type="button"
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Second Card */}
                                    <div className="flex justify-center items-center w-full sm:w-1/2">
                                        <div className="max-w-[720px] mx-auto">

                                            {/* Centering wrapper */}
                                            <div
                                                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                                                <div
                                                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                        UI/UX Review Check
                                                    </h5>
                                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                        The place is close to Barceloneta Beach and bus stop just 2 min
                                                        by walk and near to "Naviglio"
                                                        where you can enjoy the main night life in Barcelona.
                                                    </p>
                                                </div>
                                                <div className="p-6 pt-0">
                                                    <button
                                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                        type="button"
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default News;