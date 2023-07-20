import { useState, useEffect } from 'react';
import http from '../utils/http';
import moment from 'moment';

export const saveCollection = async (formData) => {
  let res = await http.put(`/collections`, formData)
  return res
}
export const delCollection = async (collectionId) => {
  let res = await http.delete(`/collections/${collectionId}`)
  return res
}
export const queryCollectionDetail = async (collectionId) => {
  let res = await http.get(`/collections/${collectionId}`)
  return res
}
export const publishCollection = async (collectionId,mintStartTime,mintEndTime,chainType,contractAddress,txHash,blockNumber,maxCountPerAddress) => {
  let res = await http.put(`/collections/${collectionId}/publish?mintStartTime=${mintStartTime}&mintEndTime=${mintEndTime}&chainType=${chainType}&contractAddress=${contractAddress}&txHash=${txHash}&blockNumber=${blockNumber}&maxCountPerAddress=${maxCountPerAddress}`)
  return res
}
const formatTime = (timestamp) => {
  const currentTimestamp = Date.now();
  const timeDiff = Math.abs(currentTimestamp - timestamp);

  const oneMinute = 60 * 1000;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;

  if (timeDiff >= oneDay) {
    const days = Math.floor(timeDiff / oneDay);
    const hours = Math.floor((timeDiff % oneDay) / oneHour);
    return `${days}${days > 1 ? 'ds' : 'd'} ${hours}${hours > 1 ? 'hs' : 'h'}`;
  } else if (timeDiff >= oneHour) {
    const hours = Math.floor(timeDiff / oneHour);
    const minutes = Math.floor((timeDiff % oneHour) / oneMinute);
    return `${hours}${hours > 1 ? 'hs' : 'h'} ${minutes}${hours > 1 ? 'mins' : 'min'}`;
  } else if (timeDiff >= oneMinute) {
    const minutes = Math.floor(timeDiff / oneMinute);
    return `${minutes}${minutes > 1 ? 'mins' : 'min'}`;
  } else {
    return 'Less than 1min';
  }
}
const countStaus = (status, data) => {
  // console.log(data);
  if (status === 'soon') {
    return `${moment(data?.mintStartTime).format('DD MMMM HH:mm a')}`
  } else {
    return formatTime(data?.mintEndTime)
  }
}
export  const queryCollectionData = async(pageNo,pageSize,status) => {
  try {
    let res = http.get(`/collections/published?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`)
    return res
  } catch (error) {
    // console.log(error);
  }
}
export const useCollectionList = (pageNo, pageSize, setLoading, status) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    try {
      if(pageNo===1){
        setLoading(true)
      }
      http.get(`/collections/published?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`).then(res => {
         res.list.forEach(item => {
          item.statusTxt = countStaus(item.status, item)
        })
        if (pageNo === 1) {
          setList(res.list)
        } else {
          setList(oldList => [...oldList, ...res.list])
        }
        setTotal(res.totalCount)
        setLoading(false)
      })
    } catch (error) {
      console.log(error);
        setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, status])
  console.log(666);
  return { list, total }
}
export const useOwnerCollectionList = (pageNo, pageSize, setLoading, status,refreshList) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/collections/created?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`).then(res => {
      if (pageNo === 1) {
        setList(res.list)
      } else {
        setList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, status,refreshList])
  return { list, total }
}
export const saveNFT = async (collectionId,formData) => {
  let res = await http.put(`/collections/${collectionId}/types`, formData)
  return res
}
export const delNFT  = async (collectionId,typeId) => {
  let res = await http.delete(`/collections/${collectionId}/types/${typeId}`)
  return res
}
export const useOwnerNFTTypesList = (collectionId,pageNo, pageSize, setLoading,refreshList) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/collections/${collectionId}/types?pageNo=${pageNo}&pageSize=${pageSize}`).then(res => {
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
  }, [pageNo, pageSize,refreshList])
  return { list, total }
}
export const queryNFTTypeDetail = async (collectionId,typeId) => {
  let res = await http.get(`/collections/${collectionId}/types/${typeId}`)
  return res
}
export const useNFTList = (owner,collectionId,pageNo, pageSize, setLoading) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/nfts/?owner=${owner}&collectionId=${collectionId}&pageNo=${pageNo}&pageSize=${pageSize}`).then(res => {
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
    }, 100);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, owner])
  return { list, total }
}
export const queryNFTDetail = async (chainType,contractAddress,tokenId) => {
  let res = await http.get(`/nfts/${chainType}/${contractAddress}/${tokenId}`)
  return res
}
export const putFullMetadata = async (collectionId, formData) => {
  let res = await http.put(`/collections/${collectionId}/metadata/full`, formData)
  return res
}
export const putNftImg = async (collectionId, formData) => {
  let res = await http.put(`/collections/${collectionId}/metadata/image`, formData)
  return res
}
export const getMetadataList = async (collectionId, hasImage, pageNo, pageSize) => {
  let res = await http.get(`/collections/${collectionId}/metadata?hasImage=${hasImage}&pageNo=${pageNo}&pageSize=${pageSize}`)
  return res
}
export const getOneMetadata = async (collectionId, nftId) => {
  let res = await http.get(`/collections/${collectionId}/nfts/${nftId}/metadata`)
  return res
}
export const putOneMetadata = async (collectionId, nftId, formData) => {
  let res = await http.put(`/collections/${collectionId}/nfts/${nftId}/metadata`, formData)
  return res
}
export const delOneMetadata = async (collectionId, nftId) => {
  let res = await http.delete(`/collections/${collectionId}/nfts/${nftId}/metadata`)
  return res
}


