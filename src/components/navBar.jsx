import { Link } from "react-router-dom"
import ntu from "../assets/ntu_logo.png"
import { msalInstance } from "../main"


function NavBar(){
    async function logout(){
        await msalInstance.logoutRedirect()
    }


    return(
<nav className="flex justify-around py-4 bg-gray-200 w-full">
  <div className="flex items-center">
    {/* <h3 className="text-2xl font-medium text-blue-500">LOGO</h3> */}
    <Link to="/">
        <img src={ntu} className="object-scale-down h-30 w-48"/>
    </Link>
  </div>
  {/* <!-- left header section --> */}
  <div className="items-center hidden space-x-8 lg:flex">
    <Link to="/">Home</Link>
    <Link to="/createticket">Ticket</Link>
    <Link to="/createtask">Task</Link>
    <Link to="">Under Review</Link>
    <Link to="">Pending Response</Link>
    <Link to="">Done</Link>
    <Link to="">FAQ</Link>
  </div>
  {/* <!-- right header section --> */}
  <div className="flex items-center space-x-2">
    <button className="px-4 py-2 text-gray-200 bg-blue-400 rounded-md">
    <Link to="/createclass">
      Create Class
    </Link>
    </button>
    <button className="px-4 py-2 text-gray-200 bg-blue-400 rounded-md">
    <Link to="/adduser">
      Add User
    </Link>
    </button>
    <button className="px-4 py-2 text-gray-200 bg-blue-400 rounded-md" onClick={logout}>
      Log Out
    </button>
  </div>
</nav>
    )
}

export default NavBar