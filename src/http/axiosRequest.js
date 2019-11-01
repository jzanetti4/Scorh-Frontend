import axios from 'axios'
import {stringify} from "qs";
import React from "react";


/**
 * axios default config
 * @type {{headers: {"Content-Type": string}, baseURL: string, timeout: number}}
 */

let defaultConfig = {
    baseURL: 'http:localhost:8768',
    timeout: 3000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};

let interceptorConfig = {};
let instance;

export default class API {
    constructor(props) {
        if (props && typeof (props) == "object") {
            instance = axios.create(props);
        } else {
            instance = axios.create(defaultConfig);
        }

        /**
         * request interceptor
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
         * response interceptor
         * @return
         * **/
        instance.interceptors.response.use(function (response) {

            return response.data
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }


    /**
     * send API
     * @param params
     * @param callback
     */
    send = (params, callback) => {

        let Url;
        let Params;
        if (!params || typeof (params) != 'object') {
            throw new Error("params is undefined or not an object")
        }

        if (params.method == 'GET') {
            Url = params.url;
            get(Url, callback)
        } else if (params.method == 'POST') {

            Url = params.url;
            Params = params.obj;

            post(Url, Params, callback)
        }
    }

}

/**
 *
 * @param url
 * @param callback
 * @returns {Promise<*>}
 */
async function get(url, callback) {
    try {
        let response = await instance.get(url);

        return callback(response);
    } catch (e) {

    }
}

/**
 *
 * @param url
 * @param params
 * @param callback
 * @returns {Promise<*>}
 */
async function post(url, params, callback) {
    try {

        let response = await instance.post(url, params)
        return callback(response);
    } catch (e) {

    }
}
