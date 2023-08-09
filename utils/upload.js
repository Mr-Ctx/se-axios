import { requestConfig } from "./requestConfig"
let chunk = 0
/**
 * 通用上传文件方法
 * @param {*} request 请求实例
 * @param {*} config 请求配置
 * @param {*} file 上传的文件
 */
export function upload(request, config, file){
    if(file.size / 1024 / 1024 >= requestConfig.fileSize){
        sliceUpload(request, config, file)
    }else{
        normalUpload(request, config, file)
    }
    
}

/**
 * 切片上传文件方法
 * @param {*} request 请求实例
 * @param {*} config 请求配置
 * @param {*} file 上传的文件
 */
export function sliceUpload (request, config, file){
    let name = file.name
    let chunks = Math.ceil(file.size / 1024 / 1024 / requestConfig.sliceSize) // 将文件按配置的切片大小分块计算总共分成几块
    var formData = new FormData()
    //将文件按配置的切片大小分块
    formData.append('file', file.slice(chunk * 1024 * 1024 * requestConfig.sliceSize, (chunk + 1) * 1024 * 1024 * requestConfig.sliceSize))
    //当前切片索引
    formData.append('chunk', chunk)
    //总切片数
    formData.append('chunks', chunks)
    //文件名称
    formData.append('name', name)
    request({
        ...config,
        headers:{
            'Content-Type': "multipart/form-data"
        },
        method: 'post',
        data: formData
    }).then(
        res =>{
            if(chunk < chunks){
                chunk++
                upload(request, config, file)
            }else{
                chunk = 0
            }
        }
    ).catch(
        err =>{
            return err
        }
    )
}

/**
 * 普通上传文件方法
 * @param {*} request 请求实例
 * @param {*} config 请求配置
 * @param {*} file 上传的文件
 */
export function normalUpload (request, config, file){
    var formData = new FormData()
    formData.append('file', file)
    request({
        ...config,
        headers:{
            'Content-Type': "multipart/form-data"
        },
        method: 'post',
        data: formData
    }).then(
        res =>{
            return res
        }
    ).catch(
        err =>{
            return err
        }
    )
}