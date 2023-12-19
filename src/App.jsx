import { Routes, Route, useNavigate } from "react-router-dom";
// Material-UI imports

// MSAL imports
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import client from "./axios";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated,"test")
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const handleLogin = async () => {
    try {
      const response = await instance.loginRedirect();
      console.log(response.idToken); // Here, you can access the access token and other user information
    } catch (error) {
      console.log(error);
    }
  };
  const getAccessToken= async ()=>{
    try{
      const tokenResponse= (await instance.acquireTokenSilent({cacheLookupPolicy:1,scopes: ["openid"]})).idToken
      console.log(tokenResponse)
    } catch(error){
      console.log(error)
    }
  }

  const handleLogout = async () => {
    try {
      const response= await instance.logoutRedirect()
    } catch (error){
      console.log(error)
    }
  }
  
  const handleSend = async () => {
    try {
      const response= await client.get('/user')
      console.log(response)
    } catch (error){
      console.log(error)
    }
  }

  return (
    <> 
      <h1>HI</h1>
      {/* // In your React component, you can use the button to initiate the login */}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getAccessToken}>get</button>
      <button onClick={handleSend}>send</button>

      {isAuthenticated && <h1>test</h1>}
      {!isAuthenticated && <h1>tes2t</h1>}
    </>
  );
}

// function Pages() {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//         </Routes>
//     );
// }

export default App;