import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Snackbar from "components/SnackMessage"
import copy from 'copy-to-clipboard';
import { BREAKPOINTS } from 'theme';

import { queryNFTDetail, useOwnerNFTTypesList } from 'services/createNFTManage'
import { mainContext } from "../../reducer";
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
// import { chainFun } from "../../utils/networkConnect"
import test2 from 'assets/img/test/test2.png'
import { abbrTxHash } from "../../utils/format";
import { chainTxtObj, chainTypeComImgObj, chainFun, handleHistoryAddress } from '../../utils/networkConnect';
import { getChainType } from "../../web3/address";
import { freeMintNFT721 } from "utils/handleContract"
import { getPoolLeftTime } from "utils/time"
import styled from 'styled-components/macro';
import bg from 'assets/img/explore_bg.svg';
import copyIcon from "assets/img/header/copy.svg";
import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  HANDLE_SHOW_CONNECT_MODAL,
  waitingForConfirm,
} from "../../const";
import moment from 'moment';

const NFTInfo = styled.div`
  padding: 120px 80px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 24px;
  }
`
const InfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    flex-direction: column;
  }
`
const MainF1 = styled.div`
  flex: 1;
  width: 100%;
`
const InfoCover = styled.div`
  margin-right: 26px;
  padding: 24px;
  background: #111211;
  border: 1px solid #4B5954;
  border-radius: 20px;
  overflow: hidden;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`
const PropertiesInfo = styled.div`
  padding: 25px 30px;
  margin-top: 10px;
  margin-right: 26px;
  background: #111211;
  border: 1px solid #4B5954;
  border-radius: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`
const CoverBox = styled.div`
  position: relative;
  height: 0px;
  padding-bottom: 100%;
`
const Cover = styled.div`
  inset: 0px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size: cover;
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    border-radius: 10px;
  }
`
const BaseInfo = styled.div`
  padding: 25px 30px;
  margin-bottom: 30px;
  background: #111211;
  border: 1px solid #4B5954;
  border-radius: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 10px;
  }
`
const NFTName = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 42px;
`
const NFTDes = styled.div`
  font-size: 16px;
  line-height: 24px;
`
const CollectionDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`
const ChainDiv = styled.div`
  width: 1px;
  margin: 0 24px;
  background: #4B5954;
`
const WhiteSpace = styled.div`
  white-space: nowrap;
`
const MintBox = styled.div`
  margin-top: 40px;
  text-align: right;
  button {
    border: none;
  }
`
const ContractionInfo = styled.div`
  padding: 25px 30px;
  margin-bottom: 30px;
  background: #111211;
  border: 1px solid #4B5954;
  border-radius: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 10px;
  }
`
const ContractItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px 24px;
  background: #1B1F1C;
  border-radius: 8px;
`
const ColorGreenLight = styled.span`
  color: #7A9283;
`
const LinkAddress = styled.a`
  text-decoration: none;
`

export default function NFTDetail() {
  const { state, dispatch } = useContext(mainContext);
  const { library, account, active, chainId } = useActiveWeb3React()
  const { chainType, contractAddress, tokenId } = useParams<any>()
  const { needSign } = useNeedSign();
  // const { collectionId } = useParams<any>()
  const [detailInfo, setDetailInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')

  const beforeMint = () => {
    needSign()
    if (detailInfo.chainType !== getChainType(chainId)) {
      if (chainFun[detailInfo.chainType]) {
        chainFun[detailInfo.chainType]()
      }
      return false
    }
    return true
  }
  const freeMint = async () => {
    if (!beforeMint()) return false
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: waitingForConfirm
    });
    await freeMintNFT721(library, account, detailInfo.contractAddress, {
      _onTranscationHash: (hash) => {
      },
      _onReceipt: async (receipt) => {
        console.log(receipt);
        dispatch({
          type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
          showWaitingWalletConfirmModal: { show: false }
        });
      },
      _onError: (err) => {
        dispatch({
          type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
          showWaitingWalletConfirmModal: { show: false }
        });
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
      }
    })
  }
  const queryDetailInfo = async () => {
    await queryNFTDetail(chainType, contractAddress, tokenId).then(res => {
      setDetailInfo(res)
    })
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
    if (status === 'soon') {
      return `${moment(data.mintStartTime).format('DD MMMM HH:mm a')}`
    } else {
      return formatTime(data.mintEndTime)
    }
  }
  const handleCopy = () => {
    copy(detailInfo.contractAddress);
    initMsg('Copied!', 'success')
  }
  const initMsg = (msg, status) => {
    setMsg(msg)
    setSeverity(status)
    setIsSnackbarOpen(true)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  useEffect(() => {
    queryDetailInfo()
  }, [chainType])
  return (
    <>

      <NFTInfo>
        <InfoMain>
          <MainF1 className={`f1 `}>
            <InfoCover >
              <CoverBox>
                <Cover>
                  <img src={detailInfo.image}></img>
                </Cover>
              </CoverBox>
              {/* <img src={detailInfo.image}></img> */}
            </InfoCover>
            <PropertiesInfo>
              <div>Properties</div>
              {
                detailInfo?.attributes?.map((item, index) => (
                  <ContractItem key={index}>
                    <div>
                      <ColorGreenLight className='lh28'>{item.name}</ColorGreenLight>
                      <span className='lh28 pl10'>{item.value}</span>
                    </div>
                    <span className='c_green'>{item.rarity}%</span>
                  </ContractItem>
                ))
              }
            </PropertiesInfo>
          </MainF1>
          <MainF1 className={`f1`}>
            <BaseInfo>
              <NFTName className={`c_green mt10 text_hidden_1`}>{detailInfo.name}</NFTName>
              <CollectionDiv>
                <div className='df'>
                  <div className='pr10 w200'>Collection</div>
                  <div className='c_green text_hidden_1'>{detailInfo.collectionName}</div>
                </div>
                <ChainDiv>&nbsp;</ChainDiv>
                <div className='df_align_center'>
                  <span className='pr10'>Network</span>
                  <img width={20} src={chainTypeComImgObj[detailInfo.chainType]}></img>
                  <WhiteSpace className='c_green pl10'>{chainTxtObj[detailInfo.chainType]}</WhiteSpace>
                </div>
              </CollectionDiv>
              <NFTDes className='mb10'>{detailInfo.description}</NFTDes>
            </BaseInfo>
            <ContractionInfo>
              <div>Contract Details</div>
              <ContractItem>
                <span className='lh28'>Release Date</span>
                <span className='c_green'>{moment(detailInfo.mintStartTime).format('MM/DD/YYYY HH:mm')}</span>
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Blockchain</span>
                <span className='c_green'>{chainTxtObj[detailInfo.chainType]}</span>
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Contract Address</span>
                <div className='df_align_center'>
                  <LinkAddress className={`c_green`} target="_blank" href={handleHistoryAddress(detailInfo.chainType, detailInfo.contractAddress)}>{abbrTxHash(detailInfo.contractAddress)}
                  </LinkAddress>
                  <img className='pl8 cp' src={copyIcon} onClick={handleCopy}></img>
                </div>
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Token ID</span>
                <span className='c_green'>{detailInfo.id}</span>
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Token Standard</span>
                <span className='c_green'>ERC-721</span>
              </ContractItem>
            </ContractionInfo>
          </MainF1>
        </InfoMain>
      </NFTInfo>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>

    </>
  )
}
