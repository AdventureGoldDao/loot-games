import { useState, useEffect } from 'react';
import axios from "axios";
import http from '../utils/http';

export const useNftList = (pageNo, pageSize, { nftType, nftChain, saleType, search, owner },setLoading) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.post(
      '/nft/query',
      { pageNo, pageSize, chainType: nftChain, category: nftType, saleType, name: search, owner }
    ).then(res => {
      if (pageNo === 1) {
        setList(res.list)
      } else {
        setList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, nftType, nftChain, saleType, search, owner])

  return { list, total }
}
export const queryNFTData = (address) => {
  const whiteList = [
    '0xF82d80Cbc62679021DbB63A64b662f3247D0060a',
    '0x4eBC48bB25AD5dcAF8fA6C194a463e0736c5D2e8',
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    '0xe6d48bf4ee912235398b96e16db6f310c21e82cb',
    '0xb5643598496b159263c67Bd0D25728713f5aAd04',
    '0x7D8820FA92EB1584636f4F5b8515B5476B75171a',
    '0xd2f668a8461d6761115daf8aeb3cdf5f40c532c6',
    '0x67d9417c9c3c250f61a83c7e8658dac487b56b09',
    '0xfe8c6d19365453d26af321d0e8c910428c23873f',
    '0xb4d06d46A8285F4EC79Fd294F78a881799d8cEd9',
    '0x06012c8cf97bead5deae237070f9587f8e7a266d'
  ]

  return new Promise((rv, rj) => {
    const allNftList = [];
    let l = whiteList.length;

    whiteList.forEach(item => {
      axios.get(
        `https://restapi.nftscan.com/api/v2/account/own/${address}`,
        {
          headers: { 'X-API-KEY': 'LVFeQaMQ' },
          params: {
            contract_address: item,
            limit: 100
          }
        }
      ).then(res => {
        if (res.status === 200 && res.data && res.data.data.content) {
          res.data.data.content.forEach(item => {
            allNftList.push({
              id: item.token_id,
              contractAddress: item.contract_address,
              name: item.name || item.contract_name,
              createTime: item.mint_timestamp,
              image: item.image_uri,
              chainType: 'mainnet'
            })
          })
        }
        
      }).finally(() => {
        l--;
        if (l <= 0) {
          rv(allNftList);
        }
      })
    })
  });
}
export const queryOwnerNfts = async (pageNo, pageSize, { owner }) => {
  let res = await http.post(
    '/nft/query',
    { pageNo, pageSize, category: 'badge', owner }
  )
  return res.list
}