import client from "../../axios";
import Modal from "../../components/modals";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import useTicketForm from "./component/ticketForm";
import useThreadForm from "./component/threadForm";
import ListView from "./component/listView";
import { useIsAuthenticated } from "@azure/msal-react";

function CreateTicket(){
    const [tickets, setTickets] = useState([]);

    async function getTicket(){
        const request= await client.get('ticketthread/')
        setTickets(request.data)
    }

    const {TicketForm, handleTicketSubmit} = useTicketForm({getTicket})
    const {ThreadForm, handleThreadSubmit} = useThreadForm({getTicket})
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated){
            getTicket()
        }
    },[])


    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tickets} header={'Tickets'} TicketForm={TicketForm} ticketSaveFunction={handleTicketSubmit} ThreadForm={ThreadForm} threadSaveFunction={handleThreadSubmit} getTicket={getTicket}/>
        </div>
    )
}

export default CreateTicket;