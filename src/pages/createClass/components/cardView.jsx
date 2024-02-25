import {
    Card,
    Typography,
  } from "@material-tailwind/react";
import Modal from "../../../components/modals";
import useEditForm from "./editClassForm";
import useDeleteForm from "./deleteClassForm";
import ModalText from "./modalText";

   
function CardView({data,getClass,code}) {
    const type=localStorage.getItem('type')
    const {EditForm, handleEditSubmit} = useEditForm({getClass,students:data?.students,course_code:code,group_code:data?.group_code})
    const {DeleteForm, handleDeleteSubmit} = useDeleteForm({getClass,students:data?.students,course_code:code,group_code:data?.group_code})
    
    return (
        <>
        {data &&
        <Card className="rounded-none border-2 border-black h-full flex-grow">
        <header className="bg-ntublue text-white flex items-center justify-center py-4">
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
            buttonName={'Add'}
            color={'bg-ntured'}
            />
            </div>
            <Modal 
            Body={DeleteForm} 
            title={"Remove Student"} 
            saveFunction={handleDeleteSubmit} 
            id={data.id} 
            color={'bg-ntured'}
            buttonName={'Remove'}/>
            </div>
            }
        </div>
        </header>
        <div className="overflow-auto h-[calc(100vh-205px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Students: {data?.students?.map((dat,idx)=>{
              return (
                <ModalText
                key={idx}
                data={dat}
                title={'Student Details'}
                buttonName={`${idx+1}) ${dat?.student.name}, ${dat?.student.VMS}`}
                />
              )
            })}
          </Typography>
        </div>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 rounded-none border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Classes
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView