import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import API_BASE_URL from "../../../components/API_BASE_URL";

interface CourseCreateProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void; // Callback to refresh the course list
}

const CourseCreate: React.FC<CourseCreateProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [majorId, setMajorId] = useState("");
  const [yearId, setYearId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (open) {
      fetchMajors();
    }
  }, [open]);

  const fetchMajors = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const partnerId = localStorage.getItem("partner_id");
      const response = await fetch(
        `${API_BASE_URL}/api/partners/${partnerId}/majors`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const data = await response.json();
      setMajors(data);
    } catch (error) {
      console.error("Error fetching majors:", error);
      alert("Failed to fetch majors.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("major_id", majorId);
    formData.append("year_id", yearId);
    formData.append("description", description);
    formData.append("image", image as File);
    formData.append("link", link);

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/api/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        onSubmit(); // Trigger course list refresh
        onClose(); // Close modal after successful creation
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error occurred while creating the course:", error);
      alert("An error occurred while creating the course.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Course</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          label="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <TextField
          required
          fullWidth
          select
          label="Major"
          value={majorId}
          onChange={(e) => setMajorId(e.target.value)}
          margin="dense"
        >
          {majors.map((major) => (
            <MenuItem key={major.id} value={major.id}>
              {major.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          fullWidth
          select
          label="Year"
          value={yearId}
          onChange={(e) => setYearId(e.target.value)}
          margin="dense"
        >
          <MenuItem value="1">Year 1</MenuItem>
          <MenuItem value="2">Year 2</MenuItem>
          <MenuItem value="3">Year 3</MenuItem>
          <MenuItem value="4">Year 4</MenuItem>
          <MenuItem value="5">Year 5</MenuItem>
        </TextField>
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
          type="file"
          margin="dense"
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          fullWidth
          label="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          margin="dense"
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

export default CourseCreate;
