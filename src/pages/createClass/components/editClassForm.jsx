import { useEffect, useState } from "react";
import client from "../../../axios";

function useEditForm ({getClass,students,course_code,group_code}){
    const [inputs, setInputs] = useState([]);
    const [studentsLeft, setStudentsLeft] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const validate = (values) => {
        const errors = {};
        if (inputs.length===0) {
          errors.student = "Select Student!";
        }
        return errors;
      };
    const handleChange= (e) =>{
        if(!inputs.includes(e.target.value)){
            setInputs(prev=>[...prev,e.target.value])
        } else{
            setInputs(prev=>prev.filter(item => item !== e.target.value))
        }
    }

    const getStudents = async() =>{
        const request = await client.get('studenttrunc/')
        if(students){
            const left = request.data.filter(data=>!students.some(dat=>dat.VMS===data.VMS))
            setStudentsLeft(left)
        }
    }

    const handleEditSubmit = async () =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('editclass/',{students:inputs,course_code,group_code})
            setInputs([])
            await getClass()
            setFormErrors({})
            return true
        } else {
            setFormErrors(errors);
            return false
        }
     }

    useEffect(()=>{
        getStudents()
    },[students])

    const EditForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Students
                </label>
                <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1">{inputs.toString()||"Choose Students from dropdown. Select Student again to remove"}</div>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="students" value={""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {studentsLeft.map((data,idx)=>{
                        return (
                            <option key={idx} value={data.VMS}>{data.name}, {data.VMS}</option>
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
                </div>
        </form>
        )
    }
    return ({
        handleEditSubmit,
        EditForm,
    })
}

export default useEditForm;