import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Backdrop, CircularProgress } from "@mui/material";
import moment from 'moment';
import { BREAKPOINTS } from 'theme';

import CollectionModal from './CollectionModal';
import PushModal from './PushModal'
import { useActiveWeb3React } from "../../web3";
import { saveCollection, queryCollectionDetail, useOwnerCollectionList } from "../../services/createNFTManage"
import { chainTxtObj, chainTypeComImgObj } from "utils/networkConnect"
import eth from "assets/img/chain/com_eth.svg"
import bg from 'assets/img/explore_bg.svg'
import styled from 'styled-components/macro';
import { useNeedSign } from 'hooks/account';
import NoData from "../../components/NoData";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  boxShadow: 24,
  padding: '20px 24px'
};
const NftManage = styled.div`
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 24px;
  }
`
const ManageHeader = styled.div`
  display: flex;
  align-items: flex-end;
   @media screen and (max-width: ${BREAKPOINTS.md}px) {
    flex-direction: column;
    align-items: stretch;
  }
`
const Title = styled.div`
  font-size: 48px;
  font-weight: 600;
`
const Status = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 28px;
  color: #7A9283;
`
const StatusItem = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-around;
  line-height: 28px;
  color: ${props => props.active ? '#A5FFBE' : '#7A9283'};
  cursor: pointer;
`
const ManageMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
`
const CardCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  min-width: 250px;
  height: 256px;
  margin-right: 1%;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    margin-right: 0;
  }
`
const IconCreate = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #A5FFBE;
  border-radius: 50%;
  color: #111211;
  font-size: 36px;
`
const CardItem = styled.div`
  width: 24%;
  min-width: 250px;
  height: 256px;
  margin-right: 1%;
  margin-bottom: 10px;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid var(--line-color-2, #4B5954);
  background: var(--card-color, #242926);
  cursor: pointer;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    margin-right: 0;
  }
`
const ItemDes = styled.div`
  height: 60px;
`
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.40);
`
const ColorGreenLight = styled.span`
  color: #7A9283;
`
const ColorGreenLightImg = styled(ColorGreenLight)`
  width: 76px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 38px;
  }
`
const ColorGreenLightH5 = styled(ColorGreenLight)`
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const ListHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  padding: 0 10px;
  line-height: 32px;
  background: #111211;
  border-radius: 10px;
`
const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
`
const ColH5 = styled.div`
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const ImgBox = styled.div`
  width: 76px;
  height: 76px;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 6px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 38px !important;
    height: 38px;
  }
`
const NoDataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
`

export default function NFTManage() {
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const [activeStatus, setActiveStatus] = useState('draft')
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(100)
  const [refreshList, setRefreshList] = useState(1)
  const { list, total } = useOwnerCollectionList(pageNo, pageSize, setLoading, activeStatus, refreshList)
  const [collectionId, setCollectionId] = useState()
  const { needSign } = useNeedSign()

  const changeStatus = (type) => {
    setActiveStatus(type)
  }
  const openModal = () => {
    needSign(() => {
      setVisible(true)
    })
  }
  const handleCancel = (refresh) => {
    console.log(refresh);
    
    setVisible(false)
    if(refresh){
      let a = refreshList + 1
      setRefreshList(a)
    }
  }
  const handleCancel2 = (refresh) => {
    setVisible2(false)
    if(refresh){
      let a = refreshList + 1
      setRefreshList(a)
    }
  }
  const openPush = (event, id) => {
    event.stopPropagation()
    setVisible2(true)
    setCollectionId(id)
  }
  const goToDetail = (collectionId) => {
    history.push(`/collectionManage/${collectionId}`)
  }
  const handleCloseLoading = () => {
    setLoading(false)
  }
  const goToCollection = (collectionId) => {
    history.push(`/collectionDetail/${collectionId}`)
  }
  useEffect(() => {
    if(!account){
      needSign()
    }
  },[])

  return (
    <>
      <NftManage>
        <ManageHeader>
          <Title className='f1'>Dashboard</Title>
          <Status className='f2'>
            <StatusItem active={activeStatus === 'draft'} onClick={() => { changeStatus('draft') }}>Draft</StatusItem>
            <StatusItem active={activeStatus === 'soon'} onClick={() => { changeStatus('soon') }}>Scheduled</StatusItem>
            <StatusItem active={activeStatus === 'active'} onClick={() => { changeStatus('active') }}>Ongoing</StatusItem>
            <StatusItem active={activeStatus === 'ended'} onClick={() => { changeStatus('ended') }}>Completed</StatusItem>
          </Status>
          <div className='f1'>&nbsp;</div>
        </ManageHeader>
        {
          activeStatus === 'draft' && 
          <ManageMain>
            <CardCreate onClick={openModal}>
              <IconCreate>+</IconCreate>
              <div className='c_green mt20 fs18'>Create a Collection</div>
            </CardCreate>
            {
              !loading && list.map(item => (
                <CardItem onClick={() => { goToDetail(item.id) }}>
                  <div className='c_green fs20 text_hidden_1'>{item.name}</div>
                  <ItemDes className='lh20 mt10 text_hidden_3'>{item.description ? item.description : '--'}</ItemDes>
                  <ItemInfo>
                    {/* <div><span className='c_green'>{item.typeCount}</span><ColorGreenLight className={`pl4`}>NFTs</ColorGreenLight></div> */}
                    <div><ColorGreenLight>Total supply</ColorGreenLight><span className='pl4 c_green'>{item.maxCount}</span></div>
                  </ItemInfo>
                  <Button disabled={item.maxCount == 0 || !item.allNftHaveImage} className='wp100 h40 btn_themeColor' onClick={($event) => { openPush($event, item.id) }}>Launch</Button>
                </CardItem>
              ))
            }
          </ManageMain>
        }
        {
          activeStatus != 'draft' &&
          <div className='mt40'>
            <ListHeader>
              <ColorGreenLightImg></ColorGreenLightImg>
              <ColorGreenLight className='f3 tal pl10'>Name</ColorGreenLight>
              <ColorGreenLightH5 className='f1 '>Network</ColorGreenLightH5>
              <ColorGreenLight className='f1 '>Minted</ColorGreenLight>
              <ColorGreenLightH5 className='f2 tal'>Start at</ColorGreenLightH5>
            </ListHeader>
            {
              list.length > 0 && list.map(item => (
                <ListItem onClick={()=>{goToCollection(item.id)}}>
                  <ImgBox>
                    <img src={item.image}></img>
                  </ImgBox>
                  <div className='f3 c_green pl10'>{item.name}</div>
                  <ColH5 className='f1 df_align_center'><img className='mr8' width={24} src={chainTypeComImgObj[item.chainType]}></img>{chainTxtObj[item.chainType]}</ColH5>
                  <div className='f1'>{item.mintedCount} /{item.maxCount}</div>
                  <ColH5 className='f2'>{moment(item.mintStartTime).format('MM/DD/YYYY HH:mm')}</ColH5>
                </ListItem>
              ))
            }
            {
              list.length === 0 &&
              <NoDataBox>
                <NoData></NoData>
              </NoDataBox>
            }
          </div>
        }
      </NftManage>
      <CollectionModal visible={visible} closeModal={handleCancel} collectionInfo={false}></CollectionModal>
      <PushModal visiblePush={visible2} closePushModal={handleCancel2} collectionId={collectionId}></PushModal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
