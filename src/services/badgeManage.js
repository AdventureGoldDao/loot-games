import { useState, useEffect } from 'react';
import http from '../utils/http';

export const saveEvent = async (formData) => {
    let res = await http.put(`/badges/events`, formData)
    return res
}
export const delEvent = async (eventId) => {
    let res = await http.delete(`/badges/events/${eventId}`)
    return res
}
export const getEventByProject = async (project) => { //acquired badges
    try {
      const res = await http.get(`/badges/projects/${project}`);
      return res
    } catch (e) {
      console.log('fetch badge Info error')
    }
}
export const addBlindBox = async (eventId,formData) => {
    let res = await http.put(`/badges/events/${eventId}/blindboxes`, formData)
    return res
}
export const checkEventId = async (eventId) => {
    let res = await http.put(`/badges/events/${eventId}/check`)
    return res
}
export const checkBadgeType = async (badgeType) => {
    let res = await http.put(`/badges/badgeTypes/${badgeType}/check`)
    return res
}
export const addGroup = async (eventId,formData) => {
    let res = await http.put(`/badges/events/${eventId}/groups`,formData)
    return res
}
export const delGroup = async (eventId,groupName) => {
    let res = await http.delete(`/badges/events/${eventId}/groups/${groupName}`)
    return res
}
export const getGroups = async (eventId) => {
    let res = await http.get(`/badges/events/${eventId}/groups`)
    return res
}
export const putBadgeTaskList = async (eventId, badgeType,taskList,taskDescription) => {
    let res = await http.post(`/badges/events/${eventId}/badges/${badgeType}/tasks`,{
        "tasks":taskList,
        "taskDescription":taskDescription
    })
    return res
}
export const putBlindTaskList = async (eventId, badgeType,taskList,taskDescription) => {
    let res = await http.put(`/badges/events/${eventId}/blindboxes/${badgeType}/tasks`,{
        "tasks":taskList,
        "taskDescription":taskDescription
    })
    return res
}
export const addBadge = async (eventId,formData) => {
    let res = await http.put(`/badges/events/${eventId}/badges`,formData)
    return res
}
export const delBadge = async (eventId,badgeType) => {
    let res = await http.delete(`/badges/events/${eventId}/badges/${badgeType}`)
    return res
}
export const delTask = async (eventId,taskId) => {
  let res = await http.delete(`/badges/events/${eventId}/tasks/${taskId}`)
  return res
}
export const useBadgeEventList = (pageNo, pageSize, setLoading, status) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
  
    const dealTime = (startTime, endTime) => {
      if (new Date(startTime).getTime() - Date.now() < 0 && new Date(endTime).getTime() - Date.now() > 0) {
          return 'start'
      } else if (new Date(endTime).getTime() - Date.now() < 0) {
          return 'end'
      } else {
          return 'wait'
      }
    }
  
    const queryData = () => {
      if(pageNo===1){
        setLoading(true)
      }
      http.get(`/badges/events/owned?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`).then(res => {
        res.list.forEach(item => {
          item.status = dealTime(item.eventStartTime, item.eventEndTime)
        })
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
    }, [pageNo, pageSize, status])
  
    return { list, total }
  }
  export const getBadgeDetail = async (badgeType) => {
    try {
      const res = await http.get(`/badges/types/${badgeType}`);
      return res
    } catch (e) {
      console.log('fetch badge Info error')
    }
}
export const addContractAddress = async (jsonBody) => {
  let res = await http.post(`/contracts`,jsonBody)
  return res
}
export const getContractAddress = async (chainType,type) => {
  let res = await http.get(`/contracts?chainType=${chainType}&type=${type}`)
  return res
}
export const publishEvent = async (eventId) => {
  let res = await http.put(`/badges/events/${eventId}/publish`)
  return res
}
export const taskVerify = async (eventId,taskId) => {
  let res = await http.put(`/badges/events/${eventId}/tasks/${taskId}/verify`)
  return res
}
export const codeGetTwitterInfo = async (code, redirectUrl) => {
  let res = await http.put(`/users/twitter?code=${code}&redirectUrl=${redirectUrl}`)
  return res
}
export const deleteTwitterInfo = async () => {
  let res = await http.delete(`/users/twitter`)
  return res
}
export const postImage = async (formData) => {
  let res = await http.post(`/externalResources/images`,formData)
  return res
}
export const queryAccount = async () => {
  let res = await http.get(`/badges/airdrop/account`)
  return res
}
export const queryBaseGasFee = async (chainType) => {
  let res = await http.get(`/badges/airdrop/gas/recommended?chainType=${chainType}`)
  return res
}
export const setGasPrice = async (chainType,gasPrice) => {
  let res = await http.put(`/badges/airdrop/gas?chainType=${chainType}&gasPrice=${gasPrice}`)
  return res
}
export const claimGas = async (chainType,toAddress) => {
  let res = await http.put(`/badges/airdrop/account/transfer?chainType=${chainType}&toAddress=${toAddress}`)
  return res
}
export const getParticipants = async (type) => {
  let res = await http.get(`/badges/types/${type}/participants`)
  return res
}
  