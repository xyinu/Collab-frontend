import axios from "axios";
import { CacheLookupPolicy, BrowserAuthError, InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "./main";


const client = axios.create({
  baseURL: "http://localhost:8000" ,
});

client.interceptors.request.use(
    async (config) => {
        try{
            const token = (await msalInstance.acquireTokenSilent({cacheLookupPolicy:CacheLookupPolicy.Default,scopes: ["openid"]})).idToken
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        
            return config;
        } catch(error){
            console.log(error)
            if (error instanceof BrowserAuthError || error instanceof InteractionRequiredAuthError) {
               await msalInstance.loginRedirect()
               const res = await client.get('usertype/')
               localStorage.setItem('type',res.data.type)
            }
        }
    },
  
    (error) => {
        return Promise.reject(error);
    }
  );

export default client;