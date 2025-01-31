import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { BiBook, BiBookOpen, BiSolidGroup, BiTask } from 'react-icons/bi';

interface TotalCardProps {
  totalCourses: number;
  totalEvents: number;
  totalWorkshops: number; // Added totalMajors prop
  totalTrainings: number;
}

const TotalCard: React.FC<TotalCardProps> = ({ totalCourses, totalEvents, totalTrainings, totalWorkshops }) => {
  const cardData = [
    { title: 'Total Courses', icon: <BiBook size={30} style={{ color: '#0D6EFD' }} />, number: totalCourses, color: '#0C4CA3', bgColor: '#E6F0FF' },
    { title: 'Total Events', icon: <BiBookOpen size={30} style={{ color: '#02C27A' }} />, number: totalEvents, color: '#0C4CA3', bgColor: '#E5F9F1' }, // Updated to use totalMajors
    { title: 'Total Training', icon: <BiTask size={30} style={{ color: '#FC185A' }} />, number: totalTrainings, color: '#0C4CA3', bgColor: '#FFE7EE' },
    { title: 'Total Workshops', icon: <BiSolidGroup size={30} style={{ color: '#FFE45C' }} />, number: totalWorkshops, color: '#0C4CA3', bgColor: '#FDFFE7' },
  ];

  return (
    <Container style={{ backgroundColor: '', padding: 2, display: 'flex', justifyContent: 'space-between', gap: 50 }}>
      <Grid container spacing={3}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ display: '', padding: 2, backgroundColor: '', height: '130px' }}>
              <Typography variant="h6" style={{ borderBottom: '1px solid black' }}>{data.title}</Typography>
              <CardContent style={{ display: 'flex', gap: 50 }}>
                <div
                  style={{
                    color: data.color,
                    backgroundColor: data.bgColor,
                    width: 45,
                    height: 45,
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 40,
                  }}
                >
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
