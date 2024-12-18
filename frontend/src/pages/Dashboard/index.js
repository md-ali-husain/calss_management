import React from 'react';   
import { useNavigate } from 'react-router-dom';   


const Dashboard = () => {  
  const navigate = useNavigate();  

  const handleNavigate = (path) => {  
    navigate(path);  
  };  

  return (  
    <div className="dashboard-container">  
      <h1>Dashboard</h1>  
      <div className="boxes-container">  
        <div   
          className="box"   
          onClick={() => handleNavigate('/principlelogin')}   
        >  
          <h2>Login Principal</h2>  
        </div>  
        <div   
          className="box"   
          onClick={() => handleNavigate('/studentlogin')}   
        >  
          <h2>Login Student</h2>  
        </div>  
        <div   
          className="box"   
          onClick={() => handleNavigate('/teacherlogin')}   
        >  
          <h2>Login Teacher</h2>  
        </div>  
      </div> 
      <footer className="footer">
      <p>&copy; 2024 Md Ali Husain. All rights reserved.</p>
    </footer> 
    </div>  
  );  
};  

export default Dashboard;