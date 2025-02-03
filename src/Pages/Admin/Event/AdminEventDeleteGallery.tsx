import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Grid,
  Box,
} from "@mui/material";
import API_BASE_URL from "../../../components/API_BASE_URL";

interface AdminEventEditGalleryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  eventId: number; // Pass the event ID from AdminEventDetail
}

const AdminEventDeleteGallery: React.FC<AdminEventEditGalleryProps> = ({
  open,
  onClose,
  eventId,
  onSubmit,
}) => {
  const [gallery, setGallery] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // Array to store selected image indices

  // Fetch gallery data from API
  useEffect(() => {
    if (eventId) {
      const accessToken = localStorage.getItem("access_token"); // Retrieve the token from local storage
      if (accessToken) {
        fetch(`${API_BASE_URL}/api/events/${eventId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the headers
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setGallery(data.gallery || []);
          })
          .catch((error) => {
            console.error("Error fetching event data:", error);
          });
      } else {
        console.error("Access token not found in local storage.");
      }
    }
  }, [eventId]);

  // Toggle the selected image index
  const handleSelectImage = (index: number) => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter((i) => i !== index); // Deselect if already selected
      } else {
        return [...prevSelectedIndices, index]; // Select if not already selected
      }
    });
  };

  // Handle Delete request
  const handleDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetch(`${API_BASE_URL}/api/events/${eventId}/deletegallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the token in the headers
        },
        body: JSON.stringify({
          removegalleryindex: selectedIndices, // Pass selected indices to be removed
          _method: "PUT", // Laravel method override for PUT
        }),
      })
        .then((response) => response.json())
        .then(() => {
          // Re-fetch the updated gallery after deletion
          fetchGallery();
          onSubmit(); // Trigger event list refresh (parent component)
          onClose(); // Close the modal
        })
        .catch((error) => {
          console.error("Error deleting selected images:", error);
        });
    } else {
      console.error("Access token not found in local storage.");
    }
  };

  // Re-fetch the gallery after delete action
  const fetchGallery = () => {
    const accessToken = localStorage.getItem("access_token"); // Retrieve the token from local storage
    if (accessToken) {
      fetch(`${API_BASE_URL}/api/events/${eventId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setGallery(data.gallery || []); // Update gallery state
        })
        .catch((error) => {
          console.error("Error fetching updated event data:", error);
        });
    } else {
      console.error("Access token not found in local storage.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Event Gallery</DialogTitle>
      <Box p={2}>
        <Grid container spacing={2}>
          {gallery.map((image, index) => (
            <Grid
              item
              key={index}
              xs={4}
              onClick={() => handleSelectImage(index)}
            >
              <Box
                sx={{
                  cursor: "pointer",
                  border: selectedIndices.includes(index)
                    ? "2px solid blue"
                    : "none",
                }}
              >
                <img
                  src={`${API_BASE_URL}/${image}`}
                  alt={`Gallery Image ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DialogActions>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
        <Button
          onClick={() => {
            onClose();
            fetchGallery(); // Refresh the gallery after closing the modal
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventDeleteGallery;
