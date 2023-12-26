import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'

   
function CardView({data, completeTask, rightbutton}) {
  const type=localStorage.getItem('type')

    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            FROM: {data.prof}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            TO: {data.TA}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Due Date: {dayjs(data.dueDate).format('DD/MM/YYYY, HH:mm:ss')}
          </Typography>
          <Typography>
           Details: {data.details}
          </Typography>
        </CardBody>
        
        <div className="flex justify-between mt-auto">
            {type==='Prof' && <Button size="lg" color="blue-gray" name={data.id} onClick={completeTask.onClick}>{completeTask.text}</Button>}
            {rightbutton && <Button size="lg" color="blue-gray" name={data.id} onClick={rightbutton.onClick}>{rightbutton.text}</Button>}
        </div>
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