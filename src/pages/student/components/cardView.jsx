import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import dayjs from 'dayjs'
import Modal from "../../../components/modals";
import useEditForm from "./editStudentForm";

   
function CardView({data,getFaq}) {
  const type=localStorage.getItem('type')
  const {EditForm, handleEditSubmit} = useEditForm({getFaq,title:data?.title,details:data?.details})
  
    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.name}</Typography>
        {/* <div className="absolute right-3 text-black">
            {type==='Prof' &&             
            <Modal 
            Body={EditForm} 
            title={"edit FAQ"} 
            saveFunction={handleEditSubmit} 
            id={data.id} 
            buttonName={'edit FAQ'}
            />}
        </div> */}
        </header>
        <div className="overflow-auto h-[calc(100vh-205px)] p-3 scrollbar">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            VMS: {data.VMS}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Program and Year: {data.program_year}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Student Type: {data.student_type}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Course Type: {data.course_type}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Nationality: {data.nationality}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Groups Registered: 
          </Typography>
          {
            data.group_course.map((data, idx)=>{
              return(
                <div key={idx}>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {idx+1+')'} Courses Code: {data.group.course_code}, Group Code: {data.group.code}, Type: {data.group.type}
          </Typography>
                </div>
              )
            })
          }
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Tickets Created: 
          </Typography>
          {
            data.tickets.map((data, idx)=>{
              return(
                <div key={idx}>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {idx+1+')'} Title: {data.title}, Category: {data.category}, {data.status==='completed'?'Closed': 'Last Reply: '+data.status}
          </Typography>
                </div>
              )
            })
          }
        </div>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Students Currently
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView