import { useIsAuthenticated } from "@azure/msal-react";
import client from "../../axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { Button, Card, Typography } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


function DataPage() {
    const isAuthenticated = useIsAuthenticated();
    const [ticketX,setTicketX]=useState([])
    const [ticketY,setTicketY]=useState([])
    const [ticketFilter,setTicketFilter]=useState('Category')
    const [taskX,setTaskX]=useState([])
    const [taskY,setTaskY]=useState([])
    const [taskFilter,setTaskFilter]=useState('Group')
    const [screen, setScreen]=useState(true)
    const ticketLabels = ['Category','Group','Course','Student']
    const taskLabels = ['Group','Course']

    const [data,setData]=useState({})

    const getData= async ()=>{
      const res=await client.get('data/')
      setData(res.data)
      setTicketX(res.data.ticket.Category.label)
      setTicketY(res.data.ticket.Category.count)
      setTaskX(res.data.task.Group.label)
      setTaskY(res.data.task.Group.count)
    }
    const handleTicketChange = (e) =>{
      setTicketFilter(e.target.value)
      setTicketX(data.ticket[e.target.value].label)
      setTicketY(data.ticket[e.target.value].count)
    }
    const handleTaskChange = (e) =>{
      setTaskFilter(e.target.value)
      setTaskX(data.task[e.target.value].label)
      setTaskY(data.task[e.target.value].count)
    }
    function setChange(){
      setScreen(prev=>!prev)
    }
    useEffect(()=>{
        getData()
    },[])

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Tooltip,
    );
    ChartJS.defaults.backgroundColor = '#d71440'
    return (
            <div>
                <NavBar/>
                {
                  screen?
                <div className="flex px-2 pt-6 justify-center">
                <div className="pr-5 md:mb-0 flex flex-col w-1/8">
                <Button size="lg" className="bg-ntured rounded-none mb-5 w-full" onClick={setChange}>
                Switch
                </Button>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Filter By
                </label>
                <div className="relative">
                    <select className="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleTicketChange} name="category" value={ticketFilter}>
                    {
                        ticketLabels.map((data,idx)=>{
                            return <option key={idx}>{data}</option>
                        })
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <Card className="border-2 border-black h-5/6 w-5/6">
                  <header className="text-black flex items-center justify-center py-4 rounded-lg">
                  <Typography variant="h5">Tickets</Typography>
                  </header>
                  <Bar
                    data= {{
                      labels: ticketX,
                      datasets: [{
                        label: 'Numbers',
                        data: ticketY,
                        borderWidth: 1
                      }]
                    }}
                    options= {{
                      scales: {
                        y: {
                          ticks: {
                            stepSize: 1
                          },
                        }
                      }
                    }}
                  />
                </Card>
                </div>:
                <div className="flex px-2 pt-6 justify-center">
                <div className="pr-5 md:mb-0 flex flex-col w-1/8">
                <Button size="lg" className="bg-ntured rounded-none mb-5" onClick={setChange}>
                Switch
                </Button>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Filter By
                </label>
                <div className="relative">
                    <select className="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleTaskChange} name="category" value={taskFilter}>
                    {
                        taskLabels.map((data,idx)=>{
                            return <option key={idx}>{data}</option>
                        })
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <Card className="border-2 border-black h-5/6 w-5/6">
                  <header className="text-black flex items-center justify-center py-4 rounded-lg">
                  <Typography variant="h5">Tasks</Typography>
                  </header>
                  <Bar
                    data= {{
                      labels: taskX,
                      datasets: [{
                        label: 'Numbers',
                        data: taskY,
                        borderWidth: 1
                      }]
                    }}
                    options= {{
                      scales: {
                        y: {
                          ticks: {
                            stepSize: 1
                          },
                        }
                      }
                    }}
                  />
                </Card>
                </div>
                }
            </div>
    );
}

export default DataPage