import React, { useState, useRef, useEffect } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const AdminEditContact = ({ isOpen, onClose, contact, onSave }) => {
  // Initialize formData with default values for null fields
  const [formData, setFormData] = useState({
    ...contact,
    phone_number: contact?.phone_number || [],
    email: contact?.email || [],
    location_link: contact?.location_link || "",
    address: contact?.address || "",
    website: contact?.website || "",
    moodle_link: contact?.moodle_link || "",
    partner_id: contact?.partner_id
  });

  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    // Handle empty input case
    if (!value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/contacts/partner/${formData.partner_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update contact: ${response.statusText}`);
      }
      const updatedContact = await response.json();
      onSave(updatedContact);
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      const googleMapsLink = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

      setFormData((prev) => ({
        ...prev,
        location_link: googleMapsLink,
      }));
      closeMapModal();
    }
  };

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 13);
            markerRef.current.setLatLng([latitude, longitude]);
            setSelectedLocation({ lat: latitude, lng: longitude });
          }

          setGeolocationError(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setGeolocationError(
                "Location access denied. Please enable location permissions."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setGeolocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setGeolocationError("Location request timed out.");
              break;
            default:
              setGeolocationError("An unknown error occurred.");
          }
        }
      );
    } else {
      setGeolocationError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (showMapModal && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);

      markerRef.current = L.marker([0, 0], { draggable: true }).addTo(
        mapInstanceRef.current
      );

      mapInstanceRef.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setSelectedLocation({ lat, lng });
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showMapModal]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Numbers (separate by commas)
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number.join(", ")}
                onChange={(e) => handleArrayChange(e, "phone_number")}
                className="w-full border rounded-md p-2"
                placeholder="Enter phone numbers separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Addresses (separate by commas)
              </label>
              <input
                type="text"
                name="email"
                value={formData.email.join(", ")}
                onChange={(e) => handleArrayChange(e, "email")}
                className="w-full border rounded-md p-2"
                placeholder="Enter email addresses separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location Link
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location_link"
                  value={formData.location_link}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 pr-10"
                  placeholder="Google Maps link will appear here"
                  readOnly
                />
                <button
                  type="button"
                  onClick={openMapModal}
                  className="absolute inset-y-0 right-0 px-3 text-blue-500 hover:text-blue-600"
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter website URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Moodle Link
              </label>
              <input
                type="text"
                name="moodle_link"
                value={formData.moodle_link}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter Moodle link"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {showMapModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Select Location</h3>
            <div ref={mapRef} className="h-96 w-full mb-4"></div>

            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <LocateFixed size={20} /> Use My Location
              </button>

              {geolocationError && (
                <span className="text-red-500 text-sm ml-2">
                  {geolocationError}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={closeMapModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLocation}
                disabled={!selectedLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEditContact;