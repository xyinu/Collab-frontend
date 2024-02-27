import { useEffect, useState } from "react";
import { List, ListItem, Card, Typography, Button } from "@material-tailwind/react";
import CardView from "./cardView";
import search from "../../../assets/search.webp"
import Modal from "../../../components/modals";
import useStudentForm from "./addStudentForm";
 
function ListView({items,header,getStudent,groups}) {
  const {StudentForm,handleSubmit} = useStudentForm({getStudent,hold:groups})
  const [selected, setSelected] = useState({idx:0,data:items?.[0]});
  const [store, setStore] = useState()
  const type=localStorage.getItem('type')
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
        item.group_course.map((data)=>data.code.toLowerCase().includes(val) || data.type.toLowerCase().includes(val) || data.course_code.toLowerCase().includes(val)).includes(true)
        )
      setStore(resultsArray)
  }
 
  return (
    <div className="flex flex-row py-3 px-3 items-start flex-grow">
    <Card className="w-96 mr-4 rounded-none border-2 border-black h-full">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
        <Typography variant="h5">{header}</Typography>
        <div className="absolute right-1 text-black">
        {type==='Prof' && <Modal Body={StudentForm} title={"Add Student"} saveFunction={handleSubmit} buttonName={<Typography variant="h5">+</Typography>}/>}
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
        {store?.map((data,idx)=>{
            return(
                <ListItem className="mb-2 border-gray-950 border-b-2 focus:bg-blue-500 flex justify-between" key={idx} selected={selected.idx === idx} onClick={() => setSelectedItem(idx,data)}>
                    <Typography variant="h6">{data.name} {`(${data.VMS})`}</Typography>
                </ListItem>
            )
        })}
      </ul>
    </Card>
    <CardView data={selected.data} getStudent={getStudent} groups={groups}/>
    </div>
  );
}

export default ListView;