import { useEffect, useState } from "react";
import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import CardView from "./cardView";
import Modal from "../../../components/modals";
import search from "../../../assets/search.webp"
 
function ListView({items,header,getFaq,Form,saveFunction}) {
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
      item.VMS.toLowerCase().includes(val) || 
      item.name.toLowerCase().includes(val) ||
      
      item.nationality.toLowerCase().includes(val) ||
      item.student_type.toLowerCase().includes(val) ||
      item.course_type.toLowerCase().includes(val) ||
      item.group_course.map((data)=>data.group.code.toLowerCase().includes(val) || data.group.type.toLowerCase().includes(val) || data.group.course_code.toLowerCase().includes(val)).includes(true)
      )
    setStore(resultsArray)
}
 
  return (
    <div className="flex flex-row py-3 px-3 items-start flex-grow w-screen">
    <Card className="w-96 mr-4 border-2 border-black h-full">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{header}</Typography>
        <div className="absolute right-1 text-black">
      {type==='Prof' && <Modal Body={Form} title={"Create FAQ"} saveFunction={saveFunction} buttonName={<Typography variant="h5">+</Typography>}/>}
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
      <List>
        {store?.map((data,idx)=>{
            return(
                <ListItem className="mb-2 border-gray-950 border-b-2 focus:bg-blue-500 flex justify-between" key={idx} selected={selected.idx === idx} onClick={() => setSelectedItem(idx,data)}>
                    <Typography variant="h6">Title: {data.title}</Typography>
                </ListItem>
            )
        })}
      </List>
    </Card>
    <CardView data={selected.data} getFaq={getFaq}/>
    </div>
  );
}

export default ListView;