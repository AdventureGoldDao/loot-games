import { useState, useEffect } from 'react';
import axios from "axios";

import http from '../utils/http';

export const getArtistInfo = (address, currentUser) => {
  return http.get(`/users/${address}`, { currentUser })
}

export const postProfile = async (formData) => {

  let res = await http.put(`/users`, formData)
  return res
}

export const getAllNfts = async (address, chain) => {
  const chains = {
    'mainnet': 'rest',
    'bsc': 'bnb',
    'polygon': 'polygon'
  };

  const promiseFactory = function (erc_type) {
    return axios.get(
      `https://${chains[chain]}api.nftscan.com/api/v2/account/own/${address}`,
      {
        headers: { 'X-API-KEY': 'LVFeQaMQ' },
        params: {
          erc_type,
          limit: 100
        }
      }
    )
  };

  return Promise.all([promiseFactory('erc721'), promiseFactory('erc1155')]).then(resArr => {
    const allNftList = [];
    resArr.forEach(res => {
      if (res.status === 200 && res.data && res.data.data.content) {
        res.data.data.content.forEach(item => {
          allNftList.push({
            id: item.token_id,
            contractAddress: item.contract_address,
            name: item.name || item.contract_name,
            image: (/http/.test(item.image_uri) && item.image_uri) || (/http/.test(item.content_uri) && item.content_uri) || (/http/.test(item.nftscan_uri) && item.nftscan_uri),
            chainType: chain
          })
        })
      }
    })

    return allNftList;
  })

}

export const getHandleName = async (handleName) => {
  let res = await http.get(`/users/h/${handleName}/check`)
  return res
}

export const getInfoByHandleName = async (handleName) => {
  let res = await http.get(`/users/h/${handleName}`)
  return res
}

export const addFeatured = async (obj) => {
  let res = await http.post(`/gallery/${obj.chainType}/${obj.contractAddress}/${obj.id}`)
  return res
}
export const deleteFeatured = async (obj) => {
  let res = await http.delete(`/gallery/${obj.chainType}/${obj.contractAddress}/${obj.nftId}`)
  return res
}
export const updateFeatured = async (obj, forward) => {
  let res = await http.put(`/gallery/${obj.chainType}/${obj.contractAddress}/${obj.nftId}?direction=${forward ? 'forward' : 'backward'}`)
  return res
}
export const getFeaturedList = async (userAddress) => {
  let res = await http.get(`/gallery?userAddress=${userAddress}`)
  return res
}

// export const getAllNfts = async (address, chain) => {
//   if (chain === 'eth') {
//     return axios.get(
//       `https://api.opensea.io/api/v1/assets?format=json&owner=${address}`
//     ).then(res => {
//       const arr = []
//       if (res.status === 200 && res.data && res.data.assets) {
//         res.data.assets.forEach(item => {
//           arr.push({
//             id: item.token_id,
//             contractAddress: item.asset_contract.address,
//             name: item.name,
//             image: item.image_url,
//             chainType: 'mainnet'
//           })
//         })
//       }
//       return arr;
//     })
//   } else {
//     const resultArr = await axios.get(
//       `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}`,
//       { headers: { 'X-API-Key': 'tRUY6acIDdjNQ4VyNuuw9F6Pajdreho5jaBintKzmPGM95b0EcTvnsyEksEaJ0U6' } }
//     ).then(res => {
//       if (res.status === 200 && res.data && res.data.result) {
//         return res.data.result
//       }
//     })

//     let len = resultArr.length;

//     return new Promise((rv, rj) => {
//       const arr = [];
//       resultArr.forEach((item, index) => {
//         if (!item.token_uri) {
//           len--;
//           if (len <= 0) {
//             rv(arr)
//           }
//           return;
//         }

//         axios.get(item.token_uri).then(response => {
//           if (response.status === 200 && response.data && response.data.image) {
//             arr[index] = {
//               id: item.token_id,
//               contractAddress: item.token_address,
//               name: item.name,
//               image: response.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
//               chainType: chain === 'matic' ? 'polygon' : 'bsc'
//             }
//           }
//         }).finally(() => {
//           len--;
//           if (len <= 0) {
//             rv(arr)
//           }
//         })
//       });
//     })
//   }
// }