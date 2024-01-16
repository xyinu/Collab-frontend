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
    const {commentTicket,CommentForm}=useCommentForm({getTicket})
    const download = async() =>{
      const res=await client.post('downloadfile/',{id:data.id},{responseType: 'blob'})
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
        <Card className="border-2 border-black flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        {type==='Prof'&&
        <div className="absolute right-3 text-black">
          <Modal 
            Body={CommentForm} 
            title={"Reopen"} 
            saveFunction={commentTicket} 
            id={data.id} 
            buttonName={'Reopen'}
          />
        </div>
        }
        </header>
        <CardBody>
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
          <Button size="sm" color="blue-gray" className="w-30" onClick={download}>Download</Button>
            </div>
          }
          <Typography variant="h6" color="blue" className="mb-2">
            Final Comment: {data.final_comment}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
           Details: {data.details}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Thread:
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
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Tickets
            </Typography>
            </Card>
        }
        </>
    );
}

export default TicketCardView