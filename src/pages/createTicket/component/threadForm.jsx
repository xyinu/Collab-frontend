import { useState } from "react";
import client from "../../../axios";

function useThreadForm ({getTicket}){
    const [inputs, setInputs] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(value)
    }

    const handleThreadSubmit = async ({id}) =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('createthread/',{details:inputs,id:id})
            setInputs("")
            await getTicket()
            setFormErrors({})
            return true
        } else {
            setFormErrors(errors);
            return false
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values) {
            errors.details = "Detail is required!";
        } 
        return errors;
    };

    const ThreadForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Detail
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs|| ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                </div>
            </div>
        </form>
        )
    }
    return ({
        handleThreadSubmit,
        ThreadForm
    })
}

export default useThreadForm;