import { useEffect, useState } from "react";
import client from "../../../axios";

function EditModal({getUser,group,options,email}) {
    const [showModal, setShowModal] = useState(false);
    const [groups,setGroups]=useState([])
    const [groupInput, setGroupInput]=useState([])
    const [formErrors, setFormErrors] = useState({});
    const validate = (values) => {
        const errors = {};
        if (groupInput.length===0) {
          errors.group= "Must have at least 1 group";
        }
        return errors;
      };

    const handleGroupChange= (e) =>{
        if(!groupInput.includes(e.target.value)){
            setGroupInput(prev=>[...prev,e.target.value])
        } else{
            setGroupInput(prev=>prev.filter(item => item !== e.target.value))
        }
    }

    const handleEditSubmit = async () =>{
        const errors = validate(groupInput)
        if(Object.keys(errors).length === 0){
            await client.post('editaccess/',{group:groupInput,email:email},{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
            setGroupInput([])
            await getUser()
            setFormErrors({})
            return true
        } else {
            setFormErrors(errors);
            return false
        }
     }

    useEffect(()=>{
        setGroupInput(group?.map((data)=>{
            return `${data.details?.course_code} ${data.details?.code} ${data.details?.type}`
        }))
        setGroups(options)
    },[group,options])
    return (
      <>
        <button
          className={`bg-ntured rounded-none text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`}
          type="button"
          onClick={() => setShowModal(true)}
        >
          Edit Access
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-6/12 my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Edit Access
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-blueGray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-blueGray-500 h-6 w-6 text-3xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto w-full">
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
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-ntured text-white active:bg-ntured font-bold uppercase text-sm px-6 py-3 rounded-none shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={async () => {
                        if(await handleEditSubmit()){
                          setShowModal(false)
                        }
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }
  
export default EditModal;






