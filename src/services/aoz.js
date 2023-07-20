import { useState, useEffect, useCallback } from 'react';
import http from '../utils/http';

export const featchNftList = async (pageNo, pageSize, isOnSale, collection) => {
    try {
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            collection: collection,
            saleType: isOnSale,
        }
        let url = `/nft/query`
        const res = await http.post(url, params);
        return res
    } catch (e) {
        console.log('fetch list error')
    }
}

export const useList = (pageNo, pageSize, setLoading, collection, isOnSale) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)

    const queryNftList = async () => {
        try {
            setLoading(true)
            const data = await featchNftList(pageNo, pageSize, collection, isOnSale);
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
        queryNftList()
    }, [pageNo, pageSize, isOnSale])

    return { list, total }
}