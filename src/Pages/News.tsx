import React from 'react';
import Navbar from "../components/Navbar.tsx";

const News: React.FC = () => {
    return (
        <>
            <Navbar/>
            <section>
                <div className="relative w-full h-96">
                    <img
                        className="absolute h-full w-full object-cover object-center"
                        src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"
                        alt="nature image"
                    />
                    <div className="absolute inset-0 h-full w-full bg-black/50"></div>
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
                <div className="-mt-16 mb-8 px-8">
                    <div className="container mx-auto">
                        <div
                            className="py-12 flex justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">


                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default News;