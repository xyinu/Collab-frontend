import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import client from "../../axios";
import ntu_logo from "../../assets/ntu_logo.png"
import microsoft_icon from "../../assets/microsoft_icon.png"
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { Card, Typography } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


function HomePage() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
    const handleLogin = async () => {
      try {
        await instance.loginPopup();
        const res = await client.get('usertype/')
        localStorage.setItem('type',res.data.type)
      } catch (error) {
      }
    };
    const ticketLabels = ['last reply by you','last reply by others','approved','rejected']
    const taskLabels = ['in progress','completed']
    const [count,setCount]=useState({
      ticket:[0,0,0,0],
      task:[0,0]
    })
    const getCount= async ()=>{
      const res=await client.get('count/')
      setCount(res.data)
    }

    useEffect(()=>{
      if(isAuthenticated){
        getCount()
      }
    },[isAuthenticated])

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      // Title,
      Tooltip,
      // Legend
    );
  
    return (
      <> 
        {isAuthenticated && 
            <div>
                <NavBar/>
                <div className="flex flex-row px-4 pt-6">
                <Card className="border-2 border-black h-full flex-grow w-1/2 mr-2">
                  <header className="text-black flex items-center justify-center py-4 rounded-lg">
                  <Typography variant="h5">No. of Tickets</Typography>
                  </header>
                  <Bar
                    data= {{
                      labels: ticketLabels,
                      datasets: [{
                        label: 'Numbers',
                        data: count.ticket,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 159, 64)',
                          'rgb(153, 102, 255)',
                        ],
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
                <Card className="border-2 border-black h-full flex-grow w-1/2 ml-2">
                  <header className="text-black flex items-center justify-center py-4 rounded-lg">
                  <Typography variant="h5">No. of Tasks</Typography>
                  </header>
                  <Bar
                    data= {{
                      labels: taskLabels,
                      datasets: [{
                        label: 'Numbers',
                        data: count.task,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                        ],
                        borderWidth: 1,
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
                
            </div>

        }
        {!isAuthenticated && 
            <div className="flex flex-col items-center">
                <img className="object-cover h-96 w-192" src={ntu_logo}/>
                <button className="relative flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold h-6/12 w-4/12 rounded px-4 py-4" onClick={handleLogin}>
                    <img className="object-scale-down h-10 w-10 absolute left-2" src={microsoft_icon}/>
                    <h2>Login with Microsoft</h2>
                </button>
            </div>
        }
      </>
    );
}

export default HomePage