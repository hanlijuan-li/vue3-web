import { handleFileDownload } from "@/utils";
import eventEmitter from "@/utils/eventEmitter";
import axios from 'axios'
// import axios, { AxiosError, AxiosResponse } from "axios";

const service = axios.create({
    baseURL: '',
    timeout: 12000,
    withCredentials: true,
    headers: {
        'content-type': 'application/json'
    }
})

service.interceptors.request.use((config) => {
    return config
}, error => {
    return Promise.reject(error)
})

const successHandler = (response: any) => {
    if (response.data.code === 0) {
        return response.data.data
    } else if (response.headers['content-type']?.includes('application/octet-stream')) {
        // 如果是文件流类型的响应，进行文件处理
        const contentType = response.headers['content-type']
        return handleFileDownload(response, contentType)
    } else {
        // 根据实际需求返回错误或抛出异常
        return Promise.reject(new Error(response.data.message))
    }
}

const errorHandler = (err: any) => {
    if (err.response) {
        if (err.response.status === 401) {
            eventEmitter.emit('API:UN_AUTH')
        } else if (err.response.status === 400) {
            eventEmitter.emit('API:BAD_REQUEST', err.response.data)
        } else if (err.response.status === 403) {
            eventEmitter.emit('API:FORBIDDEN')
        } else if (err.response.status === 404) {
            eventEmitter.emit('API:NOT_FOUND')
        } else if (err.response.status === 405) {
            eventEmitter.emit('API:METHOD_NOT_ALLOWED', err.response.data)
        } else if (err.response.status === 422) {
            eventEmitter.emit('API:UNPROCESSABLE_ENTITY', err.response.data)
        }
    } else if (err.request) {
        eventEmitter.emit('API:NO_RESPONSE', err.request)
    } else {
        eventEmitter.emit('API:UNKNOWN_ERROR', err.message)
    }

    return Promise.reject(err)
}

service.interceptors.response.use(successHandler, errorHandler)

export default service