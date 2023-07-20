import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

import { abbrTxHash, formatAmountWithDecimal } from 'utils/format';
import http from '../utils/http';

export const getNftDetail = (contractAddress, chainType, tokenId) => {
  return http.get(`/nft/${chainType}/${contractAddress}/${tokenId}`)
}

export const useNftHistory = (contractAddress, chainType, tokenId) => {
  const [historyList, setHistoryList] = useState()
  const getData = async () => {
    let res = await http.get(`/nft/${chainType}/${contractAddress}/${tokenId}/history`)
    const arr = []
    res.forEach(item => {
      if (item.type === 'mint') {
        arr.push({
          operator: item.operator,
          hash: item.transactionHash,
          price: '--',
          time: moment(item.blockTimestamp).format('YYYY-MM-DD HH:mm:SS'),
          type: 'Mint'
        })
      } else if (item.type === 'transfer') {
        arr.push({
          operator: {
            name: abbrTxHash(item.to),
            address: item.to
          },
          hash: item.transactionHash,
          price: '--',
          time: moment(item.blockTimestamp).format('YYYY-MM-DD HH:mm:SS'),
          type: 'Transfer'
        })
      } else if (item.type === 'createAuction') {
        if (item.bidHistories.length > 0) {
          item.bidHistories.forEach(cell => {
            arr.push({
              operator: cell.bidder,
              hash: cell.transactionHash,
              price: formatAmountWithDecimal(cell.amount1, item.token1?.decimals || 18) + ' ' + item.token1?.symbol,
              time: moment(cell.time * 1000).format('YYYY-MM-DD HH:mm:SS'),
              type: 'Bid'
            })
          })
        } else {
          arr.push({
            operator: item.operator,
            hash: item.transactionHash,
            price: '--',
            time: moment(item.blockTimestamp).format('YYYY-MM-DD HH:mm:SS'),
            type: 'Bid'
          })
        }
      } else if (item.type === 'createFixedSwap') {
        if (item.swapHistories.length > 0) {
          const cell = item.swapHistories[item.swapHistories.length - 1]
          arr.push({
            operator: cell.operator,
            hash: cell.transactionHash,
            price: formatAmountWithDecimal(cell.amount1, item.token1?.decimals || 18) + ' ' + item.token1?.symbol,
            time: moment(cell.time * 1000).format('YYYY-MM-DD HH:mm:SS'),
            type: 'Swap'
          })
        } else {
          arr.push({
            operator: item.operator,
            hash: item.transactionHash,
            price: '--',
            time: moment(item.blockTimestamp).format('YYYY-MM-DD HH:mm:SS'),
            type: 'Swap'
          })
        }
      }
    });
    setHistoryList(arr.reverse())
  }
  useEffect(() => {
    getData()
  }, [contractAddress, chainType, tokenId])
  return { historyList }
}

export const publishComment = (chainType,contractAddress,tokenId,content,library,account) => {
  let formData = {
    content:content
  };
  return http.post(`/nft/${chainType}/${contractAddress}/${tokenId}/comments`,formData,{ library, account, forceSign: true })
}
export const getCommentList = (chainType,contractAddress,tokenId,pageNo,pageSize,sort) => {
  return http.get(`/nft/${chainType}/${contractAddress}/${tokenId}/comments?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}`)
}
export const like = (library,account,commentId) => {
  return http.post(`/nft/comments/${commentId}/like`,undefined, { library, account, forceSign: true })
}
export const unlike = (library,account,commentId) => {
  return http.delete(`/nft/comments/${commentId}/like`,undefined, { library, account, forceSign: true })
}
export const delComment = (library,account,commentId) => {
  return http.delete(`/nft/comments/${commentId}`,undefined, { library, account, forceSign: true })
}