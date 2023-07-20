

import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (pageNo, pageSize, search,setLoading) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const queryData = async () => {
        try {
            if(pageNo===1){
                setLoading(true)
            }
            const url = `/artists?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}`
            const res = await http.get(url);
            if (pageNo === 1) {
                setList(res.artists)
            } else {
                setList(oldList => [...oldList, ...res.artists])
            }
            setTotal(res.totalCount)
            setLoading(false)
            return res
        } catch (e) {
            console.log('fetch artist error')
        }
    }


    useEffect(() => {
        queryData()
    }, [pageNo, pageSize, search])
    return { list, total }
}