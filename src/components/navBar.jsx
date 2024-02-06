import { Link, useNavigate } from "react-router-dom"
import ntu from "../assets/ntu.png"
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
<nav className="flex justify-around py-4 border-b-2 w-full bg-ntublue">
  <div className="flex items-center">
    <Link to="/">
        <img src={ntu} className="object-scale-down h-25 w-48"/>
    </Link>
  </div>
  {/* <!-- left header section --> */}
  <div className="items-center hidden space-x-8 lg:flex">
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/" className="hover:text-ntured">Home</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/createticket" className="hover:text-ntured">Ticket</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/createtask" className="hover:text-ntured">Task</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/completed" className="hover:text-ntured">Completed</Link>
    </Typography>
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/student" className="hover:text-ntured">Students</Link>
    </Typography>
    {
        type==='Prof'&&
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/class" className="hover:text-ntured">Class</Link>
    </Typography>
    }
    <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-medium"
      >
    <Link to="/faq" className="hover:text-ntured">FAQ</Link>
    </Typography>
  </div>
  {/* <!-- right header section --> */}
  <div className="flex items-center space-x-2">
      {
        type==='Prof'&&
    <button className="px-2 py-1 text-gray-200 bg-ntured rounded-md">
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
    <button className="px-2 py-1 text-gray-200 bg-ntured rounded-md" onClick={logout}>
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