import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

interface CourseEditProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  courseData: any;
  onSubmit: () => void; // Callback to refresh course detail
}

const CourseEdit: React.FC<CourseEditProps> = ({ open, onClose, courseId, courseData, onSubmit }) => {
  const [name, setName] = useState(courseData.name);
  const [majorId, setMajorId] = useState(courseData.major_id);
  const [yearId, setYearId] = useState(courseData.year_id);
  const [description, setDescription] = useState(courseData.description);
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState(courseData.link);
  const [majors, setMajors] = useState<any[]>([]);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const partnerId = localStorage.getItem('partner_id');
        const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/majors`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch majors');
        }

        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };

    fetchMajors();
  }, [courseData.partnerId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (name) formData.append('name', name);
    if (majorId) formData.append('major_id', majorId.toString());
    if (yearId) formData.append('year_id', yearId.toString());
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);
    if (link) formData.append('link', link);
    formData.append('_method', 'PUT');

    try {
      const access_token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/courses/${courseId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Course updated successfully!');
        onSubmit();
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while updating the course.');
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <TextField
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
          fullWidth
          select
          label="Year"
          value={yearId}
          onChange={(e) => setYearId(Number(e.target.value))}
          margin="dense"
        >
          <MenuItem value={1}>Year 1</MenuItem>
          <MenuItem value={2}>Year 2</MenuItem>
          <MenuItem value={3}>Year 3</MenuItem>
          <MenuItem value={4}>Year 4</MenuItem>
          <MenuItem value={5}>Year 5</MenuItem>
        </TextField>
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
          type="file"
          margin="dense"
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseEdit;
