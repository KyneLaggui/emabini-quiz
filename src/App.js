import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import StudentHome from './pages/student/StudentHome/StudentHome';
import StudentCourse from './pages/student/StudentCourse/StudentCourse';
import EachStudentCourses from './pages/student/StudentCourse/EachStudentCourses/EachStudentCourses';
import StudentProgress from './pages/student/StudentProgress/StudentProgress';
import StudentProgressEach from './pages/student/StudentProgressEach/StudentProgressEach';
import StudentQuiz from './pages/student/StudentQuiz/StudentQuiz';
import FacultyHome from './pages/faculty/FacultyHome/FacultyHome';
import FacultyCourse from './pages/faculty/FacultyCourse/FacultyCourse';
import AccountManagement from './pages/facultyHead/accountManagement/AccountManagement';
import Login from './pages/Login';
import EachFacultyCourse from './pages/faculty/FacultyCourse/EachFacultyCourse/EachFacultyCourse';
import CreateMultipleChoice from './pages/faculty/CreateQuiz/CreateMultipleChoice';
import FacultyQuiz from './pages/faculty/FacultyQuiz/FacultyQuiz';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={ <Login />}></Route>  
          <Route path="/student-courses" element={ <StudentCourse/>}></Route> 
          <Route path="/student-courses-id" element={ <EachStudentCourses/>}></Route>   
          <Route path="/student-progress" element={ <StudentProgress/>}></Route>   
          <Route path="/student-progress-id" element={ <StudentProgressEach/>}></Route>   
          <Route path="/student-quiz-id" element={ <StudentQuiz/>}></Route>   


          {/* Faculty */}
          <Route path="/faculty-home" element={ <FacultyHome />}></Route>  
          <Route path="/faculty-courses" element={ <FacultyCourse />}></Route>  
          <Route path="/faculty-courses/:id" element={ <EachFacultyCourse/>}></Route>  
          <Route path="/faculty-quizzes" element={ <FacultyQuiz/>}></Route>  
          <Route path="/create-multiple-choice-quiz" element={ <CreateMultipleChoice/>}></Route> 
          <Route path="/account-management" element={ <AccountManagement />} />

          <Route path="/student-home" element={ <StudentHome />} />

        </Routes>      
      </BrowserRouter>    
    </>
  );
}

export default App;

