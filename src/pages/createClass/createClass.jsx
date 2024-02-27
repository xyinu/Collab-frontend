import { useEffect, useState } from "react";
import client from "../../axios";
import NavBar from "../../components/navBar";
import { Button } from "@material-tailwind/react";
import ListView from "./components/listView";
import { useIsAuthenticated } from "@azure/msal-react";

function CreateClass(){
    const [file, setFile] = useState();
    const [inputs, setInputs] = useState();
    const [classes, setClasses] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const validate = () => {
        const errors = {};
        if (!file) {
          errors.file = "File is required!";
        }
        if (!inputs) {
          errors.name = "Course Name is required!";
        } 
        return errors;
      };

    const handleChange = (event) => {
      const value = event.target.value;
      setInputs(value);
    }


    async function getClass(){
        const request= await client.get('class/')
        setClasses(request.data)
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    const handleSubmit = async () =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('createclass/', {file:file,course_name:inputs}, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
            await getClass()
            setFormErrors({})
            setFile(null)
            setInputs()
            return true
        } else{
            setFormErrors(errors);
            return false
        }
    }

    const Form=()=>{
        return(
            <form className="w-6/12 px-4 py-4">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-prof">
                    Course Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-prof" type="text" placeholder="" onChange={handleChange} name="course_name" value={inputs || ""}/>
                <h6 className="text-red-500 text-lg">{formErrors.name}</h6>
                </div>
            </div>
            <div>
                <label htmlFor="file" className="sr-only py-3">
                Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
                <h6 className="text-red-500 text-lg">{formErrors.file}</h6>
            </div>
            {file && (
                <section>
                File details:
                <ul>
                    <li>Name: {file.name}</li>
                    <li>Type: {file.type}</li>
                    <li>Size: {file.size} bytes</li>
                </ul>
                </section>
            )}
                </form>
        )
    }

    useEffect(()=>{
        getClass()
    },[])
    
    return (
        <div className="flex flex-col h-screen">
        <NavBar/>
        <ListView items={classes} header={'Classes'} Form={Form} saveFunction={handleSubmit} getClass={getClass}/>
        </div>
    )
}

export default CreateClass