import Message from '../element-ui/message'

var requestConfig = {
        tokenName: 'token',
        responseTokenName: 'token',
        index: '/login',
        isToken: true,
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        success: (e) =>{
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

function setConfig(e){
    for(let i in e){
        requestConfig[i] = e[i]
    }
}

function restoreConfig(){
    requestConfig = {
        tokenName: 'token',
        responseTokenName: 'token',
        index: '/index',
        isToken: true,
        success: (e) =>{
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
}


export { requestConfig, setConfig, restoreConfig } 
