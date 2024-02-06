import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import { useRef, useState } from "react";
import client from "../../../axios";
import mime from 'mime';
import Modal from "../../../components/modals";
import useCommentForm from "./commentForm";

   
function CardView({data, getTask}) {
  const {commentTask,CommentForm}=useCommentForm({getTask})
  const type=localStorage.getItem('type')
  const [inputs,setInputs] = useState('')
  const [show, setShow]=useState(false)
  const [file, setFile] = useState(null);
  const ref = useRef();
  const handleThreadSubmit = async () =>{
    if(inputs){
      await client.post('createtaskthread/',{details:inputs,id:data.id,file:file},{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setInputs("")
      setShow(false)
      setFile(null)
      ref.current.value = "";
      await getTask()
      return true
    } else{
      setShow(true)
      return false
    }
  }
  const handleChange = (e) =>{
    setInputs(e.target.value)
  } 
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const download = async(id,file_name) =>{
    let res
    let type
    if(id){
      res=await client.post('downloadtaskthreadfile/',{id},{responseType: 'blob'})
      type = mime.getType(file_name)
    }else{
      res=await client.post('downloadtaskfile/',{id:data.id},{responseType: 'blob'})
      type = mime.getType(data.file_name)
    }
    const url = window.URL.createObjectURL(new Blob([res.data], {
      type: type,
    }));

    const link = document.createElement('a');
    link.href = url;
    link.download = file_name?file_name:data.file_name;
  
    document.body.appendChild(link);
  
    link.click();
  
    link.parentNode.removeChild(link);
  }

    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow rounded-none">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
        <Typography variant="h5">{data.title}</Typography>
        <div className="absolute right-3 text-black">
          <Modal 
            Body={CommentForm} 
            title={"Close Task"} 
            saveFunction={commentTask} 
            id={data.id} 
            buttonName={'Close Task'}
          />
        </div>    
        </header>
        <div className="overflow-auto h-[calc(100vh-260px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Date Created: {dayjs(data.date).format('YYYY-MM-DD, HH:mm:ss')}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            FROM: {data.prof}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            TO: {data.TA}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Due Date: {dayjs(data.dueDate).format('YYYY-MM-DD, HH:mm:ss')}
          </Typography>
          {
            data.file_name &&
            <div className="flex items-center content-center mb-2">
          <Typography variant="h6" color="blue-gray" className="mr-2">
            File uploaded: {data.file_name}
          </Typography>
          <Button size="sm" color="blue-gray" className="w-30" onClick={download}>Download</Button>
            </div>
          }
          <Typography variant="h6" color="blue-gray" className="mb-2 whitespace-pre-line">
           Details: {data.details}
          </Typography>
          <div className="border-b border-ntublue"/>
          <Typography variant="h6" color="blue-gray" className="my-2">
            Comments:
          </Typography>
          <div className="flex flex-col">
          {data.thread.map((dat,idx)=>{
            return(
              <div key={idx} className={`${dat.type===type ? 'place-self-end bg-blue-200' : 'bg-red-100'} w-1/3 border-2 border-transparent mb-1 inline-block rounded-2xl px-2 py-1 text-pretty break-words flex flex-col`}>
              <Typography variant="h6" color="blue-gray" className="whitespace-pre-line">
                {dat.details}
              </Typography>
              {
                dat.file_name &&
                <div className="flex items-center content-center mb-2">
              <Typography color="blue-gray" className="mr-2">
                File: {dat.file_name}
              </Typography>
              <Button size="sm" color="blue-gray" className="w-30" onClick={()=>download(dat.id,dat.file_name)}>Download</Button>
                </div>
              }
              <p className="place-self-end">
                {dayjs(dat.date).format('DD/mm/YY HH:mm')}
              </p>
              </div>
            )
          })}
          </div>
        </div>
        
        {
        show&&<Typography color="red" variant="h6" className="ml-2">Input Needed</Typography>
        }
        <div className="flex justify-between mt-auto">
        <textarea className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="Comment Here" name="details" onChange={handleChange} value={inputs}/>
        <div className="w-1/4">
            <label className="block uppercase text-gray-700 text-xs font-bold">
                Upload relevant file if needed
            </label>
            <label htmlFor="file" className="sr-only">
            Choose a file
            </label>
            <input id="file" type="file" onChange={handleFileChange} ref={ref}/>
        </div>
        <Button size="lg" color="blue-gray" className="rounded-none" onClick={handleThreadSubmit}>Send</Button>
        </div>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 rounded-none border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Task Assigned
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView