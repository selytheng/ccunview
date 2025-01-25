import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/background.png";
import NavbarHomePage from "../components/Navbar_HomePage";
import { IoArrowBack, IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const loginResponse = await fetch(
          "http://localhost:8000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
      );

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        const { access_token, user } = loginData;
        const { partner_id, role_id, name } = user;

        let partner_name = "";

        // Fetch partner name using partner_id
        if (partner_id) {
          const partnerResponse = await fetch(
              `http://localhost:8000/api/partners/${partner_id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
          );

          if (partnerResponse.ok) {
            const partnerData = await partnerResponse.json();
            partner_name = partnerData.name || ""; // Extract partner name
          } else {
            console.error("Failed to fetch partner name");
          }
        }

        // Store data in localStorage
        setSuccessMessage("Login successful!");
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("partner_id", String(partner_id));
        localStorage.setItem("role_id", String(role_id));
        localStorage.setItem("admin_name", String(name));
        localStorage.setItem("partner_name", partner_name);

        // Redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        setError(loginData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
      <>
        <div
            className="flex min-h-screen flex-1 flex-col justify-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(0, 0, 0, 1)",
            }}
        >
          <NavbarHomePage />
          <div className="flex min-h-full flex-1 flex-col justify-center mb-28 px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-10 rounded-lg shadow-md bg-white bg-opacity-60">
              <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
              >
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {successMessage && (
                    <div className="text-green-500 text-sm">{successMessage}</div>
                )}
                <div>
                  <label
                      htmlFor="email"
                      className="block text-sm/6 font-bold text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="Email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                      htmlFor="password"
                      className="block text-sm/6 font-bold text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? <IoEye /> : <IoEyeOff />} {/* Show eye icon based on state */}
                    </button>
                  </div>
                </div>
                <div>
                  <button
                      type="submit"
                      className="flex w-full justify-center mt-8 rounded-md bg-[#071952] px-3 py-1.5 mb-5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log in
                  </button>
                  <Link to="/">
                    <div className="flex items-center gap-2 mb-10">
                      <IoArrowBack className="icon" />
                      <div className="text-xs font-bold">Back home</div>
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};

export default Login;