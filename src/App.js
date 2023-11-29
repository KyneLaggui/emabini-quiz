import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from './pages/StudentHome/StudentHome';
import StudentCourse from './pages/StudentCourse/StudentCourse';
import EachStudentCourses from './pages/StudentCourse/EachStudentCourses/EachStudentCourses';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <StudentHome />}></Route>  
          <Route path="/student-courses" element={ <StudentCourse/>}></Route> 
          <Route path="/student-courses-id" element={ <EachStudentCourses/>}></Route>   
        </Routes>      
      </BrowserRouter>    
    </>
  );
}

export default App;

