import http from '../utils/http';

export const getBadgeInfo = async (badgeType, account) => {
    let data = {};
    try {
      const res = await http.get(`/badges/types/${badgeType}?currentUser=${account}`)
      if (res) {
        data = res
      }
    } catch (e) {
      console.log('query badgeInfo error', e)
    }
    return data;
  }
  export const queryMyBadges = async (paroject, group) => {
    let data = {};
    try {
      const res = await http.get(`/badges/minted?paroject=${paroject}&group=${group}`)
      if (res) {
        data = res
      }
    } catch (e) {
      console.log('query my badges error', e)
    }
    return data;
  }
  
  export const getClaimInfo = async ({badgeType, library, account}) => {
    let data = {};
    try {
      const res = await http.get(`/badges/claimInfo?badgeType=${badgeType}`)
  
      if (res) {
        data = res
      }
    } catch (e) {
      console.log('query badgeInfo error', e)
    }
    return data;
  }
  export const getBlindBoxClaimInfo = async (blindBadgeName) => {
    let data = {};
    try {
      const res = await http.get(`/blindBoxes/${blindBadgeName}/claimInfo`)
  
      if (res) {
        data = res
      }
    } catch (e) {
      console.log('query badgeInfo error', e)
    }
    return data;
  }
  
  export const getOwnerList = async ({current, pageSize}, badgeType) => {
    let data = {};
    try {
      const res = await http.get(`/badges/types/${badgeType}/owners?pageNo=${current}&pageSize=${pageSize}`)
  
      if (res) {
        data = res
      }
    } catch (e) {
      console.log('query OwnerList error', e)
    }
    return data;
  }

  export const badgeApply = async ( badgeType, address, email ) => {
    let data = {
      'address': address,
      'email': email
    };
    return await http.post(`/badges/types/${badgeType}/apply?address=${address}&email=${email}`,data)
  }
  export const badgeApplyList = async ( badgeType,pageNo,pageSize ) => {
    return await http.get(`/badges/types/${badgeType}/apply?pageNo=${pageNo}&pageSize=${pageSize}`)
  }