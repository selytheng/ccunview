import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Initially null to handle loading state.

  useEffect(() => {
    // Check if the token exists in localStorage (user is authenticated)
    const token = localStorage.getItem('access_token');

    if (token) {
      // Optionally, you can verify the token's validity (e.g., by checking expiration)
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Monitor for 401 errors globally (in case the token expires or is invalid)
    const monitorRequests = (response: Response) => {
      if (response.status === 401) {
        console.error('Unauthorized access detected!');
        setIsAuthenticated(false);
      }
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      monitorRequests(response);
      return response;
    };

    return () => {
      window.fetch = originalFetch; // Clean up fetch override
    };
  }, []);

  if (isAuthenticated === null) {
    // If we don't have an authentication status yet, show loading or placeholder
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
