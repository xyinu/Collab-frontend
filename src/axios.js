import axios from "axios";
import { CacheLookupPolicy, BrowserAuthError } from "@azure/msal-browser";
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
            if (error instanceof BrowserAuthError) {
               return await msalInstance.loginRedirect()
            }
        }
    },
  
    (error) => {
        return Promise.reject(error);
    }
  );

export default client;