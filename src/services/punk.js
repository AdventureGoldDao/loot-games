import { useState, useEffect, useCallback } from 'react';
import http from '../utils/http';

export const featchPrunkList = async (pageNo, pageSize, search, isOnSale, otherParams) => {
    try {
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            collection: "ape",
            name: search,
            saleType: isOnSale,
            attributes:otherParams
        }
        let url = `/nft/query`
        const res = await http.post(url, params);
        return res
    } catch (e) {
        console.log('fetch list error')
    }
}

export const usePrunkList = (pageNo, pageSize, setLoading, search, isOnSale, otherParams) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)

    const queryTokensList = async () => {
        try {
            if(pageNo === 1){
                setLoading(true)
            }
            const data = await featchPrunkList(pageNo, pageSize, search, isOnSale, otherParams);
            // console.log(data);
            if (!data) {
                return;
            }
            if (pageNo === 1) {
                setList(data.list)
            } else {
                setList(oldList => [...oldList, ...data.list])
            }
            setTotal(data?.totalCount)
            setLoading(false)

        } catch (e) {
            console.log('query tokens list error', e)
        }
    }

    useEffect(() => {
        queryTokensList()
    }, [pageNo, pageSize, search, isOnSale, otherParams])

    return { list, total }
}