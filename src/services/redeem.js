import http from '../utils/http';


export const fetchOwnerList = async (url) => {

  try {
    const res = await http.get(`${url}`);
    return res
  } catch (e) {
    console.log('fetch owner list error')
  }
}
export const getRedeemList = async (project) => {
  try {
    const data = await fetchOwnerList(`/warrants/unredeemed?project=${project}`);
    return data
  } catch (e) {
    console.log('query owner list error', e)
  }
}

export const getRedeemHistoryList = async (current, pageSize,project) => {
  let data = {};
  try {
    const res = await fetchOwnerList(`/warrants/redeemed?project=${project}&pageNo=${current}&pageSize=${pageSize}`);
    if (res.list) {
      data = res
    }
  } catch (e) {
    console.log('query owner list error', e)
  }

  return data;
}
