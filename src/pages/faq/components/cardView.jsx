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
  const {EditForm, handleEditSubmit} = useEditForm({getFaq,title:data?.title,details:data?.details,categories,category:data?.category})
  const deleteFaq =async(id)=>{
    await client.post('deletefaq/',{id})
    getFaq()
  }
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full rounded-none flex-grow">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
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
            color={'bg-ntured'}
            />
            </div>
            <Button size="lg" className="bg-ntured" onClick={() => {deleteFaq(data.id)}}>Delete</Button>
            </div>
            }
        </div>
        </header>
        <div className="overflow-auto h-[calc(100vh-205px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Last Edited: {dayjs(data.date).format('YYYY-MM-DD')}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Category: {data.category}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2 whitespace-pre-line">
           Answer: {data.details}
          </Typography>
        </div>
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