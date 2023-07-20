import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Modal, Box, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import Snackbar from "components/SnackMessage"
import DeploySuccessModal from "../DeploySuccessModal"
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../../web3";
import { publishCollection, queryCollectionDetail } from "../../../services/createNFTManage"
import { deployFreeMintNFT721 } from "utils/handleContract"
import { chainArr, chainFun } from 'utils/networkConnect';
import { getChainType } from 'web3/address';
import { mainContext } from "../../../reducer";
import styled from 'styled-components/macro';
import { HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL, launchForConfirm } from "const";
import { ReactComponent as CloseIcon } from 'assets/img/icon_close.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  boxShadow: 24,
  padding: '20px 24px'
};
const ColorGreenLight = styled.span`
  display: inline-block;
  color: #7A9283;
`
const TextInput = styled(TextField)`
  margin-top: 10px !important;
  .MuiInputLabel-root {
    color: #7A9283 !important;
  }
  .MuiInput-input {
    /* margin-top: 8px; */
    padding: 18px;
    border: none;
    border-radius: 8px;
    background: #242926;
    color: #7A9283;
  }
`
const BlackBox = styled.div<{ isDate: boolean }>`
  /* height: 86px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  padding: ${props => props.isDate ? '20px 10px 10px' : '10px 20px'};
  border-radius: 8px;
  background: #242926;
  .MuiTypography-root, .MuiInputLabel-root {
    color: #7A9283 !important;
    font-family: 'Inconsolata', 'Bai Jamjuree', sans-serif, Poppins;
  }
  .MuiInputBase-input {
    color: #A5FFBE;
    font-family: 'Inconsolata', 'Bai Jamjuree', sans-serif, Poppins;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiSvgIcon-root {
    fill: #4B5954;
  }
`
const BlackBoxChain = styled(BlackBox) <{ activeChain: boolean }>`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: ${props => props.activeChain ? '1px solid #A5FFBE' : 'none'};
`
const ImgBox = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`
export default function CollectionModal({ visiblePush = false, closePushModal, collectionId }) {
  const { library, account, chainId } = useActiveWeb3React()
  const { dispatch } = useContext(mainContext);
  const history = useHistory()
  const { needSign } = useNeedSign();
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [selectChainType, setSelectChainType] = useState(chainArr[1].value)
  const [mintLimit, setMintLimit] = useState(null)
  const [publishForm, setPublishForm] = useState<any>({});
  const [severity, setSeverity] = useState('success')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)

  const handleCancel = (refresh) => {
    closePushModal(refresh)
  }
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^[1-9][0-9]*$/.test(inputValue) || inputValue === '') {
      setMintLimit(inputValue);
    }else {
      setMintLimit('');

    }
  };

  const beforeDeploy = () => {
    needSign()
    if (selectChainType !== getChainType(chainId)) {
      if (chainFun[selectChainType]) {
        chainFun[selectChainType]()
      }
      return false
    }
    return true
  }

  const handelSubmit = async () => {
    // @ts-ignore
    if (!beforeDeploy()) return false

    if (!startTime) {
      initMsg("start time is required", 'error')
      return false
    }
    if (!endTime) {
      initMsg("End time is required", 'error')
      return false
    }
    if (!mintLimit) {
      initMsg("Pre-wallet mint limit is required", 'error')
      return false
    }
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: launchForConfirm
    })

    let mintStartTime = startTime.valueOf()
    let mintEndTime = endTime.valueOf()
    let userLimit = mintLimit
    let acceptCurrency = '0x0000000000000000000000000000000000000000'
    let mintPrice = 0
    // @ts-ignore
    let res = await deployFreeMintNFT721(library, account, publishForm.name, publishForm.tokenSymbol, selectChainType, publishForm.maxCount, parseInt(mintStartTime / 1000), parseInt(mintEndTime / 1000), userLimit, acceptCurrency, mintPrice)
    // console.log(res);
    pushcollection(mintStartTime, mintEndTime, selectChainType, res)

  }
  const pushcollection = async (mintStartTime, mintEndTime, chainType, contractInfo) => {
    let res = await publishCollection(collectionId, mintStartTime, mintEndTime, chainType, contractInfo.address, contractInfo.transactionHash, contractInfo.blockNumber, mintLimit)
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: { show: false }
    })
    setVisible(true)
  }
  const closeDep = () => {
    setVisible(false)
    viewCollection()
  }
  const viewCollection = () => {
    history.push(`/collectionDetail/${collectionId}`)
  }
  const initMsg = (msg, status) => {
    setMsg(msg)
    setSeverity(status)
    setIsSnackbarOpen(true)
  }
  const queryInfo = async (collectionId) => {
    let res = await queryCollectionDetail(collectionId)
    setPublishForm(res)
  }
  const selectChain = (type) => {
    setSelectChainType(type)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  const handleStartDateChange = (date) => {
    const currentDate = dayjs();
    if (date.isAfter(currentDate)) {
      setStartTime(date);
    }else {
      setStartTime(currentDate)
    }
  }
  const handleEndDateChange = (date) => {
    const currentDate = dayjs();
    if (date.isAfter(currentDate)) {
      setEndTime(date);
    }else {
      setEndTime(currentDate)
    }
  }

  useEffect(() => {
    collectionId && queryInfo(collectionId)
  }, [collectionId])

  return (
    <>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
      <Modal
        open={visiblePush}
        onClose={() => { handleCancel(false) }}
      >
        <Box sx={{ ...style }}>
          <div className='space-between-center'>
            Deploy & Push
            <CloseIcon onClick={() => { handleCancel(false) }} className='cp'></CloseIcon>
          </div>
          <BlackBox isDate={false} >
            <ColorGreenLight className='lh28'>Collection name</ColorGreenLight>
            <div className='c_green fs20 lh24 mb10'>{publishForm.name}</div>
          </BlackBox>
          <div className='df mb14'>
            {/* <BlackBox isDate={false} className='mr6 f1'>
              <ColorGreenLight className='lh28'>NFTs</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>{publishForm.maxCount}</div>
            </BlackBox> */}
            <BlackBox isDate={false} className='f1'>
              <ColorGreenLight className='lh28'>Total supply</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>{publishForm.maxCount}</div>
            </BlackBox>
          </div>
          <ColorGreenLight className='lh24 mt20'>Select a network to deploy your collection. </ColorGreenLight>
          <div className='df'>
            {
              chainArr.map((item, index) => (
                <BlackBoxChain isDate={false} className='mr6 f1 df cp' activeChain={selectChainType === item.value} onClick={() => { selectChain(item.value) }}>
                  <ImgBox src={item.icon}></ImgBox>
                  <div className='ml10 df_align_center'>
                    {/* <div className='mb6'>{item.name}</div> */}
                    {item.name}
                    {/* <ColorGreenLight className='fs12'>Balance: 300 AGLD</ColorGreenLight> */}
                  </div>
                </BlackBoxChain>
              ))
            }
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={'df'} >
              <BlackBox isDate={true} className='mr6 p10'>
                <DateTimePicker label={'Start Time'} ampm={false}
                  value={startTime}
                  format='MM/DD/YYYY HH:mm'
                  onChange={handleStartDateChange}
                />
              </BlackBox>
              <BlackBox isDate={true}>
                <DateTimePicker label={'End Time'} ampm={false}
                  value={endTime}
                  format='MM/DD/YYYY HH:mm'
                  onChange={handleEndDateChange}
                />
              </BlackBox>
            </div>
          </LocalizationProvider>
          <BlackBox isDate={false}>
            <TextInput fullWidth id="collection-name-1" label="Per-wallet Mint Limit" name={'mintLimit'}
              placeholder={``}
              value={mintLimit}
              onChange={handleChange}
              variant="standard"
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                pattern: '[0-9]*',
                inputMode: 'numeric',
              }}
            />
          </BlackBox>
          <div className='mt20 mb20'>
            <Button className='wp100 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>Confirm</Button>
          </div>
        </Box>
      </Modal>
      <DeploySuccessModal visible={visible} closeDep={closeDep} viewCollection={viewCollection}></DeploySuccessModal>
    </>
  )
}
