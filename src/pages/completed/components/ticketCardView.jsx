import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Modal from "../../../components/modals";
import dayjs from 'dayjs'
import useCommentForm from "./commentForm";
import client from "../../../axios";
import mime from 'mime';

function TicketCardView({data,getTicket}) {
    const type=localStorage.getItem('type')
    const email=localStorage.getItem('email')
    const {commentTicket,CommentForm}=useCommentForm({getItem:getTicket,item:'ticket'})
    const download = async(id,file_name) =>{
      let res
      let type
      if(id){
        res=await client.post('downloadthreadfile/',{id},{responseType: 'blob'})
        type = mime.getType(file_name)
      }else{
        res=await client.post('downloadfile/',{id:data.id},{responseType: 'blob'})
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
        <Card className="border-2 border-black flex-grow h-full rounded-none">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
        <Typography variant="h5">{data.title}</Typography>
        <div className="absolute right-3 text-black">
          <Modal 
            Body={CommentForm} 
            title={"Reopen Ticket"} 
            saveFunction={commentTicket} 
            id={data.id} 
            buttonName={'Reopen Ticket'}
          />
        </div>
        </header>
        <div className="overflow-auto h-[calc(100vh-205px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Date Created: {dayjs(data.date).format('YYYY-MM-DD, HH:mm:ss')}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            FROM: {data.TA}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            TO: {data.prof}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
          Course Group Type: {data.group?.course_code} {data.group?.code} {data.group?.type}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Student: {data.student.name}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Category: {data.category}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Severity: {data.severity}
          </Typography>
          {
            data.file_name &&
            <div className="flex items-center content-center mb-2">
          <Typography variant="h6" color="blue-gray" className="mr-2">
            File uploaded: {data.file_name}
          </Typography>
          <Button size="sm" color="blue-gray" className="w-30" onClick={()=>download()}>Download</Button>
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
              <div key={idx} className={`${dat.email===email ? 'place-self-end bg-blue-200' : 'bg-red-100'} w-1/3 border-2 border-transparent mb-1 inline-block rounded-2xl px-2 py-1 text-pretty break-words flex flex-col`}>
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
        </Card>
        }
        {!data && 
            <Card className="w-96 rounded-none border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Tickets
            </Typography>
            </Card>
        }
        </>
    );
}

export default TicketCardView