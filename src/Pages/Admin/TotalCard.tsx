import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { BiBook, BiTask, BiUser } from 'react-icons/bi';

// Define the card data for reuse
const cardData = [
  { title: 'Total Courses', icon: <BiBook size={30} />, number: 15, color: '#0C4CA3' },
  { title: 'Total Majors', icon: <BiUser size={30} />, number: 5, color: '#0C4CA3' },
  { title: 'Total Training', icon: <BiTask size={30} />, number: 12, color: '#0C4CA3' },
  { title: 'Partners', icon: <BiTask size={30} />, number: 8, color: '#0C4CA3' },
  { title: 'Events', icon: <BiTask size={30} />, number: 8, color: '#0C4CA3' },
  { title: 'Total Workshops', icon: <BiTask size={30} />, number: 8, color: '#0C4CA3' },
];

const TotalCard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ display: 'flex', alignItems: '', padding: 2, backgroundColor: '', flexDirection: 'column', width: '250px', height: '130px' }}>
                <Typography variant="h6" style={{borderBottom: '1px solid black'}}>{data.title}</Typography>
              {/* <div style={{ marginRight: 16, color: data.color, backgroundColor: 'green' }}>
                {data.icon}
              </div> */}
              <CardContent style={{display: 'flex', gap: 50}}>
                {/* <Typography variant="h6">{data.title}</Typography> */}
                <div style={{ color: data.color, backgroundColor: '#dde6ed', width: 45, height:45, padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                    {data.icon}
                </div>
                <Typography variant="h4">{data.number}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TotalCard;
