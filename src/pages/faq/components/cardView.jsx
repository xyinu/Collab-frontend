import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import Modal from "../../../components/modals";
import useEditForm from "./editFaqForm";
import client from "../../../axios";

   
function CardView({data,getFaq,categories}) {
  const type=localStorage.getItem('type')
  const {EditForm, handleEditSubmit} = useEditForm({getFaq,title:data?.title,details:data?.details,categories})
  const deleteFaq =async(id)=>{
    await client.post('deletefaq/',{id})
    getFaq()
  }
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
          <div className="w-2/3 text-pretty break-all">
        <Typography variant="h5" className="flex item-center justify-center">{data.title}</Typography>
          </div>
        <div className="absolute right-3 text-black">
            {type==='Prof' &&  
            <div className="flex">   
            <div className="mr-1">            
            <Modal 
            Body={EditForm} 
            title={"edit FAQ"} 
            saveFunction={handleEditSubmit} 
            id={data.id} 
            buttonName={'edit FAQ'}
            />
            </div>
            <Button size="lg" color="pink" onClick={() => {deleteFaq(data.id)}}>Delete</Button>
            </div>
            }
        </div>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Category: {data.category}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
           Answer: {data.details}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Last Edit: {dayjs(data.date).format('YYYY-MM-DD')}
          </Typography>
        </CardBody>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No FAQ Currently
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView