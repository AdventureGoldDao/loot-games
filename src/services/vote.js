import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import axios from 'axios'

import http from '../utils/http';
import { getContract, useActiveWeb3React } from "../web3";
// import { getVoteAddress } from "../web3/address.js";
import DeFineDAO from "../web3/abi/DeFineDAO.json";
import DeFineProposal from "../web3/abi/DeFineVotingPortal.json";
import DeFineCommonProposal from "../web3/abi/DeFinePortalV3.json";
import DeFineVotingProposal from "../web3/abi/DeFineVotingPortalV2.json";
import DeFineVotingProposalNew from "../web3/abi/DeFineVotingPortalV2New.json";
import DeFineContractProposal from "../web3/abi/DeFineVotingPortalV3.json";

let currentAddress = '';
let currentStatus = '';
let baseOffChainNum = 37
let baseOnChainNum = 25

export const useVoteList = (setLoading,refresh,contractAddress,status) => {
    const [voteList, setVoteList] = useState([])
    const { library, account, chainId } = useActiveWeb3React()
    const ProposalState =  [
        'Pending',
        'Active',
        'Canceled',
        'Defeated',
        'Succeeded',
        'Queued',
        'Expired',
        'Executed'
    ]
    const proposalsState = [
        {s:'soon', t: 'Review'},
        {s:'voting', t:'Active'},
        {s:'canceled',t: 'Canceled'},
        {s:'failed',t:'Failed'},
        {s:'passed',t:'Passed'},
        {s:'queued',t:'Queued'},
        {s:'expired',t:'Expired'},
        {s:'executed',t:'Executed'}
    ]
    const proposalAbi = {
      '0xd971c877bd66f0438511fe771c8eaa5ea273576d':DeFineDAO,//sip old
      '0x506a5dcf47a27f6a48a23512afa6b32b0f612ce7':DeFineDAO,//sip old
      '0x09e5b8821869dd8ddd8d704f4271ec4c8edc9abe':DeFineProposal,//sip new dev
      '0xab8e8d9bb650a0c3f91bac1357f90d5efab0d5f7':DeFineProposal,//sip new pro
      '0x1e2a9456e5f6b63b6b55232010b9ae9dcf22caaf':DeFineCommonProposal,//sip new pro 2
      '0xfdabe319f98db4a45c8c56e8cf66e4a41673ee8a':DeFineVotingProposal,//dip dev
      '0x8a1bc81d1ea6e6072f565b825dad9dd993e68ebc':DeFineVotingProposalNew,//dip new dev
      '0x9b1ddf053136bc9710c81a2a89162b9fa0a2640d':DeFineVotingProposal,// dip pro
      '0x63124ff062881888b6fbc348e5932f74b7cf3aa0':DeFineContractProposal,// dip pro 2
      '0xb298128923edc08f5542e9db66e2515192c56a4b':DeFineCommonProposal,//sip new new dev
      '0x0cc1cbe4cde1ebbe7789e95a50ef297beb2da413':DeFineContractProposal,//dip new new dev
    }
    

    const getVoteStatus = async (id,contractAddress,chainType) => {
        let res = await getContract('', proposalAbi[contractAddress].abi, contractAddress,chainType).methods.proposals(id).call()
        let state = await getContract('', proposalAbi[contractAddress].abi, contractAddress,chainType).methods.state(id).call()
        if (res.executed) {
            return proposalsState[7]
        }else {
            return proposalsState[state]
        }
    }
    const proposalSip = {
      '0xd971c877bd66f0438511fe771c8eaa5ea273576d':'SIP',//sip dev
      '0x506a5dcf47a27f6a48a23512afa6b32b0f612ce7':'SIP',//sip pro
      '0x09e5b8821869dd8ddd8d704f4271ec4c8edc9abe':'SIP',//sip new dev
      '0xab8e8d9bb650a0c3f91bac1357f90d5efab0d5f7':'SIP',//sip new pro
      '0x1e2a9456e5f6b63b6b55232010b9ae9dcf22caaf':'SIP',//sip new pro 2
      '0xfdabe319f98db4a45c8c56e8cf66e4a41673ee8a':'DIP',//dip dev
      '0x8a1bc81d1ea6e6072f565b825dad9dd993e68ebc':'DIP',//dip new dev
      '0x9b1ddf053136bc9710c81a2a89162b9fa0a2640d':'DIP',//dip pro
      '0x63124ff062881888b6fbc348e5932f74b7cf3aa0':'DIP',//dip pro
      '0xb298128923edc08f5542e9db66e2515192c56a4b':'SIP',//sip new new dev
      '0x0cc1cbe4cde1ebbe7789e95a50ef297beb2da413':'DIP',//dip new new dev
    }
    const proposalSipBase = {
      '0xd971c877bd66f0438511fe771c8eaa5ea273576d':0,//sip old
      '0x506a5dcf47a27f6a48a23512afa6b32b0f612ce7':0,//sip old
      '0x09e5b8821869dd8ddd8d704f4271ec4c8edc9abe':37,//sip new dev
      '0xab8e8d9bb650a0c3f91bac1357f90d5efab0d5f7':18,//sip new pro
      '0x1e2a9456e5f6b63b6b55232010b9ae9dcf22caaf':34,//sip new pro 2
      '0xfdabe319f98db4a45c8c56e8cf66e4a41673ee8a':0, //dip dev
      '0x8a1bc81d1ea6e6072f565b825dad9dd993e68ebc':27,//dip new dev
      '0x9b1ddf053136bc9710c81a2a89162b9fa0a2640d':0,//dip pro
      '0x63124ff062881888b6fbc348e5932f74b7cf3aa0':3,//dip pro
      '0xb298128923edc08f5542e9db66e2515192c56a4b':46,//sip new new dev
      '0x0cc1cbe4cde1ebbe7789e95a50ef297beb2da413':40,//dip new new dev
    }
    const addSip = (id,contractAddress) => {
      let sip = proposalSip[contractAddress]
      let num = id + proposalSipBase[contractAddress]
      if(num<10){
        sip += ('00'+num)
      }
      if(num>9&&num<100){
        sip += ('0'+num)
      }
      return sip
    }

    const fetchproposalList = async () => {
        try {
            setVoteList([])
            setLoading(true)
            const res = await http.get(`/votes/proposals?contractAddress=${contractAddress}&status=${status}`);
            if (currentAddress !== contractAddress) {
              return false
            }
            if (currentStatus!== status) {
              return false
            }
            res.length > 0 && res.forEach(async (item, index) => {
                item.sip = addSip(item.id,item.contractAddress)
                item.statusObj = await getVoteStatus(item.id,item.contractAddress,item.chainType)
                if (currentAddress !== contractAddress) {
                  return false
                }
                if (currentStatus!== status) {
                  return false
                }
                setVoteList(prevState => {
                    const arr = [...prevState];
                    arr[index] = item
                    return arr
                });
            })
            setTimeout(() => {
              setLoading(false)
            },1500)
            return res
        } catch (e) {
            console.log('fetch owner list error')
        }
    }
    useEffect(() => {
        currentAddress = contractAddress
        currentStatus = status
        fetchproposalList()
    }, [refresh,contractAddress,status])

    return { voteList }
}

export const fetchproposalInfo = async ( { chainType, contractAddress, id } ) => {
    try {
      const res = await http.get(`/votes/proposals/${chainType}/${contractAddress}/${id}`);
      return res
    } catch (e) {
      console.log('fetch owner list error')
    }
}

export const fetchpVotedList = async ({chainType, contractAddress, id, pageNo, pageSize,option}) => {
       
    try {
      const res = await http.get(`/votes/proposals/${chainType}/${contractAddress}/${id}/voteRecords?pageNo=${pageNo}&pageSize=${pageSize}&option=${option}`);
      return res
    } catch (e) {
      console.log('fetch owner list error')
    }
  }
export const fetchpClaimInfo = async ({chainType, voteToken, blockNumber,count, library, account}) => {
  try {
    const res = await http.get(`/votes/qualification?chainType=${chainType}&voteToken=${voteToken}&blockNumber=${blockNumber}&count=${count}`);
    return res
  } catch (e) {
    console.log('fetch owner list error')
  }
}
export const fetchPerposalHistory = async ({chainType, contractAddress, id}) => {
   
  try {
    const res = await http.get(`/votes/proposals/${chainType}/${contractAddress}/${id}/history`);
    return res
  } catch (e) {
    console.log('fetch list error')
  }
}

export const queryDfaPrice = async (symbol) => {
  try {
    const res = await http.get(`/cmc/cryptocurrency/quotes/latest?symbol=${symbol}`)
    return res
  } catch (error) {
    
  }
}
