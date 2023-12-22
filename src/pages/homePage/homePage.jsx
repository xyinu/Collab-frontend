import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import client from "../../axios";
import ntu_logo from "../../assets/ntu_logo.png"
import microsoft_icon from "../../assets/microsoft_icon.png"
import { useState } from "react";
import NavBar from "../../components/navBar";

function HomePage() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [name,setName]=useState('')
    console.log(isAuthenticated,"test")
    // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
    const handleLogin = async () => {
      try {
        const response = await instance.loginPopup();
        setName(response.account.name)
      } catch (error) {
        console.log(error);
      }
    };
    const getAccessToken= async ()=>{
      try{
        const tokenResponse= (await instance.acquireTokenSilent({cacheLookupPolicy:1,scopes: ["openid"]})).idToken
        console.log(tokenResponse)
      } catch(error){
        console.log(error)
      }
    }
  
    const handleLogout = async () => {
      try {
        const response= await instance.logoutRedirect()
      } catch (error){
        console.log(error)
      }
    }
    
    const handleSend = async () => {
      try {
        const response= await client.get('/user')
        console.log(response)
      } catch (error){
        console.log(error)
      }
    }
  
    return (
      <> 
        {isAuthenticated && 
            <div>
                <NavBar/>
                <h1>Hello, {localStorage.getItem('name')}</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            </div>

        }
        {!isAuthenticated && 
            <div className="flex flex-col items-center">
                <img className="object-cover h-96 w-192" src={ntu_logo}/>
                <button className="relative flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold h-6/12 w-4/12 rounded px-4 py-4" onClick={handleLogin}>
                    <img className="object-scale-down h-10 w-10 absolute left-2" src={microsoft_icon}/>
                    <h2>Login with Microsoft</h2>
                </button>
            </div>
        }
      </>
    );
}

export default HomePage