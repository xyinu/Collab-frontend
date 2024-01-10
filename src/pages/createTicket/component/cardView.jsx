import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Modal from "../../../components/modals";
import dayjs from 'dayjs'
import useRejectCommentForm from "./rejectCommentForm";
import useApproveCommentForm from "./approveCommentForm";
   
function CardView({data,getTicket,ThreadForm,threadSaveFunction}) {
    const type=localStorage.getItem('type')
    const {rejectTicket,RejectCommentForm}=useRejectCommentForm({getTicket})
    const {approveTicket,ApproveCommentForm}=useApproveCommentForm({getTicket})

    return (
        <>
        {data &&
        <Card className="border-2 border-black flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Date Created: {dayjs(data.date).format('DD/MM/YYYY, HH:mm:ss')}
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
          <Typography variant="h6" color="blue-gray" className="mb-2">
           Details: {data.details}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Comments:
          </Typography>
          <div className="flex flex-col">
          {data.thread.map((dat,idx)=>{
            return(
              <div key={idx} className={`${dat.type===type && 'place-self-end bg-blue-200'} w-1/5 border-2 border-transparent mb-1 inline-block rounded-2xl bg-gray-200 px-2 py-1 text-pretty break-words`}>
              <Typography variant="h6" color="blue-gray">
                Date:{dayjs(dat.date).format('DD/MM/YYYY, HH:mm:ss')}
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {dat.details}
              </Typography>
              </div>
            )
          })}
          </div>
        </CardBody>
        
        <div className="flex justify-between mt-auto">
          <div>
            <Modal 
            Body={ThreadForm} 
            title={"Create thread"} 
            saveFunction={threadSaveFunction} 
            id={data.id} 
            buttonName={'create thread'}
            />
          </div>
            {type==='Prof'&&
            <div className="flex">
              <Modal 
                color="bg-green-500"
                Body={ApproveCommentForm} 
                title={"Approve Ticket"} 
                saveFunction={approveTicket} 
                id={data.id} 
                buttonName={'Approve Ticket'}
              />
              <Modal 
                color="bg-red-500"
                Body={RejectCommentForm} 
                title={"Reject Ticket"} 
                saveFunction={rejectTicket} 
                id={data.id} 
                buttonName={"Reject Ticket"}
              />
            </div>  
            }
        </div>
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

export default CardView