import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from './pages/StudentHome/StudentHome';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <StudentHome />}></Route>  
        </Routes>      
      </BrowserRouter>    
    </>
  );
}

export default App;

