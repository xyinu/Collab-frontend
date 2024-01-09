import client from "../../axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import TaskListView from "./components/taskListView";
import TicketListView from "./components/ticketListView";

function Completed(){

    const [tasks, setTasks] = useState([]);
    const [screen, setScreen] = useState(true)
    const [tickets, setTickets] = useState([]);

    function setChange(){
        setScreen(prev=>!prev)
    }

    async function getTicket(){
        const request= await client.get('completedticket/')
        setTickets(request.data)
    }

    async function getTask(){
        const request= await client.get('completedtask/')
        setTasks(request.data)
    }

    useEffect(()=>{
        getTask()
        getTicket()
    },[])

    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            {
                screen ?
                <TicketListView items={tickets} header={'Ticket'} setChange={setChange}/>
                :
                <TaskListView items={tasks} header={'Tasks'} setChange={setChange}/>
            }
        </div>
    )
}

export default Completed;