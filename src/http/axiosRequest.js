import  axios from 'axios'
import {stringify} from "qs";
import React from "react";


let defaultConfig={
    baseURL: 'http:localhost:8768',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
};

let interceptorConfig={};//拦截配置

let instance;

export  default class API {
    constructor(props){
        if(props && typeof (props)=="object"){
            instance=axios.create(props);
        }else{
            instance=axios.create(defaultConfig);
        }
        /**
         * 请求拦截器 进行相关参数校验，控制是否继续当次请求
         * @return
         * **/
        instance.interceptors.request.use(function (config) {
            if (config) interceptorConfig = config;
            console.log(config.method)
            if (config.method === "post") {
                config.data = stringify(config.data);
            }
            return config
        }, function (error) {
            return Promise.reject(error);
        });
        /**
         * 响应拦截器，打印日志，简单的结果解析
         * @return
         * **/
        instance.interceptors.response.use(function (response) {

            return response.data
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }



    send=(params,callback)=>{

        let Url;
        let Params;
        if(!params || typeof (params)!='object'){
            throw new Error("params is undefined or not an object")
        }

        if(params.method=='GET'){
            Url=params.url;
            get(Url,callback)
        }
        else if(params.method=='POST'){

            Url=params.url;
            Params=params.obj;

            post(Url,Params,callback)
        }
    }

}

async function get(url,callback){
    try{
        let response=await instance.get(url);

        return  callback(response);
    }catch (e){

    }
}

async function post(url,params,callback){
    try{

        let response=await instance.post(url,params)
        return  callback(response);
    }catch (e){

    }
}
