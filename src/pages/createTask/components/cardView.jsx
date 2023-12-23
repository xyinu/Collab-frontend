import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
function CardView({data, leftbutton, rightbutton}) {
    console.log(data)
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        </header>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            FROM: {data.prof}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            TO: {data.TA}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Due Date: {data.dueDate}
          </Typography>
          <Typography>
           Details: {data.details}
          </Typography>
        </CardBody>
        
        <div className="flex justify-between mt-auto">
            {leftbutton && <Button size="lg" color="blue-gray" name={data.id} onClick={leftbutton.onClick}>{leftbutton.text}</Button>}
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