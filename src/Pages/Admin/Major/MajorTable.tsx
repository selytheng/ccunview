import React from 'react';
import { Major } from '../../../types/interface';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { BiSolidEditAlt, BiTrash } from 'react-icons/bi';

const MajorTable = ({ majors, onEdit, onDelete }: { majors: Major[], onEdit: (major: Major) => void, onDelete: (major: Major) => void }) => (
  <div className="major-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '22px' }}>
    {majors.map((major) => (
      <Card
        sx={{
          maxWidth: 400,
          marginBottom: '5px',
          width: 235,
          height: 260,
          display: 'flex',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          },
        }}
        key={major.id}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image="../../../../public/GIC-logo.png" // Update this image path as needed
            alt={major.name}
            style={{
              padding: 5,
              width: '100%', // Make the image take up the full width of the card
              height: '200px', // Specify the height of the image
              objectFit: 'cover', // Ensures the image fills the area without distortion
              borderBottom: '1px solid #c3baba',
              borderBottomColor: '1px solid #c3baba', // Adds a red border around the image
            }}
          />
          <CardContent style={{ display: 'flex', justifyContent: 'space-between',  }}>
            <Typography gutterBottom variant="h5" component="div" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {major.name}
            </Typography>
            <div
              className="card-actions"
              style={{ display: 'flex', marginTop: '-10px', marginLeft: 20 }}
            >
              <IconButton aria-label="edit" onClick={() => onEdit(major)} color="primary">
                <BiSolidEditAlt style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => onDelete(major)} color="error">
                <BiTrash style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
);

export default MajorTable;
