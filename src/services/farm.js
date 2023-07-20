import { useState, useEffect } from 'react';
import http from '../utils/http';

export const useFarmList = () => {
    const [stakeList, setStakeList] =useState([])

    const dealTime = (continuable,endTime) => {
        if(continuable){
            return 'active'
        }else {
            if (new Date(endTime).getTime()- Date.now() < 0) {
                return 'closed'
            }else {
                return 'active'
            }
        }
    }

    const getPoolList = async () => {
        try {
            const res = await http.get(`/stake/pools`,);
            console.log(res);
            res && res.list.forEach(item => {
                item.status = dealTime(item.continuable,item.endTime*1000)
            })
            setStakeList(res.list)
            return res
        } catch (e) {
            console.log('fetch list error')
        }
    }

    useEffect(() => {
        getPoolList()
    }, [])
    return stakeList
}
export const getPoolInfo = async ({chainType, contractAddress, poolId}) => {
    try {
      const res = await http.get(`/stake/pools/${chainType}/${contractAddress}/${poolId}`);
      return res
    } catch (e) {
      console.log('fetch info error')
    }
  }