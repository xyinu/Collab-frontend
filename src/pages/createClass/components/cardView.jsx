import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'

   
function CardView({data}) {
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data?.group_code}</Typography>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Students: {data?.students?.map((dat,idx)=>{
              return <Typography key={idx}>{idx+1}{')'} {dat?.student.name}, {dat?.student.VMS} </Typography>
            })}
          </Typography>
        </CardBody>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Classes
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView