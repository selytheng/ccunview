import React, { useState } from "react";
import API_BASE_URL from "../../../components/API_BASE_URL";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

interface AdminTrainingEditProps {
  open: boolean;
  onClose: () => void;
  trainingId: string;
  trainingData: any;
  onSubmit: () => void;
}

const AdminTrainingEdit: React.FC<AdminTrainingEditProps> = ({
  open,
  onClose,
  trainingId,
  trainingData,
  onSubmit,
}) => {
  const [title, setTitle] = useState(trainingData.title || "");
  const [description, setDescription] = useState(
    trainingData.description || ""
  );
  const [location, setLocation] = useState(trainingData.location || "");
  const [status, setStatus] = useState(trainingData.status || "");
  const [startDate, setStartDate] = useState(trainingData.start_date || "");
  const [endDate, setEndDate] = useState(trainingData.end_date || "");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (training: React.ChangeEvent<HTMLInputElement>) => {
    if (training.target.files) {
      setImage(training.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (location) formData.append("location", location);
    if (status) formData.append("status", status);
    if (startDate) formData.append("start_date", startDate);
    if (endDate) formData.append("end_date", endDate);
    if (image) formData.append("image", image);

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE_URL}/api/trainings/${trainingId}`,
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
      console.error("Error occurred while updating the training:", error);
      alert("An error occurred while updating the training.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit training</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Training Title"
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
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="file"
          label="Training Image"
          margin="dense"
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default AdminTrainingEdit;
