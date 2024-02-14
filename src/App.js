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
import FacultyQuizResult from './pages/faculty/FacultyQuizResult/FacultyQuizResult';
import CreateVideoQuiz from './pages/faculty/CreateVideoQuiz/CreateVideoQuiz';
import QuizEdit from './components/courseRelated/quizEdit/QuizEdit';


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={ <Login />}></Route>  
          <Route path="/student-courses" element={ <StudentCourse/>}></Route> 
          <Route path="/student-courses/:courseId" element={ <EachStudentCourses/>}></Route>   
          <Route path="/student-progress" element={ <StudentProgress/>}></Route>   
          <Route path="/student-progress-id" element={ <StudentProgressEach/>}></Route>   
          <Route path="/student-quiz/:quizId" element={ <StudentQuiz/>}></Route>   


          {/* Faculty */}
          <Route path="/faculty-home" element={ <FacultyHome />}></Route>  
          <Route path="/faculty-courses" element={ <FacultyCourse />}></Route>  
          <Route path="/faculty-courses/:id" element={ <EachFacultyCourse/>}></Route>  
          <Route path="/faculty-quizzes" element={ <FacultyQuiz/>}></Route>  
          <Route path="/create-multiple-choice-quiz" element={ <CreateMultipleChoice/>}></Route> 
          <Route path="/create-multiple-choice-chosen-quiz" element={ <CreateMultipleChoice/>}></Route> 
          <Route path="/create-multiple-choice-quiz/:quizId" element={ <QuizEdit/>}></Route> 
          <Route path="/create-video-quiz" element={ <CreateVideoQuiz/>}></Route> 
          <Route path="/quiz-id-result" element={ <FacultyQuizResult/>}></Route> 
          <Route path="/account-management" element={ <AccountManagement />} />

          <Route path="/student-home" element={ <StudentHome />} />

        </Routes>      
      </BrowserRouter>    
    </>
  );
}

export default App;

