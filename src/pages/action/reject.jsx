import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../../axios";
import { Typography } from "@material-tailwind/react";

function Reject(){
    let [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse]=useState('')
    useEffect(async ()=>{
        const res = await client.post('rejectticket/',{id:searchParams.get('id')})
        setResponse(res.data.response)
    },[])

    return(
        <div>
            <Typography color="black" variant="h4">{response}</Typography>
        </div>
    )
}

export default Reject