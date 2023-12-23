import React, { useEffect } from "react";
import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import CardView from "./cardView";
import Modal from "../../../components/modals";
 
function ListView({items,header,TicketForm,ticketSaveFunction, ThreadForm,threadSaveFunction,completeTicket}) {
  const [selected, setSelected] = React.useState({idx:0,data:items?.[0]});

  const setSelectedItem = (idx,data) => {
    setSelected({idx,data});
}

  useEffect(()=>{
    setSelected((prev)=>{return {...prev, data:items?.[prev.idx]}})
  },[items])
 
  return (
    <div className="flex flex-row py-3 px-3 items-start flex-grow">
    <Card className="w-96 mr-4 border-2 border-black h-full">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{header}</Typography>
        </header>
      <List>
        {items?.map((data,idx)=>{
            return(
                <ListItem className="mb-2 border-gray-950 border-b-2 focus:bg-blue-500" key={idx} selected={selected.idx === idx} onClick={() => setSelectedItem(idx,data)}>
                    {data.title}
                </ListItem>
            )
        })}
      </List>
      <div className="flex justify-between mt-auto w-full">
      <Modal Body={TicketForm} title={"Create Ticket"} saveFunction={ticketSaveFunction} buttonName={'create ticket'}/>
      </div>
    </Card>
    <CardView data={selected.data} completeTicket={completeTicket} ThreadForm={ThreadForm} threadSaveFunction={threadSaveFunction}/>
    </div>
  );
}

export default ListView;