import { useState } from "react";
import client from "../../../axios";

function useRejectCommentForm ({getTicket}){
    const [inputs, setInputs] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(value)
    }

    async function rejectTicket({id}){
        await client.post('rejectticket/',{comment:inputs,id})
        getTicket()
    }

    const RejectCommentForm = () =>{
        return (
        <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                    Comment
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="comment" value={inputs|| ""}/>
                </div>
            </div>
        </form>
        )
    }
    return ({
        rejectTicket,
        RejectCommentForm
    })
}

export default useRejectCommentForm;