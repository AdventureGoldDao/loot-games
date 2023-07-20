import { useState, useEffect } from 'react';
import http from '../utils/http';

export const saveDraft = (data) => {
  return http.post(`/tokens/drafts`, data)
}

export const deleteDraft = (id) => {
  return http.delete('/tokens/drafts/' + id)
}

export const deleteAllDraft = () => {
  return http.delete('/tokens/drafts')
}

export const draftBindNft = (draftId, data) => {
  return http.put(`/tokens/drafts/${draftId}`, data)
}

export const useUnbindNftList = (address, contractAddress) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)


  const queryData = () => {
    http.get(`/tokens/unpublished?artist=${address}&contractAddress=${contractAddress}`)
      .then(data => {
        setList(data.tokens)
        setTotal(data.tokens.length)
      })
  }

  useEffect(() => {
    if (address) {
      queryData()
    }
  }, [address, contractAddress])

  return { list, total }
}

export const getDraftList = (address, pageNo, pageSize) => {
  return http.get(`/tokens/drafts?creator=${address}&pageNo=${pageNo}&pageSize=${pageSize}`)
}
export const saveCollection = (data) => {
  return http.put(`/nft/collections`, data)
}
export const deleteCollection = (collection) => {
  return http.delete(`/nft/collections/${collection}`)
}
export const queryCollectionList = (creator) => {
  return http.get(`/nft/collections?pageNo=${1}&pageSize=${9999}&creator=${creator}`)
}
export const unbindNftTokenIds = (address,contractAddress) => {
  return http.get(`/tokens/unpublished?artist=${address}&contractAddress=${contractAddress}`)
}

