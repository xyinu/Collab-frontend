import React, { useEffect } from "react";
import { List, ListItem, Card, Typography, Button } from "@material-tailwind/react";
import TicketCardView from "./ticketCardView";
 
function TicketListView({items,header,setChange}) {
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
                    <Typography variant="h6">Title: {data.title}</Typography>
                </ListItem>
            )
        })}
      </List>
      <div className="flex justify-between mt-auto w-full">
      <Button size="lg" color="blue-gray" className="w-full" onClick={setChange}>change to task</Button>
      </div>
    </Card>
    <TicketCardView data={selected.data}/>
    </div>
  );
}

export default TicketListView;