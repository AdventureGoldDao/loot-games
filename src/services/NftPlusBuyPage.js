import { useState, useEffect } from 'react';
import http from '../utils/http';

export const getCollectionInfo = async (collectionType) => {
    try {
        return await http.get(`/nft/collections/${collectionType}`)
    } catch (error) {
    }
}

// export const getNftPlusTypeInfo = async (type) => {
//     try {
//         const res = await http.get(`/warrants/collections/${type}`)
//         return res
//     } catch (e) {

//     }
// }

// export const getPuzzleInfo = async (type) => {
//     try {
//         const res = await http.get(`/puzzles/${type}`)
//         return res
//     } catch (e) {

//     }
// }

// export const getMysteryBoxInfo = async (type) => {
//     try {
//         const res = await http.get(`/blindBoxes/${type}`)
//         return res
//     } catch (e) {

//     }
// }
// export const getNftPlusBuyList = async (pageNo, pageSize, saleType, collection) => {
//     try {
//         const res = await http.get(`/warrants?saleType=${saleType}&pageNo=${pageNo}&pageSize=${pageSize}&collection=${collection}`);
//         console.log(res);
//         return res
//     } catch (e) {
//         console.log('query list error', e)
//     }
// }

export const fetchTokensList = async (pageNo, pageSize, saleType, collection, contractAddress,attributes) => {
    try {
        const res = await http.post('/nft/query', {pageNo, pageSize, saleType, contractAddress, collection, attributes });
        return res
    } catch (e) {
        console.log('fetch list error')
    }
}