import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams(); 
  const course = {
    id,
    title: `Course ${id} Details`,
    description: `This is the detailed page for course with ID: ${id}. More info goes here.`,
  }; 

  return (
    <div>
      <h1>Course Detail: {course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
