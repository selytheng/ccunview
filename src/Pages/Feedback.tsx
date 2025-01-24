import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavbarLink from "../components/NavbarLink";
import FooterComponent from "../components/HomeComponent/FooterComponent";

const Feedback: React.FC = () => {
  const [partners, setPartners] = useState<{ id: number; name: string }[]>([]);
  const [feedbackData, setFeedbackData] = useState({
    partner_id: "",
    name: "",
    company: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/partners");
        if (response.ok) {
          const data = await response.json();
          setPartners(data);
        } else {
          console.error("Failed to fetch partners");
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage("");
        setFeedbackData({
          partner_id: "",
          name: "",
          company: "",
          email: "",
          phone_number: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to submit feedback. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/*<div className="mt-[110px]">*/}
      {/*  <NavbarLink />*/}
      {/*</div>*/}
      <div className="mt-[110px] isolate bg-white px-6 py-24 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Submit Your Feedback
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Your thoughts matter to us. Please provide your feedback below.
          </p>
        </div>
        <form onSubmit={submitFeedback} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="partner_id" className="block text-sm font-semibold leading-6 text-black">
                Partner
              </label>
              <div className="mt-2.5">
                <select
                  id="partner_id"
                  name="partner_id"
                  value={feedbackData.partner_id}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="">Select a partner</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-black">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={feedbackData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter your name (Optional)"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-black">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={feedbackData.company}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter your company (Optional)"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-black">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={feedbackData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter your email (Optional)"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone_number" className="block text-sm font-semibold leading-6 text-black">
                Phone Number
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={feedbackData.phone_number}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter your phone number (Optional)"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-black">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  value={feedbackData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter your feedback"
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Feedback
          </button>
        </form>
        {successMessage && <div className="mt-4 text-center text-green-600">{successMessage}</div>}
        {errorMessage && <div className="mt-4 text-center text-red-600">{errorMessage}</div>}
      </div>
      <FooterComponent />
    </div>
  );
};

export default Feedback;
