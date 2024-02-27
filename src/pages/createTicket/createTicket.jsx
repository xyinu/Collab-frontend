import client from "../../axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import useTicketForm from "./component/ticketForm";
import ListView from "./component/listView";
import { useIsAuthenticated } from "@azure/msal-react";

function CreateTicket(){
    const [tickets, setTickets] = useState([]);

    async function getTicket(){
        const request= await client.get('ticketthread/')
        setTickets(request.data)
    }
    const {TicketForm, handleTicketSubmit} = useTicketForm({getTicket})

    useEffect(()=>{
        getTicket()
    },[])


    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tickets} header={'Tickets'} TicketForm={TicketForm} ticketSaveFunction={handleTicketSubmit} getTicket={getTicket}/>
        </div>
    )
}

export default CreateTicket;