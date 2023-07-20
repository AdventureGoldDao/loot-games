import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (type,setLoading) => {
    const [list, setList] =useState([])

    const getList = async () => {
        try {
            setLoading(true)
            const res = await http.get(`/warrants/collections?project=${type}`,);
            setList(res.list)
            setLoading(false)
            return res
        } catch (e) {
            console.log('fetch list error')
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return list
}

// export const useNftPlusInfo = (type) => {
//     const [info, setInfo] =useState({})
//     const getNftPlusTypeInfo = async () => {
//         try {
//           const res = await http.get(`/warrants/collections/${type}`)
//           console.log(res);
//           setInfo(res)
//         } catch (e) {
            
//         }
//       }
//     useEffect(() => {
//         getNftPlusTypeInfo()
//     }, [])
//     return info
// }

// export const useGetBuyList = (pageNo, pageSize, saleType, collection ) => {
//     const [list, setList] = useState([])
//     const [total, setTotal] = useState(0)
//     const getListByType = async () => {
//         try {
//           const res = await http.get(`/warrants?saleType=${saleType}&pageNo=${pageNo}&pageSize=${pageSize}&collection=${collection}`);
//           console.log(res);
//           setList(res.list)
//           setTotal(res.total)
//         } catch (e) {
//           console.log('query list error', e)
//         }
//     }
//     useEffect(() => {
//         getListByType()
//     }, [pageNo,saleType])
//     return {list,total}
// }
export const getSypoolTypeInfo = async (type) => {
    let data = {};
    try {
      const res = await http.get(`/warrants/types/${type}`);
        data = res
    } catch (e) {
      console.log('query info error', e)
    }
    return data;
  }
