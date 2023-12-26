import { useState } from "react";
import client from "../../axios"
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";


function SignUp(){
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const [response,setResponse] = useState("")

    const handleSubmit = async (event) =>{
        try{
            await instance.loginPopup()
            const res = await client.post('login/')
            setResponse(res.data.success)
        } catch(err){
            setResponse("Error: please contact professor to allow access")
        }
    }

    return (
        <div>
        {!isAuthenticated &&
        <div className="mx-5 my-5 w-full flex items-center flex-col">
            <Typography color="black" variant="h4">Click on signup to authenticate account</Typography>
            <Button size="lg" color="green" className="my-5" onClick={() => {handleSubmit()}}>Sign Up</Button>
        </div>
        }
        {isAuthenticated &&
            <div className="flex items-center flex-col w-full">
                {
                    response ?
                    <Typography color="black" variant="h1">{response}</Typography> :
                    <Link to="/"><Typography color="black" variant="h1">Already Logged In, Click Me To Return To Home</Typography></Link>
                }
            </div>
        }
        </div>
    )
}

export default SignUp;