import client from "../../axios";
import Modal from "../../components/modals";
import react, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/navBar";
import ListView from "./components/listView";

function CreateTask(){

    const [inputs, setInputs] = useState({dueDate:new Date()});
    const [tasks, setTasks] = useState([]);
    const [TA, setTA]=useState([]);
    const [TAInput, setTAInput]=useState([])
    const [file, setFile] = useState(null);

    async function getTA(){
        const request = await client.get('ta/')
        setTA(request.data)
    }

    const handleTAChange= (e) =>{
        if(!TAInput.includes(e.target.value)){
            setTAInput(prev=>[...prev,e.target.value])
        } else{
            setTAInput(prev=>prev.filter(item => item !== e.target.value))
        }
    }

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleDateChange = (value) => {
        setInputs(values => ({...values, dueDate: value}))
    }

    async function getTask(){
        const request= await client.get('task/')
        console.log(request.data)
        setTasks(request.data)
    }

    async function completeTask(e){
        await client.post('completetask/',{id:e.target.name})
        getTask()
    }

    const handleSubmit = async (event) =>{
       await client.post('createtask/',{...inputs, 'tas':TAInput, file:file},{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
       setTAInput([])
       setInputs({dueDate:new Date()})
       getTask()
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    useEffect(()=>{
        getTask()
        getTA()
    },[])

    function Form(){
        return(
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    TA
                </label>
                <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1">{TAInput.toString()||"Choose TAs from dropdown. Select TA again to remove"}</div>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleTAChange} name="ta" value={""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {TA.map((data,idx)=>{
                        return (
                            <option key={idx} value={data.email}>{data.name}</option>
                        )
                    })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                        Title
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || ""}/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                        Detail
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details || ""}/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                        Due Date
                    </label>
                    <DatePicker selected={inputs.dueDate} name="dueDate" onChange={handleDateChange} showTimeSelect showIcon dateFormat="dd/M/yyyy h:mm aa" className="bg-gray-200 border-gray-200 rounded py-3 px-4 mb-3"/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Upload relevant file if needed
                    </label>
                    <label htmlFor="file" className="sr-only py-3">
                    Choose a file
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                </div>
                </div>
                </form>
        )
    }



    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tasks} header={'Tasks'} leftbutton={{onClick:completeTask,text:'complete task'}} Form={Form} saveFunction={handleSubmit}/>
        </div>
    )
}

export default CreateTask;