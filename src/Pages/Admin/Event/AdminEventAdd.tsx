import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

interface AdminEventAddProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void; // Callback to refresh the event list
}

const AdminEventAdd: React.FC<AdminEventAddProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const partnerId = localStorage.getItem("partner_id") || ""; // Fetch partner_id from localStorage
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setGallery(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("partner_id", partnerId);
    formData.append("location", location);
    formData.append("status", status);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    if (image) formData.append("image", image);
    gallery.forEach((file) => {
      formData.append("gallery[]", file);
    });

    // Log FormData to check its contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Event</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          required
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
          multiline
          rows={4}
        />
        <TextField
          required
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="dense"
        />
        <TextField
          required
          fullWidth
          label="Status"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="dense"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          required
          fullWidth
          type="datetime-local"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          fullWidth
          type="datetime-local"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          fullWidth
          type="file"
          margin="dense"
          onChange={handleImageChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          fullWidth
          type="file"
          margin="dense"
          onChange={handleGalleryChange}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventAdd;
