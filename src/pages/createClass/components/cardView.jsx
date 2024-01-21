import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import Modal from "../../../components/modals";
import useEditForm from "./editClassForm";
import useDeleteForm from "./deleteClassForm";

   
function CardView({data,getClass,code}) {
    const type=localStorage.getItem('type')
    const {EditForm, handleEditSubmit} = useEditForm({getClass,students:data?.students,course_code:code,group_code:data?.group_code})
    const {DeleteForm, handleDeleteSubmit} = useDeleteForm({getClass,students:data?.students,course_code:code,group_code:data?.group_code})

    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data?.group_code}</Typography>
        <div className="absolute right-3 text-black">
            {type==='Prof' &&  
            <div className="flex">   
            <div className="mr-1">        
            <Modal 
            Body={EditForm} 
            title={"Add Student"} 
            saveFunction={handleEditSubmit} 
            id={data.id} 
            buttonName={'Add'}/>
            </div>
            <Modal 
            Body={DeleteForm} 
            title={"Remove Student"} 
            saveFunction={handleDeleteSubmit} 
            id={data.id} 
            buttonName={'Remove'}/>
            </div>
            }
        </div>
        </header>
        <div className="overflow-auto h-[calc(100vh-210px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Students: {data?.students?.map((dat,idx)=>{
              return <Typography key={idx}>{idx+1}{')'} {dat?.student.name}, {dat?.student.VMS} </Typography>
            })}
          </Typography>
        </div>
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