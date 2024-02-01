import React, { useEffect, useState } from "react";
import { List, ListItem, Card, Typography, Button } from "@material-tailwind/react";
import CardView from "./cardView";
import Modal from "../../../components/modals";
import search from "../../../assets/search.webp"

function ListView({items,header,Form,saveFunction,getTask}) {
  const [selected, setSelected] = useState({idx:0,data:items?.[0]});
  const type=localStorage.getItem('type')
  const [store, setStore] = useState()

  const setSelectedItem = (idx,data) => {
    setSelected({idx,data});
  }
  useEffect(()=>{
    setSelected((prev)=>{return {...prev, data:items?.[prev.idx]}})
    setStore(items)
  },[items])
  const handleSearchChange = (e) => {
    if (!e.target.value) return setStore(items)
    const val = e.target.value.toLowerCase()
    const resultsArray = items.filter(item => 
      item.TA.toLowerCase().includes(val) || 
      item.dueDate.toLowerCase().includes(val) ||   
      item.details.toLowerCase().includes(val) ||
      item.prof.toLowerCase().includes(val) ||
      item.title.toLowerCase().includes(val) ||
      item.date.toLowerCase().includes(val) ||
      item.dueDate.toLowerCase().includes(val) ||
      item?.file_name?.includes(val)||
      item.thread.map((data)=>data.details.toLowerCase().includes(val)).includes(true)
      )
    setStore(resultsArray)
  }
  return (
    <div className="flex flex-row py-3 px-3 items-start flex-grow">
    <Card className="w-96 mr-4 border-2 border-black h-full">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{header}</Typography>
        <div className="absolute right-1 text-black">
      {type==='Prof' && <Modal Body={Form} title={"Create Task"} saveFunction={saveFunction} buttonName={<Typography variant="h5">+</Typography>}/>}
      </div>
        </header>
        <form className="flex flex-row items-center appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
        <input 
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded leading-tight py-3 px-4 focus:outline-none" 
        type="text" 
        placeholder="Search" 
        onChange={handleSearchChange} 
        name="title" 
        />
        <div className="mr-1">
        <img src={search} height={30} width={30}/>
        </div>
      </form>
      <ul className="overflow-auto h-[calc(100vh-250px)] p-1 scrollbar">
        {store?.map((data,idx)=>{
            return(
                <ListItem className="mb-2 border-gray-950 border-b-2 focus:bg-blue-500 flex justify-between" key={idx} selected={selected.idx === idx} onClick={() => setSelectedItem(idx,data)}>
                    <div>
                    <Typography variant="h6">{data.title}</Typography>
                    <Typography variant="h6">Last Reply: {data.status}</Typography>
                    </div>
                </ListItem>
            )
        })}
      </ul>
    </Card>
    <CardView data={selected.data} getTask={getTask}/>
    </div>
  );
}

export default ListView;