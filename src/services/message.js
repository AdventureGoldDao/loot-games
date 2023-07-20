import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (category,pageNo,pageSize,setLoading) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    // const [loading, setLoading] = useState(false)
    const getNoticeList = async () => {
        try {
            if(pageNo===1){
                setLoading&&setLoading(true)
            }
            const res = await http.get(`/notifications?category=${category}&pageNo=${pageNo}&pageSize=${pageSize}`);
            if (pageNo === 1) {
                setList(res.list)
            } else {
                setList(oldList => [...oldList, ...res.list])
            }
            // setList(res.list)
            setTotal(res?.totalCount)
            setLoading(false)
        } catch (e) {
            // console.log(e)
            console.log('fetch list error')
        }
    }
    useEffect(() => {
        getNoticeList()
    }, [pageNo])
    return {list,total}
}
export const queryNoticeStatus = async () => {
    let res = await http.get(`/notifications/unread`)
    return res
}