import { useEffect, useState } from "react";
import client from "../../../axios";

function useEditForm ({getFaq,details,title,categories,category}){
    const [inputs, setInputs] = useState({});
    const [formErrors, setFormErrors] = useState({});

    useEffect(()=>{
        setInputs({details,title,category})
    },[details,title,category])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))  
    }
    const validate = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Question is required";
        } 
        if (!values.details) {
            errors.details = "Answer is required!";
        } 
        return errors;
      };

    const handleEditSubmit = async ({id}) =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.put('faq/',{...inputs,id:id})
            setInputs("")
            setFormErrors({})
            await getFaq()
            return true
        } else{
            setFormErrors(errors);
            return false
        }
     }

    const EditForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                    Question
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title}/>
                <h6 className="text-red-500 text-lg">{formErrors.title}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Answer
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details}/>
                <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Category
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="category" value={inputs.category}>
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