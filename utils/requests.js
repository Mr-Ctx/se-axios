import axios from "./axios";
import Message from '../my-element-ui/message';
import MessageBox from '../my-element-ui/message-box';
import { errorCode } from "./errorCode";
import { requestConfig } from "./requestConfig";
import { tansParams, urlMatch } from './common';

class Request{
    instance
    constructor(my_config){
        this.instance = axios.create(my_config.requestConfig)
        this.instance.interceptors.request.use(requestConfig.requestInterceptors ? requestConfig.requestInterceptors : config => {
            my_config = config
             // get请求映射params参数
            if (config.method === 'get') {
                if(config.params){
                    let url = config.url + '?' + tansParams(config.params);
                    url = url.slice(0, -1);
                    config.params = {};
                    config.url = url;
                }
            }
            //当浏览器存有token并且isToken为true时才使用token
            if(localStorage.getItem(requestConfig.tokenName) !== null && requestConfig.isToken){
                config.headers.Token =localStorage.getItem(requestConfig.tokenName)
            }
            if(requestConfig.isToken && localStorage.getItem(requestConfig.tokenName) === null){
                //开启token校验时，匹配请求白名单
                if(!urlMatch(requestConfig.excludePath, config.url)){
                     MessageBox.confirm('未认证',
                        '系统提示', {
                        confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning' }).then(() => {
                            location.href = requestConfig.index;
                        }).catch(() => {
                    });
                }
            }
            return config
        },error => {
            Promise.reject(error)
        })

        this.instance.interceptors.response.use(requestConfig.responseInterceptors ? requestConfig.responseInterceptors : res =>{
            
            //当返回的响应头中有token并且isToken为true时才在浏览器存token
            if (res.headers[requestConfig.responseTokenName] && requestConfig.isToken) {
                localStorage.setItem(requestConfig.tokenName, res.headers[requestConfig.responseTokenName]);
            }
            // 未设置状态码则默认成功状态
            const code = res.data.code || 200;
            //设置响应样式
            if (errorCode.warning[code]) {
                const msg = res.data.msg ? res.data.msg : errorCode.warning[code].text
                my_config.warning ? my_config.warning(msg) : requestConfig.warning(msg)
                return Promise.reject(res.data.msg ? res.data.msg : errorCode.warning[code].text)
            }
            else if(errorCode.exception[code]){
                const msg = res.data.msg ? res.data.msg : errorCode.exception[code].text
                my_config.exception ? my_config.exception(msg) :
                requestConfig.exception(msg)
                return Promise.reject(msg)
            }
            else if (code !== 200) {
                const msg = res.data.msg ? res.data.msg : errorCode.acquiesce.text
                my_config.acquiesce ? my_config.acquiesce(msg) : requestConfig.acquiesce(msg)
                return Promise.reject('error')
            } else {
                const msg = res.data.msg
                my_config.success ? my_config.success(msg) : requestConfig.success(msg)
                return res.data
            }
        },error => {
            let { message } = error;
            if (message == "Network Error") {
                message = "后端接口连接异常";
            } else if (message.includes("timeout")) {
                message = "系统接口请求超时";
            } else if (message.includes("Request failed with status code")) {
                message = "系统接口" + message.substr(message.length - 3) + "异常";
            }
            Message({ message: message, type: 'error', duration: 5 * 1000 })
            return Promise.reject(error)
        })
        return this.instance
    }
    request(config){
        return this.instance.request(config).instance
    }

    
}

export default Request