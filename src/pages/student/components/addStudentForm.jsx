import { useEffect, useState } from "react";
import client from "../../../axios";
import { Button, Typography } from "@material-tailwind/react";
import { useIsAuthenticated } from "@azure/msal-react";

function useStudentForm ({getStudent}){
    const [inputs, setInputs] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [groups, setGroups]=useState([])
    const [groupInput, setGroupInput]=useState([])

    async function getGroups(){
        const request = await client.get('group/')
        setGroups(request.data)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required!";
        }
        if (!values.VMS) {
          errors.VMS = "VMS is required!";
        } 
        if (!values.program_year) {
          errors.program_year = "Program Year is required";
        } 
        if (!values.student_type) {
            errors.student_type = "Student Type is required!";
        } 
        if (!values.course_type) {
            errors.course_type = "Course Type is required";
        } 
        if (!values.nationality) {
            errors.nationality = "Nationality is required!";
        } 
        return errors;
      };

    const handleSubmit = async () =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            try{
                await client.post('addstudent/',{...inputs, groups:groupInput},{
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  setInputs({})
                  getStudent()
                  setFormErrors({})
                  setGroupInput([])
                  return true
            } catch(err){
                setFormErrors({VMS:err.response.data.error})
            }
        } else{
            setFormErrors(errors);
            return false
        }
        
    }

    const handleGroupChange= (e) =>{
        if(!groupInput.includes(e.target.value)){
            setGroupInput(prev=>[...prev,e.target.value])
        } else{
            setGroupInput(prev=>prev.filter(item => item !== e.target.value))
        }
    }

    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated){
            getGroups()
        }
    },[isAuthenticated])

    const StudentForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                    Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="name" value={inputs.name || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.name}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    VMS
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="VMS" value={inputs.VMS || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.VMS}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Program and Year
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="program_year" value={inputs.program_year || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.program_year}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Student Type
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="student_type" value={inputs.student_type || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.student_type}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Course Type
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="course_type" value={inputs.course_type || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.course_type}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Nationality
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="nationality" value={inputs.nationality || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.nationality}</h6>
                </div>
            </div>  
            <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                Groups Registered
            </label>
            <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1">{groupInput.toString()||"Choose Groups from dropdown. Select Groups again to remove"}</div>
            <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleGroupChange} name="group" value={""}>
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
            </div>
            </div>
            </div>
        </form>
        )
    }
    return ({
        handleSubmit,
        StudentForm
    })
}

export default useStudentForm;