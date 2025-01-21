import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

interface AdminEventEditProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventData: any;
  onSubmit: () => void;
}

const AdminEventEdit: React.FC<AdminEventEditProps> = ({
  open,
  onClose,
  eventId,
  eventData,
  onSubmit,
}) => {
  const [title, setTitle] = useState(eventData.title);
  const [description, setDescription] = useState(eventData.description);
  const [location, setLocation] = useState(eventData.location);
  const [status, setStatus] = useState(eventData.status);
  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);
  const [removeGallery, setRemoveGallery] = useState<string[]>(
    eventData.remove_gallery || []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setGallery(event.target.files);
    }
  };

  const handleRemoveGalleryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string
  ) => {
    if (event.target.checked) {
      setRemoveGallery((prev) => [...prev, path]);
    } else {
      setRemoveGallery((prev) => prev.filter((item) => item !== path));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (location) formData.append("location", location);
    if (status) formData.append("status", status);
    if (image) formData.append("image", image);
    if (gallery) {
      Array.from(gallery).forEach((file) => formData.append("gallery[]", file));
    }
    formData.append("remove_gallery", JSON.stringify(removeGallery));
    formData.append("_method", "PUT");

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/events/${eventId}`,
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
      console.error("Error occurred while updating the event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="dense"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="file"
          label="Event Image"
          margin="dense"
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          type="file"
          label="Gallery (multiple files)"
          margin="dense"
          onChange={handleGalleryChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            multiple: true,
          }}
        />
        {eventData.gallery && eventData.gallery.length > 0 && (
          <div>
            <h4>Current Gallery</h4>
            {eventData.gallery.map((imagePath: string, index: number) => (
              <div key={index}>
                <img
                  src={imagePath}
                  alt={`gallery-item-${index}`}
                  width={100}
                  height={100}
                />
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleRemoveGalleryChange(e, imagePath)}
                  />
                  Remove
                </label>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventEdit;
