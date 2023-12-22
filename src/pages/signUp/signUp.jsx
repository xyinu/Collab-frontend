import { useState } from "react";
import client from "../../axios"
import { useIsAuthenticated, useMsal } from "@azure/msal-react";


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
            <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                    handleSubmit()
                }}
                >
                Sign Up
            </button>
        }
        {isAuthenticated &&
            <div>
                <h1 className="font-bold text-3xl">{response}</h1>
            </div>
        }
        </div>
    )
}

export default SignUp;