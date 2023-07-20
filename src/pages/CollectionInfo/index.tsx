import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Backdrop, CircularProgress, Popover,Typography } from "@mui/material";
import Snackbar from "components/SnackMessage"
import copy from 'copy-to-clipboard';
import { BREAKPOINTS } from 'theme';

import { queryCollectionDetail, getMetadataList } from 'services/createNFTManage'
import { mainContext } from "../../reducer";
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
import { abbrTxHash } from "../../utils/format";
import { chainTxtObj, chainFun, handleHistoryAddress } from '../../utils/networkConnect';
import { getChainType } from "../../web3/address";
import { freeMintNFT721 } from "utils/handleContract"
import styled from 'styled-components/macro';
import bg from 'assets/img/explore_bg.svg';
import copyIcon from "assets/img/header/copy.svg";

import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  HANDLE_SHOW_TRANSACTION_MODAL,
  waitingForConfirm,
} from "../../const";
import moment from 'moment';

const CollectionInfo = styled.div`
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
const TypesBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 26px;
  padding: 24px 19px;
  border-radius: 20px;
  border: 1px solid var(--line-color-2, #4B5954);
  background: #111211; 
  overflow: auto;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`
const TypesCover = styled.div`
  width: 25%;
  padding: 0 5px;
  border-radius: 10px;
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
const CollectionName = styled(Typography)`
  font-weight: 600;
  font-size: 40px;
  line-height: 42px;
`
const CollectionDes = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 24px;
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
const LinkAddress = styled.a`
  text-decoration: none;
`

export default function NFTDetail() {
  const { state, dispatch } = useContext(mainContext);
  const { library, account, active, chainId } = useActiveWeb3React()
  const { needSign } = useNeedSign();
  const { collectionId } = useParams<any>()
  const [detailInfo, setDetailInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [mintNum, setMintNum] = useState(0)

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
        dispatch({
          type: HANDLE_SHOW_TRANSACTION_MODAL,
          showTransactionModal: { show: true }
        })
        setMintNum(mintNum + 1)
        // queryDetailInfo()
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
    await queryCollectionDetail(collectionId).then(res => {
      setDetailInfo(res)
      /* @ts-expect-error */
      setMintNum(res.mintedCount)
      /* @ts-expect-error */
      setList(res.sampleNfts || [])
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
      return `${days}d ${hours}h`;
    } else if (timeDiff >= oneHour) {
      const hours = Math.floor(timeDiff / oneHour);
      const minutes = Math.floor((timeDiff % oneHour) / oneMinute);
      return `${hours}h ${minutes}m`;
    } else if (timeDiff >= oneMinute) {
      const minutes = Math.floor(timeDiff / oneMinute);
      return `${minutes}m`;
    } else {
      return 'Less than 1min';
    }
  }
  const countStaus = (status, data) => {
    if (status === 'soon') {
      return `${moment(data.mintStartTime).format('DD MMMM HH:mm a')}`
    } else if (status === 'active') {
      return formatTime(data.mintEndTime)
    } else if (status === 'ended') {
      return `${moment(data.mintEndTime).format('YYYY/MM/DD HH:mm')}`
    }
  }
  const handleCloseLoading = () => {
    setLoading(false)
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    queryDetailInfo()
  }, [collectionId])
  return (
    <>
      <CollectionInfo>
        <InfoMain>
          <MainF1 className={`f1 `}>
            <InfoCover >
              <CoverBox>
                <Cover>
                  <img src={detailInfo.image}></img>
                </Cover>
              </CoverBox>
            </InfoCover>
            <TypesBox>
              {
                list.map(item => (
                  <TypesCover >
                    <CoverBox>
                      <Cover style={{ backgroundImage: `url(${item.image})` }}>
                      </Cover>
                    </CoverBox>
                  </TypesCover>
                ))
              }
            </TypesBox>
          </MainF1>
          <MainF1 className={`f1`}>
            <BaseInfo>
              <CollectionName className={`c_green mt10 text_hidden_1`}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              >{detailInfo.name}
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography className='c_fff' sx={{ p: 1 }}>{detailInfo.name}</Typography>
                </Popover>
              </CollectionName>
              <CollectionDes>{detailInfo.description}</CollectionDes>
              <div className='df_h5 mt30'>
                <div className='f3 mt10'>
                  <div>{detailInfo.status === 'soon' ? 'Start at' : 'Close at'}</div>
                  <div className='c_green fw600 mt10 fs22'>{countStaus(detailInfo?.status, detailInfo)}</div>
                </div>
                <div className='f2 mt10'>
                  <div>Minted</div>
                  <div className='c_green fw600 mt10 fs22'>{mintNum} / {detailInfo.maxCount}</div>
                </div>
                <div className='f2 mt10'>
                  <div>Network</div>
                  <div className='c_green fw600 mt10 fs22'>{chainTxtObj[detailInfo.chainType]}</div>
                </div>
              </div>
              <MintBox>
                <Button disabled={detailInfo.status != 'active' || mintNum === detailInfo.maxCount} className={`w200_h5 h40 btn_multicolour`} onClick={freeMint}>Free Mint</Button>
              </MintBox>
            </BaseInfo>
            <ContractionInfo>
              <div>Contract Details</div>
              <ContractItem>
                <span className='lh28'>Release Date</span>
                <span className='c_green'>{moment(detailInfo.mintStartTime).format('MM/DD/YYYY HH:mm')}</span>
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Per-wallet Mint Limit</span>
                <span className='c_green'>{detailInfo.maxCountPerAddress}</span>
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
                {/* <span className='c_green'>{abbrTxHash(detailInfo.contractAddress)}</span> */}
              </ContractItem>
              <ContractItem>
                <span className='lh28'>Token Standard</span>
                <span className='c_green'>ERC-721</span>
              </ContractItem>
            </ContractionInfo>
          </MainF1>
        </InfoMain>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleCloseLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </CollectionInfo>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
    </>

  )
}
