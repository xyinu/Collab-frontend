import { useState } from "react";
import client from "../../../axios";

function useCommentForm ({getTask}){
    const [inputs, setInputs] = useState("");
    const [formErrors, setFormError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(value)
    }

    async function commentTask({id}){
        if(inputs){
            await client.post('completetask/',{comment:inputs,id})
            getTask()
            setFormError('')
            setInputs("")
            return true
        }else{
            setFormError('Final Comment Is Required!')
            return false
        }
    }

    const CommentForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Final Comment
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="comment" value={inputs|| ""}/>
                <h6 className="text-red-500 text-lg">{formErrors}</h6>
                </div>
            </div>
        </form>
        )
    }
    return ({
        commentTask,
        CommentForm
    })
}

export default useCommentForm;