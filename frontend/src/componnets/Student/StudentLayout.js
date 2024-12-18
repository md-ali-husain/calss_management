import React from 'react';
import Studentsidebar from '../Student/Studentsidebar';

const StudentLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Studentsidebar />
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
