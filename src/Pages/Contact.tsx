import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/HomeComponent/FooterComponent";

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

  const renderPhoneNumbers = (phones) => {
    if (!phones) return <p className="text-gray-500">No phone numbers available</p>;
    if (typeof phones === 'string') return <p className="text-gray-900">{phones}</p>;
    if (Array.isArray(phones) && phones.length > 0) {
      return phones.map((phone, index) => (
        <p key={index} className="text-gray-900">
          {phone}
        </p>
      ));
    }
    return <p className="text-gray-500">No phone numbers available</p>;
  };

  const renderEmails = (emails) => {
    if (!emails) return <p className="text-gray-500">No email addresses available</p>;
    if (typeof emails === 'string') return <p className="text-gray-900 break-all">{emails}</p>;
    if (Array.isArray(emails) && emails.length > 0) {
      return emails.map((email, index) => (
        <p key={index} className="text-gray-900 break-all">
          {email}
        </p>
      ));
    }
    return <p className="text-gray-500">No email addresses available</p>;
  };

  const renderWebsiteLink = (website) => {
    if (!website) return <p className="text-gray-500">No website available</p>;
    const url = website.startsWith('http') ? website : `https://${website}`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        Website →
      </a>
    );
  };

  const renderMoodleLink = (moodleLink) => {
    if (!moodleLink) return <p className="text-gray-500">No Moodle portal available</p>;
    const url = moodleLink.startsWith('http') ? moodleLink : `https://${moodleLink}`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        Moodle Portal →
      </a>
    );
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
                    {renderPhoneNumbers(contactPreview.phone_number)}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Email Addresses</h4>
                    {renderEmails(contactPreview.email)}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Address</h4>
                    <p className="text-gray-900">
                      {contactPreview.address || <span className="text-gray-500">No address available</span>}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Links</h4>
                    <div className="space-y-2">
                      {renderWebsiteLink(contactPreview.website)}
                      {renderMoodleLink(contactPreview.moodle_link)}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Location</h4>
                    <div className="mt-2 rounded-lg overflow-hidden">
                      {contactPreview.location_link ? (
                        <iframe
                          src={contactPreview.location_link}
                          title="Partner Location"
                          className="w-full h-64 rounded-lg shadow-sm"
                          frameBorder="0"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center">
                          <p className="text-gray-500">No location map available</p>
                        </div>
                      )}
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