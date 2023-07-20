import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";

import ERC20 from '../web3/abi/ERC20.json'
import { getSign, handleIsSignExpired } from './txSign'
import { getContract, useActiveWeb3React } from "../web3";
import env from '../env';

const ERROR_MESSAGE = "network error"

const instance = axios.create({
  baseURL: env.API_URL
});

instance.interceptors.request.use(function (config) {
  let headers = handleIsSignExpired()

  if (headers) {
    headers.signatureMessage = encodeURIComponent(headers.signatureMessage)
    config.headers = {
      ...config.headers,
      ...headers
    };
  }

  return config;
});

instance.interceptors.response.use(function (response) {
  if (response.status === 200 && response.data.code === 'success' || response.status === 200 && response.data.code === 'nft.not.exist') {
    return response.data.data;
  } else {
    return Promise.reject(response.data.code || ERROR_MESSAGE);
  }
}, function (error) {
  return Promise.reject(error);
});

const dealConfig = async (config) => {
  if (config) {
    if (config.forceSign) {
      await getSign(config.library, config.account, true)
    }
  }

  return config;
}

const http = {
  get: async (url, data, config) => {
    config = await dealConfig(config)
    return instance.get(url, { ...config, params: data })
  },
  post: async (url, data, config) => {
    config = await dealConfig(config)
    return instance.post(url, data, config)
  },
  put: async (url, data, config) => {
    config = await dealConfig(config)
    return instance.put(url, data, config)
  },
  delete: async (url, data, config) => {
    config = await dealConfig(config)
    return instance.delete(url, { ...config, params: data })
  },
}

export default http;
