import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from '@mui/material';

interface BarchartProps {
  partnerData: { name: string; courseCount: number }[];
}

const Barchart: React.FC<BarchartProps> = ({ partnerData }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar', 
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false, 
      },
    },
    xaxis: {
      categories: partnerData.map((partner) => partner.name),
    },
    title: {
      text: 'Number of Courses',
      align: 'center',
    },
    colors: ['#0D6EFD'], 
  };

  const series = [
    {
      name: 'Courses', 
      data: partnerData.map((partner) => partner.courseCount), 
    },
  ];

  return (
    <Card style={{backgroundColor: '', padding: 2, width: 500}}>
      <Chart options={options} series={series} type="bar" height={280} />
    </Card>
  );
};

export default Barchart;
