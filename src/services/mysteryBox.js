import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (setLoading) => {
    const [list, setList] = useState([])
    const getBlindBoxesList = async () => {
        try {
            setLoading(true)
            const res = await http.get(`/blindBoxes`);
            setList(res.list)
            setLoading(false)
        } catch (e) {
            console.log('fetch list error')
        }
    }
    useEffect(() => {
        getBlindBoxesList()
    }, [])
    return list
}