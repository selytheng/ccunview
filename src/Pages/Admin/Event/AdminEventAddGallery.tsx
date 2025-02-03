import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import API_BASE_URL from "../../../components/API_BASE_URL";

interface AdminEventAddGalleryProps {
  open: boolean;
  onClose: () => void;
  eventId?: string;
  eventData?: any;
  onSubmit: () => void;
}

const AdminEventAddGallery: React.FC<AdminEventAddGalleryProps> = ({
  open,
  onClose,
  eventId,
  onSubmit,
}) => {
  const [addgalleries, setAddgalleries] = useState<File[]>([]);

  const handleAddgalleriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setAddgalleries(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Add `_method` to FormData
    formData.append("_method", "PUT");

    // Add the selected files to FormData
    addgalleries.forEach((file) => {
      formData.append("addgalleries[]", file);
    });

    // Log FormData to check its contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE_URL}/api/events/${eventId}/addgallery`,
        {
          method: "POST", // Keep as POST since `_method: PUT` is included
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        onSubmit(); // Trigger event list refresh
        onClose(); // Close modal after successful creation
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error occurred while creating the event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Images to Gallery</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          type="file"
          margin="dense"
          onChange={handleAddgalleriesChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ multiple: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventAddGallery;
