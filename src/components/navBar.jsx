import { Link, useNavigate } from "react-router-dom"
import ntu from "../assets/ntu_logo.png"
import { msalInstance } from "../main"
import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useIsAuthenticated } from "@azure/msal-react"


function NavBar(){
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    async function logout(){
        localStorage.removeItem('type')
        await msalInstance.logoutRedirect()
    }
    const [type,setType] = useState('')

    useEffect(()=>{
      const retrieve=localStorage.getItem('type')
      if(!retrieve){
        if(isAuthenticated){
          logout()
        } else {
          navigate('/')
        }
      } else{
        setType(retrieve)
      }
    },[])

    return(
      type && 
<nav className="flex justify-around py-4 border-b-2 w-full">
  <div className="flex items-center">
    <Link to="/">
        <img src={ntu} className="object-scale-down h-25 w-48 mr-20"/>
    </Link>
  </div>
  {/* <!-- left header section --> */}
  <div className="items-center hidden space-x-8 lg:flex ml-15">
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/" className="hover:text-blue-500">Home</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
    <Link to="/createticket" className="hover:text-blue-500">Ticket</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
    <Link to="/createtask" className="hover:text-blue-500">Task</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
    <Link to="/completed" className="hover:text-blue-500">Completed</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
    <Link to="/student" className="hover:text-blue-500">Students</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-medium"
      >
    <Link to="/faq" className="hover:text-blue-500">FAQ</Link>
    </Typography>
  </div>
  {/* <!-- right header section --> */}
  <div className="flex items-center space-x-2">
      {
        type==='Prof'&&
    <button className="px-2 py-1 text-gray-200 bg-blue-400 rounded-md">
    <Typography
        variant="h6"
        className="p-1 font-medium"
      >
    <Link to="/createclass">
      Class
    </Link>
    </Typography>
    </button>
      }
      {
        type==='Prof'&&
    <button className="px-2 py-1 text-gray-200 bg-blue-400 rounded-md">
    <Typography
        variant="h6"
        className="p-1 font-medium"
      >
    <Link to="/adduser">
      Add User
    </Link>
    </Typography>
    </button>
      }
    <button className="px-2 py-1 text-gray-200 bg-blue-400 rounded-md" onClick={logout}>
    <Typography
        variant="h6"
        className="p-1 font-medium"
      >
        Log Out
    </Typography>
    </button>
  </div>
</nav>
    )
}

export default NavBar