import { useState, useEffect, useCallback } from 'react';
import http from '../utils/http';

export const useBadgeProjectList = (pageNo, pageSize, setLoading, nftChain, nftType, onlyClaimable) => {
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
    http.get(`/badges/projects?pageNo=${pageNo}&pageSize=${pageSize}&chainType=${nftChain}&status=${nftType}&onlyClaimable=${onlyClaimable}`).then(res => {
      // res.list.forEach(item => {
      //   item.status = dealTime(item.eventStartTime, item.eventEndTime)
      // })
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
  }, [pageNo, pageSize, nftChain, nftType, onlyClaimable])

  return { list, total }
}
export const getBadgeProjectInfo = async (project) => {
  try {
    const res = await http.get(`/badges/projects/${project}`);
    return res
  } catch (e) {
    console.log('fetch badge Info error')
  }
}

export const getBadgeListByProject = async (project) => { //acquired badges
  try {
    const res = await http.get(`/badges/types?project=${project}`);
    return res
  } catch (e) {
    console.log('fetch badge list error')
  }
}
const getBadgeListTotal = async () => { //acquired badges
  try {
    const res = await http.get(`/badges/ampleforth/claimStat`);
    return res
  } catch (e) {
    console.log('fetch badge list error')
  }
}
export const useBadgeTotal = () => {
  const [badgeTotal, setBadgeTotal] = useState({})
  useEffect(()=> {
    getBadgeListTotal().then(res => {
      setBadgeTotal(res)
    })
  },[])
  return {badgeTotal}
}

export const useBadgeList = (project,setLoading) => {
  const [badgeList, setBadgeList] = useState([])
  const [ seriesList, setSeriesList] = useState([])
  const queryBadgeList = useCallback(async (project) => {
    try {
      setLoading(true)
      const data = await getBadgeListByProject(project);
      setLoading(false)
      if (data) {
        setSeriesList(data.list)
        let obj = {}
        data.list.forEach((item,index) => {
          if (!item.qualification){
            item.qualification = "badge"
          }
          if(item.group){
            item.qualification = item.group
          }
          let str = item.qualification
          item.showType = str.replace(str[0],str[0].toUpperCase())
          if(index === 0) {
            obj[item.qualification]=[]
            obj[item.qualification].push(item)
          }else{
            if(obj.hasOwnProperty(item.qualification)){
              obj[item.qualification].push(item)
            }else{
              obj[item.qualification]=[]
              obj[item.qualification].push(item)
            }
          }
        });
        let arr = Object.values(obj)
        setBadgeList(arr)
      }
    } catch (e) {
      console.log('query badge list error', e)
    }
  }, [project])

  useEffect(() => {
    queryBadgeList(project)
  }, [project])
  return { badgeList,seriesList }
}

const getUnclaimedBadges = async (project, library, account) => {
  try {
    const url = `/badges/types/unclaimed?project=${project}`
    const res = await http.get(url)
    return res
  } catch (e) {
    console.log('fetch unclaimed badge list error')
  }
}

export const useUnclaimedBadgeList = (project, library, account) => {
  const [unclaimedBadgeList, setUnclaimedBadgeList] = useState([])
  const queryBadgeList = useCallback(async (project) => {
    try {
      const data = await getUnclaimedBadges(project, library, account);
      if (data && data.list) {
        setUnclaimedBadgeList(data.list)
      }
    } catch (e) {
      console.log('query unclaimed badge list error', e)
    }
  }, [project, account, library])

  useEffect(() => {
    account&&queryBadgeList(project)
  }, [project, account, library])

  return { unclaimedBadgeList }
}

export const getClaimDFAInfo = async () => {
  const res = await http.get('/configurations?keys=claim_dfa_activity_name,claim_dfa_activity_link,claim_dfa_activity_bg')
  return res;
}
export const getUserRewardsTotal = async () => {
  const res = await http.get('/rewards/total')
  return res;
}
export const getUserRewardsRecords = async () => {
  const res = await http.get('/rewards/records?pageNo=1&pageSize=100')
  return res;
}
export const getUserRewardsClaimInfo = async (chainType, contract) => {
  const res = await http.get(`/rewards/claimInfo?chainType=${chainType}&contract=${contract}`)
  return res;
}
