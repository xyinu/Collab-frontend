import { useState } from "react";
import client from "../../../axios";

function useEditForm ({getFaq,details,title}){
    const [inputs, setInputs] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))  
    }

    const handleEditSubmit = async ({id}) =>{
        await client.put('faq/',{...inputs,id:id})
        setInputs("")
        await getFaq()
     }

    const EditForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                    Title
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || title}/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Detail
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details|| details}/>
                </div>
            </div>
        </form>
        )
    }
    return ({
        handleEditSubmit,
        EditForm
    })
}

export default useEditForm;