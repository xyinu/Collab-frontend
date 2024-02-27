import { useEffect, useState } from "react";
import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import CardView from "./cardView";
import Modal from "../../../components/modals";
import search from "../../../assets/search.webp"

function ListView({items,header, Form, saveFunction, getClass}) {
  const [selected, setSelected] = useState({idx:0,data:items?.[0]?.group?.[0],code:items?.[0]?.code});
  const [store, setStore] = useState()
  const setSelectedItem = (idx,data,code) => {
    setSelected({idx,data,code});
  }
  useEffect(()=>{
    setSelected((prev)=>{return {...prev, data:items?.[0]?.group?.[prev.idx],code:items?.[0]?.code}})
    setStore(items)
  },[items])
  const handleSearchChange = (e) => {
    if (!e.target.value) return setStore(items)
    const val = e.target.value.toLowerCase()
    let resultsArray = items.map(item => {
      return {
        ...item,
        group:item.group.filter((data)=>data.type.toLowerCase().includes(val) || data.group_code.toLowerCase().includes(val) || data.name.toLowerCase().includes(val) || item.code.toLowerCase().includes(val) || 
        data.students.map((dat)=>dat.student.name.toLowerCase().includes(val)||dat.student.VMS.toLowerCase().includes(val)).includes(true)
        )
      }
    }
    )
    setStore(resultsArray)
  }
  return (
    <div className="flex flex-row py-3 px-3 items-start flex-grow">
    <Card className="w-96 mr-4 border-2 border-black h-full rounded-none">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
        <Typography variant="h5">{header}</Typography>
        <div className="absolute right-1 text-black">
        <Modal Body={Form} title={"Add Class"} saveFunction={saveFunction} buttonName={<Typography variant="h5">+</Typography>} color={'bg-ntured'}/>
        </div>    
        </header>
        <form className="flex flex-row items-center appearance-none block w-full bg-gray-200 text-gray-700 border border-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
        <input 
        className="appearance-none block w-full bg-gray-200 text-gray-700 border leading-tight py-3 px-4 focus:outline-none" 
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
        {store?.map((data)=>{
            return data.group.map((dat,idx)=>{
              return(
                <ListItem className="mb-2 border-gray-950 border-b-2 focus:bg-blue-500 flex justify-between flex-col" key={idx} selected={selected.idx === idx} onClick={() => setSelectedItem(idx,dat,data.code)}>
                    <Typography variant="h6">Course Name: {dat.name}</Typography>                    
                    <Typography variant="h6">Course Code: {data.code}</Typography>
                    <Typography variant="h6">Group Code: {dat.group_code}</Typography>
                    <Typography variant="h6">Group Type: {dat.type}</Typography>
                </ListItem>
            )
            })
        })}
      </ul>
      </Card>
    <CardView data={selected.data} code={selected.code} getClass={getClass}/>
    </div>
  );
}

export default ListView;