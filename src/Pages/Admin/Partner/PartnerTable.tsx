import React from 'react';
import { Partner } from '../../../types/interface';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { BiSolidEditAlt, BiTrash } from 'react-icons/bi';

const PartnerTable = ({ partners, onEdit, onDelete }: { partners: Partner[], onEdit: (partner: Partner) => void, onDelete: (partner: Partner) => void }) => (
  <div className="partner-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '22px' }}>
    {partners.map((partner) => (
      <Card
        sx={{
          maxWidth: 400,
          marginBottom: '5px',
          width: 240,
          height: 315,
          display: 'flex',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          },
        }}
        key={partner.id}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="../../../../public/ITC.png"
            style={{
              padding: 2,
              backgroundColor: '',
              width: '100%',
              height: '250px',
              borderBottom: '1px solid #c3baba',
            }}
            alt={partner.name}
          />
          <CardContent style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography gutterBottom variant="h5" component="div" style={{ whiteSpace: 'nowrap',  overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {partner.name}
            </Typography>
            <div
              className="card-actions"
              style={{ display: 'flex', marginTop: '-10px', marginLeft: 20 }}
            >
              <IconButton aria-label="edit" onClick={() => onEdit(partner)} color="primary">
                <BiSolidEditAlt style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => onDelete(partner)} color="error">
                <BiTrash style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
);

export default PartnerTable;