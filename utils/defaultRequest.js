import Request from "./requests";
import Message from '../element-ui/message';
export const service = new Request({
    requestConfig:{
        baseURL: 'http://localhost:8080/',
        timeout: 1000,
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
    },
    responseConfig:{
        success:(e) =>{
            Message({message: e, type: 'success'})
        },
        warning: (e)=>{
            Message({message: e, type: 'warning'})
        },
        exception: (e) =>{
            Message({message: e, type: 'error'})
        },
        acquiesce: (e) =>{
            Message({message: e, type: 'info'})
        },
    } 
    
})
