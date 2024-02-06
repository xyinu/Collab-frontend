import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import client from "../../../axios";
import mime from 'mime';
import Modal from "../../../components/modals";
import useCommentForm from "./commentForm";
   
function TaskCardView({data,getTask}) {
  const type=localStorage.getItem('type')
  const {commentTicket,CommentForm}=useCommentForm({getItem:getTask,item:'task'})
  const download = async() =>{
    const res=await client.post('downloadtaskfile/',{id:data.id},{responseType: 'blob'})
    const type = mime.getType(data.file_name)
    const url = window.URL.createObjectURL(new Blob([res.data], {
      type: type,
    }));

    const link = document.createElement('a');
    link.href = url;
    link.download = data.file_name;
  
    document.body.appendChild(link);
  
    link.click();
  
    link.parentNode.removeChild(link);
  }
    return (
        <>
        {data &&
        <Card className="border-2 rounded-none border-black h-full flex-grow">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
        <Typography variant="h5">{data.title}</Typography>
        <div className="absolute right-3 text-black">
          <Modal 
            Body={CommentForm} 
            title={"Reopen Task"} 
            saveFunction={commentTicket} 
            id={data.id} 
            buttonName={'Reopen Task'}
          />
        </div>
        </header>
        <div className="overflow-auto h-[calc(100vh-205px)] p-3 scrollbar">
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
              <text className="place-self-end">
                {dayjs(dat.date).format('DD/mm/YY HH:mm')}
              </text>
              </div>
            )
          })}
          </div>
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

export default TaskCardView