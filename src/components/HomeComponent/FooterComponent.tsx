import React from 'react';
import logo from "../../../public/logo_ccun.png";

const FooterComponent: React.FC = () => {
    return (
        <footer className="bg-gray-100 from-gray-100 via-[#bce1ff] to-gray-100">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <img src={logo} className="mr-5 h-52 sm:h-24" alt="logo" />
                        <p className="max-w-xs mt-4 text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
                        <FooterColumn title="Company" links={['About', 'Meet the Team', 'History', 'Careers']} />
                        <FooterColumn title="Services" links={['1on1 Coaching', 'Company Review', 'Accounts Review', 'HR Consulting', 'SEO Optimisation']} />
                        <FooterColumn title="Helpful Links" links={['Contact', 'FAQs', 'Live Chat']} />
                        <FooterColumn title="Legal" links={['Privacy Policy', 'Terms & Conditions', 'Returns Policy', 'Accessibility']} />
                    </div>
                </div>
                <p className="mt-8 text-xs text-gray-800">© 2025 Cambodia Cyber Univercity Network (CCUN) </p>
            </div>
        </footer>
    );
};

const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
    <div>
        <p className="font-medium">{title}</p>
        <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
            {links.map((link, index) => (
                <a key={index} className="hover:opacity-75" href="#">
                    {link}
                </a>
            ))}
        </nav>
    </div>
);

export default FooterComponent;