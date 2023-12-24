import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import CreateTicket from "./pages/createTicket/createTicket";
import CreateTask from "./pages/createTask/createTask";
import CreateClass from "./pages/createClass/createClass";
import AddUser from "./pages/addUser/addUser";
import SignUp from "./pages/signUp/signUp";
import Completed from "./pages/completed/complete";

function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createticket" element={<CreateTicket/>}/>
            <Route path="/createtask" element={<CreateTask/>}/>
            <Route path="/completed" element={<Completed/>}/>
            <Route path="/createclass" element={<CreateClass/>}/>
            <Route path="/adduser" element={<AddUser/>}/>            
            <Route path="/signup" element={<SignUp/>}/>            
        </Routes>
      </BrowserRouter>
    );
}

export default App;