import client from "../../axios";
import Modal from "../../components/modals";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import useTicketForm from "./component/ticketForm";
import useThreadForm from "./component/threadForm";

function CreateTicket(){
    const [tickets, setTickets] = useState([]);

    async function getThread(id){
        return await client.get(`thread/${id}`)
    }

    async function getTicket(){
        const request= await client.get('ticketthread/')
        setTickets(request.data)
    }

    const {TicketForm, handleTicketSubmit} = useTicketForm({getTicket})
    const {ThreadForm, handleThreadSubmit} = useThreadForm({getTicket})
    
    useEffect(()=>{
        getTicket()
    },[])



    return(
        <div>
            <NavBar/>
            <Modal Body={TicketForm} title={"Create ticket"} saveFunction={handleTicketSubmit} buttonName={'create ticket'}/>
            {
                tickets.map((data,index)=>{
                    return (
                        <div key={index}>
                            <div>TA: {data.TA}</div>
                            <div>Prof: {data.prof}</div>
                            <div>Student: {data.student?.name}</div>
                            <div>Title: {data.title}</div>
                            <div>Category: {data.category}</div>
                            <div>Severity: {data.severity}</div>
                            <div>Details: {data.details}</div>
                            <h1>THREAD:</h1>
                            <div>{data.thread.map((data,index)=>{
                                return (
                                    <div key = {index}>
                                        <div>by:{data.by}</div>
                                        <div>date:{data.date}</div>
                                        <div>details:{data.details}</div>
                                    </div>
                                )
                            })}</div>
                            <Modal Body={ThreadForm} title={"Create thread"} saveFunction={handleThreadSubmit} id={data.id} buttonName={'create thread'}/>
                        </div>
                    )
            })
            }
        </div>
    )
}

export default CreateTicket;