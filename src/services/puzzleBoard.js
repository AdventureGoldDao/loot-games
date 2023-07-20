import { getChainId } from '../web3/address';
import http from '../utils/http';


export const getSpliceList = async (library,account) => {
  console.log(library);
  console.log(account);
  try {
    const res = await http.get(`/puzzles/detail?project=sandbox`);
    return res
  } catch (e) {
    console.log('fetch owner list error')
  }
}
export const fetchTokenInfo = async (contractAddress, tokenId, chainType) => {
  try {
    const chainId = getChainId(chainType)
    const res = await http.get(`/tokens/${chainId}/${contractAddress}/${tokenId}`);
    console.log(res);
    // result.real_owner = result.owner.address
    return res
  } catch (e) {
    console.log('fetch token info error')
  }
}
export const fetchTokensList = async (pageNo, pageSize,tokenAddress, type) =>{
  try {
    let url = `/tokens?pageNo=${pageNo}&pageSize=${pageSize}&collection=${type}&tokenAddress=${tokenAddress}`
    const res = await http.get(url);
    return  res
  } catch (e) {
    console.log('fetch artist error')
  }
}