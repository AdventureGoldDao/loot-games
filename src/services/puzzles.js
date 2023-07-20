import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useList = (type,setLoading) => {
    const [list, setList] =useState([])

    const getList = async () => {
        try {
            setLoading(true)
            const res = await http.get(`/puzzles?project=${type}`);
            res.list.forEach(item => {
                item.count = item.pieceCount/item.pieceCountPerBox
            })
            setList(res.list)
            setLoading(false)

        } catch (e) {
            console.log('fetch list error')
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return list
}
export const usePuzzleInfo = (type) => {
    const [info, setInfo] =useState({})
    const getPuzzleInfo = async () => {
        try {
          const res = await http.get(`/puzzles/${type}`)
          console.log(res);
          setInfo(res)
        } catch (e) {
            
        }
      }
    useEffect(() => {
        getPuzzleInfo()
    }, [])
    return info
}
