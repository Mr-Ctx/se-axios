# se-axios

se-axios是一个基于axios进行二次封装的工具，开发者只需要使用提供的默认请求实例或者自定义请求实例即可发起请求，无需对请求参数以及响应数据进行拦截处理，se-axios已经帮开发者完成这部分工作

## 特性

### 开发者只需要关注自己的项目请求方法

```js
export function functionName(data){
    return request({
        url: '***/***',
        method: 'post',
        data: data
    })
}
```

### 提供了默认的请求拦截器，响应拦截器，满足大部分开发需求，开发者无需自己编写

### 提供了默认的请求实例，用户可以通过导入service直接使用，默认请求实例的baseURL：http://localhost:8080/

```js
import { service } from "se-axios"
export function functionName(data){
    return service({
        url: '***/***/***',
        method: 'post',
        data: data,
    })
}
```

### 提供了自定义创建请求实例的接口，通过导入Request来创建自定义实例

```js
import { Request } from "se-axios"
//使用自定义请求实例
const request = new Request({
    requestConfig:{
        baseURL: 'http://localhost:8080/***/',
        timeout: 2000,
    },
})

```

### 提供了函数来对响应数据进行处理，提示请求结果

### 开发者可以根据自己的需求自定义响应数据处理方式

```js
const request = new Request({
    requestConfig:{
        baseURL: 'http://localhost:8080/***/',
        timeout: 2000,
        //在请求实例设置该函数对所有的请求都使用, 且方法名必须是success，warning，exception，		   //acquiesce
        success: (e) =>{ 
            console.log(e)
        },
        warning: (e) =>{
            console.log(e)
        },
        exception: (e) =>{
            console.log(e)
        },
        acquiesce: (e) =>{
            console.log(e)
        }
    },
})

//在具体的每个业务函数中定义时只对该函数有效
export function joinChat(data){
     return my({
        url: 'chat/login',
        method: 'post',
        data: data,
        success: (e) =>{
            Message({ message: e, type: 'success' })
        },
         exception: (e) =>{
             console.log('exception', e)
         }
    })
}
```

### 提供了setConfig和restoreConfig方法修改默认配置

```js
import { setConfig, restoreConfig } from "se-axios"

//修改默认配置
setConfig({
    isToken: false
})
//还原默认配置
restoreConfig()
```

默认配置列表，可以根据实际需求通过setConfig添加自己的配置，通过导入requestConfig进行访问

```json
{
    tokenName: 'token', //保存在浏览器的token
    responseTokenName: 'token', //后端返回的token
    index: '/login', //启用token时，当请求没有token或者token无效时跳转的页面
    isToken: true, //是否启用token
    headers:{ //请求头
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
```

### 提供了错误码表，开发者可以根据实际进行修改添加

```json
'warning': {
      401: {
        text: '401警告',
        type: null,
        default: 'warning'
      },
      403: {
        text: '403警告',
        type: null,
        default: 'warning'
      },
      404: {
        text: '404警告',
        type: null,
        default: 'warning'
      },
  },
    'exception': {
      500: {
        text: '500异常',
        type: null,
        default: 'error'
      },
      501: {
        text: '501异常',
        type: null,
        default: 'error'
      },
  },
  acquiesce: {
    text: '系统未知错误，请反馈给开发者',
    default: 'info'
  }
```

## 使用方法

1. 在全局或局部导入se-axios

2. 在需要请求的地方使用service或者自定义请求实例发送请求

   ```js
   import { Request, service} from "se-axios"
   //创建自定义请求实例
   const request = new Request({
       requestConfig:{
           baseURL: 'http://localhost:8085/api/',
           timeout: 2000,
       },
   })
   export function joinChat(data){
       //在自己的函数中使用实例
       return request({
           url: 'chat/testpost',
           method: 'post',
           data: data
       })
   }
   
   //使用默认请求实例
   export function joinChat(data){
       return service({
           url: 'api/chat/login',
           method: 'post',
           data: data,
           exception:(e) =>{
               console.log('异常',e);
           }
       })
   }
   ```

   