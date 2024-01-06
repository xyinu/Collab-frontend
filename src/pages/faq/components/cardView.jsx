import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import Modal from "../../../components/modals";
import useEditForm from "./editFaqForm";

   
function CardView({data,getFaq}) {
  const type=localStorage.getItem('type')
  const {EditForm, handleEditSubmit} = useEditForm({getFaq,title:data?.title,details:data?.details})

    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Last Edit: {dayjs(data.date).format('DD/MM/YYYY')}
          </Typography>
          <Typography>
           Details: {data.details}
          </Typography>
        </CardBody>
        
        <div className="flex mt-auto">
            {type==='Prof' &&             
            <Modal 
            Body={EditForm} 
            title={"edit FAQ"} 
            saveFunction={handleEditSubmit} 
            id={data.id} 
            buttonName={'edit FAQ'}
            />}
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