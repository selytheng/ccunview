import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface AdminWorkshopAddGalleryProps {
  open: boolean;
  onClose: () => void;
  workshopId?: string;
  onSubmit: () => void;
}

const AdminWorkshopAddGallery: React.FC<AdminWorkshopAddGalleryProps> = ({
  open, onClose, workshopId, onSubmit,
}) => {
  const [addGalleries, setAddGalleries] = useState<File[]>([]);

  const handleAddGalleriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setAddGalleries(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("_method", "PUT");

    addGalleries.forEach((file) => {
      formData.append("addgalleries[]", file);
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/workshops/${workshopId}/addgallery`,
        {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        onSubmit(); 
        onClose(); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error occurred while adding gallery images:", error);
      alert("An error occurred while adding images to the gallery.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Images to Workshop Gallery</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          type="file"
          margin="dense"
          onChange={handleAddGalleriesChange}
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

export default AdminWorkshopAddGallery;
