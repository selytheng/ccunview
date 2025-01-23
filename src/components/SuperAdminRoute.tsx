import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface SuperAdminRouteProps {
  children: React.ReactNode;
}

const SuperAdminRoute: React.FC<SuperAdminRouteProps> = ({ children }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null); // Initially null to handle loading state.

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setIsSuperAdmin(false);
          return;
        }

        const response = await fetch("http://localhost:8000/api/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsSuperAdmin(data.role_id === 1); // Check if role_id is 1
        } else {
          setIsSuperAdmin(false);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setIsSuperAdmin(false);
      }
    };

    checkRole();
  }, []);

  if (isSuperAdmin === null) {
    // Show a loading state while the role is being verified
    return <div>Loading...</div>;
  }

  if (!isSuperAdmin) {
    // Redirect to the dashboard if not a super admin
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default SuperAdminRoute;
