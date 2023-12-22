import client from "../../axios";
import Modal from "../../components/modals";
import react, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/navBar";

function CreateTask(){

    const [inputs, setInputs] = useState({dueDate:new Date()});
    const [tasks, setTasks] = useState([]);


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

    const handleSubmit = async (event) =>{
       await client.post('createtask/',inputs)
       setInputs({dueDate:new Date()})
       getTask()
    }


    useEffect(()=>{
        getTask()
    },[])

    function Form(){
        return(
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-prof">
                        TA Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-prof" type="text" placeholder="....@e.ntu.edu.sg" onChange={handleChange} name="ta" value={inputs.ta || ""}/>
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
                </form>
        )
    }



    return(
        <div>
            <NavBar/>
            <Modal Body={Form} title={"Create Task"} saveFunction={handleSubmit} buttonName={'create task'}/>
            {
                tasks.map((data,index)=>{
                    return (
                        <div key={index}>
                            <div>TA: {data.TA}</div>
                            <div>Prof: {data.prof}</div>
                            <div>Title: {data.title}</div>
                            <div>Due Date: {data.dueDate}</div>
                            <div>Details: {data.details}</div>
                        </div>
                    )
            })
            }
        </div>
    )
}

export default CreateTask;