import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AdminTrainingAddGalleryProps {
  open: boolean;
  onClose: () => void;
  trainingId?: string;
  trainingData?: any;
  onSubmit: () => void;
}

const AdminTrainingAddGallery: React.FC<AdminTrainingAddGalleryProps> = ({
  open,
  onClose,
  trainingId,
  onSubmit,
}) => {
  const [addgalleries, setAddgalleries] = useState<File[]>([]);

  const handleAddgalleriesChange = (
    training: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (training.target.files) {
      setAddgalleries(Array.from(training.target.files));
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
      `http://localhost:8000/api/trainings/${trainingId}/addgallery`,
      {
        method: "POST", // Keep as POST since `_method: PUT` is included
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      onSubmit(); // Trigger training list refresh
      onClose(); // Close modal after successful creation
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error occurred while creating the training:", error);
    alert("An error occurred while creating the training.");
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

export default AdminTrainingAddGallery;
