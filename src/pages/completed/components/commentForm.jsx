import { useState } from "react";
import client from "../../../axios";

function useCommentForm ({getItem,item}){
    const [inputs, setInputs] = useState("");
    const [formErrors, setFormError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(value)
    }

    async function commentTicket({id}){
        if(inputs){
            if(item==='ticket'){
                await client.post('reopenticket/',{comment:inputs,id})
            }else{
                await client.post('reopentask/',{comment:inputs,id})
            }
            getItem()
            setInputs("")
            setFormError('')
            return true
        }else{
            setFormError('Comment Is Required!')
            return false
        }
    }

    const CommentForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Reopen Comment
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="comment" value={inputs|| ""}/>
                <h6 className="text-red-500 text-lg">{formErrors}</h6>
                </div>
            </div>
        </form>
        )
    }
    return ({
        commentTicket,
        CommentForm
    })
}

export default useCommentForm;