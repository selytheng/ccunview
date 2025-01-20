import { Card } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 

interface PiechartProps {
  totalCourses: number;
  totalPartners: number;
  totalMajors: number;
}

const Piechart: React.FC<PiechartProps> = ({ totalCourses, totalPartners, totalMajors }) => {
  const chartData = {
    series: [totalCourses, totalPartners, totalMajors], 
    options: {
      chart: {
        type: 'pie' as const, 
        height: 250, 
      },
      labels: ['Total Courses', 'Total Partners', 'Total Majors'], 
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,  
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'top', 
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`, 
        },
      },
    } as ApexOptions, 
  };

  return (
    <Card style={{ width: '400px', height: '300px', padding: '10px' }}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height={250} />
    </Card>
  );
};

export default Piechart;
