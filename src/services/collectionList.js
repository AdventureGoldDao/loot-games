import { useState, useEffect } from 'react';
import http from '../utils/http';

export const queryList = async (pageNo, pageSize, search, category) => {
    let data = {};
    try {
       let res = http.get( `/nft/collections?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&category=${category}`)
       if(res) data = res
    } catch (error) {
        console.log(error);
    }
    return data;

  }

export const useCollectionList = (pageNo, pageSize, search, category, setLoading,creator) => {
  const [collectionList, setCollectionList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
        setLoading&&setLoading(true)
    }
    http.get(
    `/nft/collections?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&category=${category}&creator=${creator}`
    ).then(res => {
      if (pageNo === 1) {
        setCollectionList(res.list)
      } else {
        setCollectionList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading&&setLoading(false)
    })
  }

  useEffect(() => {
    // const timer = setTimeout(() => {
      queryData()
    // }, 10);
    // return () => clearTimeout(timer);
  }, [pageNo, pageSize, search,category,creator])

  return { collectionList, total }
}
