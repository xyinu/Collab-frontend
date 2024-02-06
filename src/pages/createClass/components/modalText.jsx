import { Typography } from "@material-tailwind/react";
import { useState } from "react";

function ModalText({title,data,buttonName}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Typography
        className="hover:text-ntured hover:cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {buttonName}
      </Typography>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-6/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-blueGray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-blueGray-500 h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto w-full">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Name: {data.student.name}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  VMS: {data.student.VMS}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Program and Year: {data.student.program_year}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Student Type: {data.student.student_type}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Course Type: {data.student.course_type}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nationality: {data.student.nationality}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Groups Registered: 
                </Typography>
                {
                  data.student.group_course.map((data, idx)=>{
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
                  data.student.tickets.map((data, idx)=>{
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
                </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalText;
