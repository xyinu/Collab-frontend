import { useEffect, useState } from "react";
import client from "../../../axios";
import { Typography } from "@material-tailwind/react";

function useTicketForm ({getTicket}){
    const [inputs, setInputs] = useState({category:"Student Request", severity:"High"});
    const [prof, setProf]=useState([])
    const [student, setStudent]=useState([])
    const [file, setFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const validate = (values) => {
        const errors = {};
        if (!values.prof) {
          errors.prof = "Prof is required!";
        }
        if (!values.student) {
          errors.student = "Student is required!";
        } 
        if (!values.title) {
          errors.title = "Title is required";
        } 
        if (!values.details) {
            errors.details = "Detail is required!";
        } 
        return errors;
      };

    const handleTicketSubmit = async () =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('createticket/',{...inputs, file:file},{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
            setInputs({category:"Student Request", severity:"High"})
            getTicket()
            setFormErrors({})
            return true
        } else{
            setFormErrors(errors);
            return false
        }
        
    }

    async function getStudent(){
        const request = await client.get('student/')
        setStudent(request.data)
    }

    async function getProf(){
        const request = await client.get('prof/')
        setProf(request.data)
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    useEffect(()=>{
        getStudent()
        getProf()
    },[])

    const TicketForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Prof
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="prof" value={inputs.prof || ""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {prof.map((data,idx)=>{
                        return (
                            <option key={idx} value={data.email}>{data.name}</option>
                        )
                    })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                    <h6 className="text-red-500 text-lg">{formErrors.prof}</h6>
                </div>
            </div>
            
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Student
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="student" value={inputs.student || ""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {student.map((data,idx)=>{
                        return (
                            <option key={idx} value={data.VMS}>{data.name}</option>
                        )
                    })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                    <h6 className="text-red-500 text-lg">{formErrors.student}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                    Title
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.title}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Detail
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Category
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="category" value={inputs.category || ""}>
                    <option>Student Request</option>
                    <option>Student Issue</option>
                    <option>Student Question</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Severity
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="severity" value={inputs.severity || ""}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
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
    return ({
        handleTicketSubmit,
        TicketForm
    })
}

export default useTicketForm;