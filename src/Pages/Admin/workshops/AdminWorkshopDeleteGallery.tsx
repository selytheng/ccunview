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

interface AdminWorkshopDeleteGalleryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  workshopId: string;
}

const AdminWorkshopDeleteGallery: React.FC<AdminWorkshopDeleteGalleryProps> = ({
  open,
  onClose,
  workshopId,
  onSubmit,
}) => {
  const [gallery, setGallery] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (workshopId) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        fetch(`${API_BASE_URL}/api/workshops/${workshopId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setGallery(data.gallery || []);
          })
          .catch((error) => {
            console.error("Error fetching workshop data:", error);
          });
      } else {
        console.error("Access token not found in local storage.");
      }
    }
  }, [workshopId]);

  const handleSelectImage = (index: number) => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter((i) => i !== index);
      } else {
        return [...prevSelectedIndices, index];
      }
    });
  };

  const handleDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetch(`${API_BASE_URL}/api/workshops/${workshopId}/deletegallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          removegalleryindex: selectedIndices,
          _method: "PUT",
        }),
      })
        .then((response) => response.json())
        .then(() => {
          fetchGallery();
          onSubmit();
          onClose();
        })
        .catch((error) => {
          console.error("Error deleting selected images:", error);
        });
    } else {
      console.error("Access token not found in local storage.");
    }
  };

  const fetchGallery = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetch(`${API_BASE_URL}/api/workshops/${workshopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setGallery(data.gallery || []);
        })
        .catch((error) => {
          console.error("Error fetching updated workshop data:", error);
        });
    } else {
      console.error("Access token not found in local storage.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Workshop Gallery</DialogTitle>
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
            fetchGallery();
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminWorkshopDeleteGallery;
