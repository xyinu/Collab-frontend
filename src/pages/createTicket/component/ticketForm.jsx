import { useEffect, useState } from "react";
import client from "../../../axios";
import { Button, Typography } from "@material-tailwind/react";
import { useIsAuthenticated } from "@azure/msal-react";
import uploadcloud from '../../../assets/upload-cloud.svg'

function useTicketForm ({getTicket}){
    const [inputs, setInputs] = useState({category:"Student Request", severity:"High"});
    const [prof, setProf]=useState([])
    const [student, setStudent]=useState([])
    const [file, setFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [categories, setCategories]=useState([])
    const [categoryInput, setCategoryInput]=useState("")
    const [show, setShow]=useState(false)
    const [groups,setGroups]=useState([])
    const handleShow =(e) =>{
        setShow(prev=>!prev)
    }

    async function getCategories(){
        const request = await client.get('ticketcategory/')
        setCategories(request.data)
    }

    const handleCategorySubmit = async() =>{
        await client.post('ticketcategory/',{category:categoryInput})
        setShow(prev=>!prev)
        setCategoryInput("")
        await getCategories()
    }

    const handleCategoryChange = (e) => {
        setCategoryInput(e.target.value)
    }

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
        if (!values.group) {
            errors.group = "Course Group Type is required!";
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
            setFile(null)
            return true
        } else{
            setFormErrors(errors);
            return false
        }
        
    }

    async function getStudent(){
        const request = await client.get('studenttrunc/')
        setStudent(request.data)
    }

    async function getProf(){
        const request = await client.get('prof/')
        setProf(request.data)
    }
    async function getGroups(){
        const request = await client.get('group/')
        setGroups(request.data)
    }
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated){
            Promise.all(
                [
                getStudent(),
                getProf(),
                getCategories(),
                getGroups()
                ]
            )
        }
    },[isAuthenticated])

    const TicketForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-2">
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
            
            <div className="flex flex-wrap -mx-3 mb-2">
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
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                    Title
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.title}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Course Group Type 
                </label>
                <div className="relative mb-2">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="group" value={inputs.group || ""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {groups.map((data,idx)=>{
                        return (
                            <option key={idx} value={`${data.cour_code} ${data.group_code} ${data.type}`}>{`${data.cour_code} ${data.group_code} ${data.type}`}</option>
                            )
                    })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    <h6 className="text-red-500 text-lg">{formErrors.group}</h6>
                </div>
                </div>
                </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Detail
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Category
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="category" value={inputs.category || ""}>
                    {
                        categories.map((data,idx)=>{
                            return <option key={idx}>{data.category}</option>
                        })
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <div className="w-full md:w-1/2 px-3 md:mb-0">
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
            <div>
            {show && 
            <div className="flex flex-row mb-2">
            <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 w-1/2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" onChange={handleCategoryChange} name="categories" value={categoryInput}/>
            <Button size="sm" color="green" onClick={handleCategorySubmit}>
            <p>
                Submit Category
            </p>
            </Button>
            <Button size="sm" color="green" className="ml-2"onClick={handleShow}>
            <p>
                x
            </p>
            </Button>
            </div>
            }
            {
                !show &&
                <Button size="sm" color="green" onClick={handleShow} className="mb-2">
                <p>
                    Add Category
                </p>
                </Button>
            }
            </div>
            <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
            <label className="block uppercase text-gray-700 text-xs font-bold">
                Upload relevant file if needed
            </label>
            <div className="flex flex-row items-center">
            <label htmlFor="uploadFile1"
              className="bg-ntured text-white text-sm px-4 py-2.5 outline-none rounded-none w-max cursor-pointer">
              <svg xmlns={uploadcloud} className="w-5 mr-2 fill-white inline" viewBox="0 0 32 32">
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000" />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000" />
              </svg>
              Upload
              <input type="file" id='uploadFile1' className="hidden" onChange={handleFileChange}/>
            </label>
            <p className="truncate ml-2">{file?.name}</p>
            </div>
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