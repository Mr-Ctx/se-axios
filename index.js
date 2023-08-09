import {requestConfig, setConfig, restoreConfig } from "./utils/requestConfig";
import { errorCode, setErrorCode } from "./utils/errorCode";
import Request from "./utils/requests";
import { service } from "./utils/defaultRequest";
import { sliceUpload, normalUpload } from "./utils/upload";

export { 
    requestConfig,
    errorCode,
    setErrorCode,
    Request,
    service,
    setConfig,
    restoreConfig,
    sliceUpload,
    normalUpload
}