import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import CreateTicket from "./pages/createTicket/createTicket";

function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<CreateTicket/>}/>
        </Routes>
      </BrowserRouter>
    );
}

export default App;