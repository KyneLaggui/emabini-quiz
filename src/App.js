import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from './pages/student/StudentHome/StudentHome';
import StudentCourse from './pages/student/StudentCourse/StudentCourse';
import EachStudentCourses from './pages/student/StudentCourse/EachStudentCourses/EachStudentCourses';
import StudentProgress from './pages/student/StudentProgress/StudentProgress';
import StudentProgressEach from './pages/student/StudentProgressEach/StudentProgressEach';
import StudentQuiz from './pages/student/StudentQuiz/StudentQuiz';
import AccountManagement from './pages/facultyHead/accountManagement/AccountManagement';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <StudentHome />}></Route>  
          <Route path="/student-courses" element={ <StudentCourse/>}></Route> 
          <Route path="/student-courses-id" element={ <EachStudentCourses/>}></Route>   
          <Route path="/student-progress" element={ <StudentProgress/>}></Route>   
          <Route path="/student-progress-id" element={ <StudentProgressEach/>}></Route>   
          <Route path="/student-quiz-id" element={ <StudentQuiz/>}></Route>   
          <Route path="/account-management" element={ <AccountManagement />} />
        </Routes>      
      </BrowserRouter>    
    </>
  );
}

export default App;

