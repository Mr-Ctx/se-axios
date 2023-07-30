import Message from '../my-element-ui/message'

var requestConfig = {
        tokenName: 'token',
        responseTokenName: 'token',
        index: '/login',
        isToken: true,
        excludePath: ['/login', 'login'],
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
        // requestInterceptors: (config) =>{
        //     console.log('reqConfig', config);
        //     return config
        // },
        // responseInterceptors: (res) =>{
        //     console.log('res', res.data);
        //     return res.data
        // }
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
