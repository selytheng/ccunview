import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    partnerId: "",
  });
  const [partners, setPartners] = useState([]);
  const [contactPreview, setContactPreview] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/partners")
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  useEffect(() => {
    if (formData.partnerId) {
      fetch(`http://localhost:8000/api/contacts/partner/${formData.partnerId}`)
        .then((response) => response.json())
        .then((data) => setContactPreview(data))
        .catch((error) => console.error("Error fetching contact preview:", error));
    }
  }, [formData.partnerId]);

  const handlePartnerChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      partnerId: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="mt-[100px] flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partner Contact Information</h2>
            <p className="text-lg text-gray-600">
              Select a partner from the list below to view their contact details
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <label htmlFor="partner" className="block text-sm font-medium text-gray-700 mb-2">
              Select Partner
            </label>
            <select
              id="partner"
              name="partnerId"
              value={formData.partnerId}
              onChange={handlePartnerChange}
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 h-12 px-4 bg-white"
            >
              <option value="" disabled>
                -- Select a Partner --
              </option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>

          {contactPreview && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Phone Numbers</h4>
                    {contactPreview.phone_number.map((phone, index) => (
                      <p key={index} className="text-gray-900">
                        {phone}
                      </p>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Email Addresses</h4>
                    {contactPreview.email.map((email, index) => (
                      <p key={index} className="text-gray-900 break-all">
                        {email}
                      </p>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Address</h4>
                    <p className="text-gray-900">{contactPreview.address}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Links</h4>
                    <div className="space-y-2">
                      <a
                        href={`https://${contactPreview.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Website →
                      </a>
                      <a
                        href={`https://${contactPreview.moodle_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Moodle Portal →
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Location</h4>
                    <div className="mt-2 rounded-lg overflow-hidden">
                      <iframe
                        src={contactPreview.location_link}
                        title="Partner Location"
                        className="w-full h-64 rounded-lg shadow-sm"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ContactForm;