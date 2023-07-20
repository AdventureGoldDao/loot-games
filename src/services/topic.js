import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (pageNo,pageSize,setLoading,refresh) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    // const [loading, setLoading] = useState(false)
    const getTopicList = async () => {
        try {
            if(pageNo===1){
                setLoading&&setLoading(true)
            }
            const res = await http.get(`/activities/topics?pageNo=${pageNo}&pageSize=${pageSize}`);
            if (pageNo === 1) {
                setList(res.list)
            } else {
                setList(oldList => [...oldList, ...res.list])
            }
            // setList(res.list)
            setTotal(res?.totalCount)
            setLoading&&setLoading(false)
        } catch (e) {
            console.log(e)
            console.log('fetch list error')
        }
    }
    useEffect(() => {
        getTopicList()
    }, [pageNo,refresh])
    return {list,total}
}
export const topicDetail = async (topicContent) => {
    try {
        const res = await http.get(`/activities/topics/${topicContent}`);
        return res
    } catch (error) {
        console.log(error);
        return error
    }
}