import React from 'react';
import image from "../../../public/workshop.jpg"

const ContactComponent: React.FC = () => {
    return (
        <section>
            <div className="relative w-full h-96 ">
                <img
                    className="absolute h-full w-full object-cover object-center "
                    src={image}
                    alt="nature image"
                />
                <div className="absolute inset-0 h-full w-full bg-black/50"></div>
                <div className="relative pt-28 text-center">
                    <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-5xl lg:text-4xl">
                       Work Shop
                    </h2>
                </div>
            </div>
            <div className="-mt-16 mb-8 px-8">
                <div className="container mx-auto">
                    <div className="py-12 flex justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">

                    </div>
                </div>
            </div>
        </section>
    );
};


export default ContactComponent;