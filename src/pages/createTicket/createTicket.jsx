import client from "../../axios";
import Modal from "../../components/modals";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import useTicketForm from "./component/ticketForm";
import useThreadForm from "./component/threadForm";
import ListView from "./component/listView";

function CreateTicket(){
    const [tickets, setTickets] = useState([]);

    async function getTicket(){
        const request= await client.get('ticketthread/')
        setTickets(request.data)
        console.log(request.data)
    }

    const {TicketForm, handleTicketSubmit} = useTicketForm({getTicket})
    const {ThreadForm, handleThreadSubmit} = useThreadForm({getTicket})
    
    useEffect(()=>{
        getTicket()
    },[])

    async function completeTicket(id){
        await client.post('completeticket/',{id})
        getTicket()
    }

    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tickets} header={'Tickets'} TicketForm={TicketForm} ticketSaveFunction={handleTicketSubmit} ThreadForm={ThreadForm} threadSaveFunction={handleThreadSubmit} completeTicket={completeTicket}/>
        </div>
    )
}

export default CreateTicket;