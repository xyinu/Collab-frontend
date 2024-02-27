import { useEffect, useState } from "react";
import client from "../../axios"
import NavBar from "../../components/navBar";
import { Button, Typography } from "@material-tailwind/react";
import { useIsAuthenticated } from "@azure/msal-react";
import EditModal from "./components/editForm";

function AddUser(){
    const [inputs, setInputs] = useState({access:'TA'});
    const [response, setResponse]=useState()
    const [user, setUser]=useState({TA:[],prof:[]})
    const [formErrors, setFormErrors] = useState({});
    const [groups,setGroups]=useState([])
    const [groupInput, setGroupInput]=useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    async function getGroups(){
        const request = await client.get('group/')
        setGroups(request.data)
    }
    const handleSubmit = async (event) =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            const res = await client.post('createaccess/',{...inputs,group:groupInput},{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
            if(res.data?.success){
                setResponse({color:'green',message:res.data.success})
            } else{
                setResponse({color:'red',message:res.data.failure})
            }
            setInputs({access:'TA'})
            setFormErrors({})
            setGroupInput([])
            getUser()
            return true
        } else {
            setFormErrors(errors);
            return false
        }
    }
    const handleGroupChange= (e) =>{
        if(!groupInput.includes(e.target.value)){
            setGroupInput(prev=>[...prev,e.target.value])
        } else{
            setGroupInput(prev=>prev.filter(item => item !== e.target.value))
        }
    }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        return errors;
    };

    const getUser = async () =>{
        const res = await client.get('user/')
        setUser(res.data)
    }
    const deleteUser = async (email) =>{
        await client.post('deleteuser/',{email})
        getUser()
    }
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated){
            getUser()
            getGroups()
        }
    },[isAuthenticated])

    return (
        <div>
        <NavBar/>
        <form className="w-4/6 px-4 py-4">
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-prof">
                    Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-prof" type="text" placeholder="" onChange={handleChange} name="email" value={inputs.email || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.email}</h6>
                </div>
            </div>
            <div className="w-full mb-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    User Type
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="access" value={inputs.access || ""}>
                    <option>TA</option>
                    <option>Prof</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Course Group Type 
                </label>
                <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1">{groupInput.toString() ||"Select Course Group Type from dropdown. Select again to remove"}</div>
                <div className="relative mb-2">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleGroupChange} name="group" value={""}>
                    <option hidden disabled value=''> -- select an option -- </option>
                    {groups.map((data,idx)=>{
                        return (
                            <option key={idx} value={`${data.cour_code} ${data.group_code} ${data.type}`}>{`${data.cour_code} ${data.group_code} ${data.type}`}</option>
                            )
                    })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    <h6 className="text-red-500 text-lg">{formErrors.group}</h6>
                </div>
                </div>
                </div>
            <Button size="lg" className="bg-ntured border-none" onClick={() => {handleSubmit()}}>Add User</Button>
            {response && <Typography color={response.color} variant="h6">{response.message}</Typography>}
        </form>
        <div className="flex flex-row">
        <div className="px-4">
        <Typography variant="h6">Profs registered</Typography>
            {user.prof.map((data,idx)=>{
                if(data.name){
                    return <Typography key={idx}>{idx+1}{')'} {data.name} - {data.email} <Button size="sm" className="bg-ntured mb-1" onClick={() => {deleteUser(data.email)}}>-</Button></Typography>
                } else {
                    return <Typography key={idx}>{idx+1}{')'} Pending Sign Up - {data.email} <Button size="sm" className="bg-ntured mb-1" onClick={() => {deleteUser(data.email)}}>-</Button></Typography>
                }
            })}
        </div>
        <div className="px-4">
        <Typography variant="h6">TAs registered</Typography>
            {user.TA.map((data,idx)=>{
                if(data.name){
                    return (
                        <div key={idx} className="mb-1 flex flex-row items-center">
                            <Typography>
                                {idx+1}{')'} {data.name} - {data.email} 
                                <Button size="sm" className="bg-ntured mx-1" onClick={() => {deleteUser(data.email)}}>-</Button>
                            </Typography>
                            <EditModal getUser={getUser} group={data.group} options={groups} email={data.email}/>
                        </div>
                    )
                } else {
                    return <Typography key={idx}>{idx+1}{')'} Pending Sign Up - {data.email} <Button size="sm" className="bg-ntured mb-1" onClick={() => {deleteUser(data.email)}}>-</Button></Typography>
                }            
                })}
        </div>
        </div>
        </div>
    )
}

export default AddUser;