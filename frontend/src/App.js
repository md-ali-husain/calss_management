import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principlelogin from './pages/Principlelogin';
import Dashboard from './pages/Dashboard';
import Studentlogin from "./pages/Studentlogin";
import Teacherlogin from "./pages/Teacherlogin";
import Principlesidebar from './componnets/Principle/Principlesidebar';
import Teachersidebar from './componnets/Teacher/Teachersidebar';
import Studentsidebar from './componnets/Student/Studentsidebar';
import CreateStudentForm from './componnets/Createstudentform';
import TeacherList from './componnets/Principle/TeacherList';
import StudentList from './componnets/Principle/StudentList';
import ClassroomForm from './componnets/Principle/ClassroomForm';
import CreateTeacherForm from './componnets/CreateTeacherForm';
import EditTeacherForm from './componnets/EditTeacherForm';
import EditStudentForm from './componnets/EditStudentform';
import ClassroomListPage from './pages/ClassroomList';
import AssignStudentForm from './componnets/Principle/AssignStudent';
import AssignTeacherForm from './componnets/Principle/AssignTeacher';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/principlelogin" element={< Principlelogin/>} />
        <Route path="/studentlogin" element={<Studentlogin />} />
        <Route path="/teacherlogin" element={<Teacherlogin />} />
        <Route path="/principlesidebar" element={< Principlesidebar />} />
        <Route path="/teachersidebar" element={< Teachersidebar />} />
        <Route path="/studentsidebar" element={< Studentsidebar />} />
        <Route path="/createstudent" element={< CreateStudentForm />} />
        <Route path="/teacherlist" element={< TeacherList />} />
        <Route path="/studentlist" element={< StudentList />} />
        <Route path="/createclassroom" element={< ClassroomForm />} />
        <Route path="/createteacher" element={< CreateTeacherForm />} />
        <Route path="/edit-teacher/:userId" element={< EditTeacherForm/>} />
        <Route path="/edit-student/:userId" element={< EditStudentForm/>} />
        <Route path="/classroom" element={< ClassroomListPage/>} />
        <Route path="/assignstudent" element={< AssignStudentForm/>} />
        <Route path="/assignteacher" element={< AssignTeacherForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
