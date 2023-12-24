import { useEffect, useState } from "react";
import client from "../../axios";
import NavBar from "../../components/navBar";

function CreateClass(){
    const [file, setFile] = useState();
    const [inputs, setInputs] = useState([]);
    const [classes, setClasses] = useState([]);


    const handleChange = (event) => {
      const value = event.target.value;
      setInputs(value);
    }


    async function getClass(){
        const request= await client.get('class/')
        console.log(request.data)
        setClasses(request.data)
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    const handleSubmit = async (event) =>{
        client.post('createclass/', {file:file,course_name:inputs}, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        getClass()
    }


    useEffect(()=>{
        getClass()
    },[])
    
    return (
        <div>
        <NavBar/>
        <form className="w-6/12 px-4 py-4">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-prof">
                    Course Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-prof" type="text" placeholder="" onChange={handleChange} name="course_name" value={inputs || ""}/>
                </div>
            </div>
            <div>
                <label htmlFor="file" className="sr-only py-3">
                Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
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

                    <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        handleSubmit()
                    }}
                    >
                    Save Changes
                    </button>
                </form>
            <div>
                {classes.map((data,idx)=>{
                    return(
                        <div key={idx}>
                    <div>course code:{data.code}</div>
                    <div>course name:{data.name}</div>
                    {data.group.map((dat,idx)=>{
                        return(
                            <div key={idx}>
                            <div>group type:{dat.type}</div>
                            <div>group code:{dat.group_code}</div>
                            {dat.students.map((da, idx)=>{
                                return(
                                <div key={idx}>
                                <div>{idx}:</div>
                                <div>student name:{da.student.name}</div>
                                <div>student VMS:{da.student.VMS}</div>
                                </div>
                                )
                            })}
                            </div>
                        )
                    })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CreateClass