import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import CreateTicket from "./pages/createTicket/createTicket";
import CreateTask from "./pages/createTask/createTask";
import CreateClass from "./pages/createClass/createClass";
import AddUser from "./pages/addUser/addUser";
import Completed from "./pages/completed/complete";
import Reject from "./pages/action/reject";
import Approve from "./pages/action/approve";
import FAQ from "./pages/faq/faq";
import StudentPage from "./pages/student/student";
import DataPage from "./pages/data/Data";

function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createticket" element={<CreateTicket/>}/>
            <Route path="/createtask" element={<CreateTask/>}/>
            <Route path="/completed" element={<Completed/>}/>
            <Route path="/class" element={<CreateClass/>}/>
            <Route path="/adduser" element={<AddUser/>}/>            
            <Route path='/reject' element={<Reject/>}/>       
            <Route path='/approve' element={<Approve/>}/>   
            <Route path='/faq' element={<FAQ/>}/>       
            <Route path='/student' element={<StudentPage/>}/>       
            <Route path='/data' element={<DataPage/>}/>       
        </Routes>
      </BrowserRouter>
    );
}

export default App;