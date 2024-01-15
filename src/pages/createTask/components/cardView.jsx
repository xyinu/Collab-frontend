import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import { useState } from "react";
import client from "../../../axios";

   
function CardView({data, completeTask,getTask}) {
  const type=localStorage.getItem('type')
  const [inputs,setInputs] = useState('')
  const [show, setShow]=useState(false)
  const handleThreadSubmit = async () =>{
    if(inputs){
      await client.post('createtaskthread/',{details:inputs,id:data.id})
      setInputs("")
      setShow(false)
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
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        {type==='TA' && 
        <div className="absolute right-3 text-black">
        <Button size="lg" color="pink" name={data.id} onClick={completeTask.onClick}>{completeTask.text}</Button>
        </div>
        }
        </header>
        <CardBody>
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
          <Typography variant="h6" color="blue-gray" className="mb-2">
           Details: {data.details}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Comments:
          </Typography>
          <div className="flex flex-col">
          {data.thread.map((dat,idx)=>{
            return(
              <div key={idx} className={`${dat.type===type ? 'place-self-end bg-blue-200' : 'bg-gray-200'} w-1/3 border-2 border-transparent mb-1 inline-block rounded-2xl px-2 py-1 text-pretty break-words`}>
              <Typography variant="h6" color="blue-gray">
                Date:{dayjs(dat.date).format('YYYY-MM-DD, HH:mm:ss')}
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {dat.details}
              </Typography>
              </div>
            )
          })}
          </div>
        </CardBody>
        
        {/* <div className="flex justify-between mt-auto">
            {type==='TA' && <Button size="lg" color="blue-gray" name={data.id} onClick={completeTask.onClick}>{completeTask.text}</Button>}
            {rightbutton && <Button size="lg" color="blue-gray" name={data.id} onClick={rightbutton.onClick}>{rightbutton.text}</Button>}
        </div> */}
        <div className="flex justify-between mt-auto">
        <textarea className="appearance-none rounded-lg block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="Comment Here" name="details" onChange={handleChange} value={inputs}/>
        <Button size="lg" color="blue-gray" className="w-30" onClick={handleThreadSubmit}>Comment</Button>
        </div>
        {
        show&&<Typography color="red" variant="h6" className="ml-2">Input Needed</Typography>
        }
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Task Assigned
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView