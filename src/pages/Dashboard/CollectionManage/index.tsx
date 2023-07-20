import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Button, Modal, Box, TextField, Switch, Pagination } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import CollectionModal from '../CollectionModal';
import PushModal from '../PushModal';
import DeleteModal from '../DeleteModal';
import Snackbar from "components/SnackMessage"
import { useActiveWeb3React } from '../../../web3';
import {
  delCollection, queryCollectionDetail, saveNFT, putNftImg, getOneMetadata, putOneMetadata,
  useOwnerNFTTypesList, queryNFTTypeDetail, putFullMetadata, getMetadataList, delOneMetadata, delNFT
} from "../../../services/createNFTManage"
import { dataURLtoBlob } from 'utils/dataURLtoBlob';
import { ReactComponent as IconEdit } from "assets/img/nftManage/icon_edit.svg";
import { ReactComponent as IconImg } from "assets/img/nftManage/icon_img.svg";
import { ReactComponent as IconJson } from "assets/img/nftManage/icon_json.svg";
import BadgeCard from 'components/BadgeCard';
import { useBadgeProjectList } from "../../../services/badge"
import bg from 'assets/img/explore_bg.svg'
import styled from 'styled-components/macro';
import { abbrTxHash, formatAmount } from "utils/format";
import { ReactComponent as CloseIcon } from 'assets/img/icon_close.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  boxShadow: 24,
  padding: '20px 24px'
};

const PrimaryTextDiv = styled.div`
  color: #A5FFBE;
`
const ErrorTextDiv = styled.div`
  color: #ff7d7d;
  font-size: 15px;
  text-align: center;
  line-height: 1.2;
  max-width: 380px;
  margin: 20px auto 0;
`
const CollectionManage = styled.div`
  min-height: 100vh;
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
`
const ManageHeader = styled.div`
  padding: 25px 50px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
`
const CollectionItem = styled.div`
  display: flex;
  justify-content: space-between;
`
const CollectionTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`
const CollectionFunc = styled.div`
  min-width: 400px;
`
const BtnMr = styled(Button)`
  margin-right: 10px !important;
  border-radius: 8px;
`
const CollectionDes = styled.div`
  margin-top: 20px;
  line-height: 24px;
  color: var(--font-white, #EBEBEB);
`
const ManageMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px -10px;
`
const CreateBox = styled.div`
  width: 20%;
  padding: 10px;
`
const CreateBoxMian = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
`
const Card = styled.div`
  width: 100%;
  padding-bottom: 100%;
`
const CardMain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const CreateNftBaseBox = styled.div`
  display: flex;
`
const UploadBox = styled.div`
  position: relative;
  flex: 1;
  margin-right: 20px;
  border-radius: 8px;
  background: var(--card-color, #242926);
`
const ShowImg = styled.img`
  position: absolute;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  /* object-fit: cover; */
`
const ColorGreenLight = styled.span`
  color: #7A9283;
`
const UploadInput = styled.input`
  /* width: 100%; */
  display: none;
`
const TextInput = styled(TextField)`
  margin-top: 10px !important;
  .MuiInputLabel-root {
    color: #7A9283 !important;
  }
  .MuiInput-input {
    margin-top: 2px;
    padding: 14px 18px;
    border: none;
    border-radius: 8px;
    background: #242926;
    color: #fff;
  }
`
const SwitchGroup = styled(FormGroup)`
  width: 120px;
  margin-top: 20px;
  margin-bottom: -10px;
  .MuiFormControlLabel-root {
    margin-left: 0px;
  }
  .MuiTypography-root {
    color: #7A9283;
  }
`
const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#A5FFBE',
    '&:hover': {
      // backgroundColor: rgba('#A5FFBE', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#dedede'
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#A5FFBE',
  },
}));
const ArrtList = styled.div`
  /* display: flex; */
  max-height: 160px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`
const ArrtItem = styled.div`
  display: flex;
`
const ItemKey = styled.div`
  flex: 1;
  margin-right: 10px;
`
const ItemVal = styled.div`
  flex: 2;
  display: flex;
  position: relative;
`
const ItemFunc = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #242926;
  position: absolute;
  top: 10px;
  right: 14px;
`
const ItemAdd = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border: 1px solid #4B5954;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #7A9283;
  cursor: pointer;
  &:hover {
    border: 1px solid #A5FFBE;
  }
`
const ItemRemove = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid #4B5954;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #7A9283;
  cursor: pointer;
`
const BulkBody = styled.div`
  border-radius: 20px;
  background: #111211;
  padding: 25px 50px;

  .title {
    color: #FFF;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  .back {
    color: #7A9283;
    font-weight: 600;
    cursor: pointer;
  }
`
const StepBox = styled.div<{ active: boolean }>`
  width: 50%;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 500;

  .step-item {
    border-radius: 10px;
    border: 1px solid ${props => props.active ? '#A5FFBE' : '#4B5954'};
    background: ${props => props.active ? '#1B1F1C' : '#111211'};
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .step-title {
    margin-top: 27px;
    color: '#fff';
  }
`
const DisabledBtn = styled.div`
  font-size: 16px;
  width: 180px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 8px;
  background: #4B5954;
  color: #000;
  cursor: default;
`
const CenterBox = styled.div`
  height: 237px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FileBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
  background: #111211;
`
const ShowBlockImg = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin-right: 7px;
  border-radius: 10px;
  &:last-child {
    margin-right: 0;
  }
`
const ShowBlockDiv = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 7px;
  border-radius: 10px;
  background: #111211;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7A9283;
  font-weight: bold;
`
const BadBox = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #724E4E;
  background: #231D1D;
  color: #FF7D7D;
  padding: 24px 50px;
`
const BadItemBox = styled.div`
  width: 16.66666%;
  padding: 9px;
`
const BadItem = styled.div`
  height: 44px;
  line-height: 42px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #FF7D7D;
  background: #161212;
  cursor: pointer;
`
const BadListBox = styled.div`
  display: flex;
  margin: 11px -9px -9px;
  flex-wrap: wrap;
`

export default function CollectionManageIndex() {
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const { collectionId } = useParams<any>()
  const [collectionInfo, setCollectionInfo] = useState<any>({})
  const chooseImg = useRef(null)
  const [loading, setLoading] = useState(false)
  const [refreshList, setRefreshList] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [list, setList] = useState([])
  const [badList, setBadList] = useState([])
  // const { list, total } = useOwnerNFTTypesList(collectionId, 1, 10, setLoading, refreshList)
  const [visible, setVisible] = useState(false)
  const [visibleNFT, setVisibleNFT] = useState(false)
  const [visiblePush, setVisiblePush] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [nftForm, setNftForm] = useState<any>({})
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditNFT, setIsEditNFT] = useState(false);
  const [contentType, setContentType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [jsonLoading, setJsonLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [jsonUploaded, setJsonUploaded] = useState(false);
  const [jsonName, setJsonName] = useState('');
  const [jsonDataLength, setJsonDataLength] = useState(0);
  const [imgsUploaded, setImgsUploaded] = useState(false);
  const [imgsUploadedNum, setImgsUploadedNum] = useState(0);
  const [imgsAmount, setImgsAmount] = useState(0);
  const [imgsSowArr, setImgsSowArr] = useState([]);
  const [hadImgUpload, setHadImgUpload] = useState(false);
  const [hadJsonUpload, setHadJsonUpload] = useState(false);
  const [visibleJsonReload, setVisibleJsonReload] = useState(false);
  const [visibleDelNFT, setVisibleDelNFT] = useState(false);
  const [jsonError, setJsonError] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [switchCheck, setSwitchCheck] = useState(false)
  const [arrts, setAttrs] = useState([])
  const [needRefresh, setNeedRefresh] = useState(null);
  const [needRefreshTime, setNeedRefreshTime] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('success')

  const openModal = () => {
    // setVisibleNFT(true)
    setContentType('bulk')
  }
  const handleCancel = () => {
    setVisible(false)
    queryInfo()
  }
  const handleCancel2 = () => {
    setVisiblePush(false)
  }
  const handleCancelNFT = () => {
    setVisibleNFT(false)
    setNftForm({})
    // @ts-ignore
    setSelectedImage(null)
    // @ts-ignore
    setAttrs([])
    setSwitchCheck(false)
  }
  const handelDel = () => {
    setVisibleDel(false)
  }
  const openFile = () => {
    chooseImg.current.click()
  }
  const addItem = () => {
    let obj = {
      name: '',
      value: ''
    }
    setAttrs([...arrts, obj])

  }
  const removeItem = (index) => {
    let arr = [...arrts]
    arr.splice(index, 1)
    setAttrs(arr)
  }
  const deleteCollection = async () => {
    let res = await delCollection(collectionId)
    handelDel()
    initMsg("Success!", 'success')
    history.push('/dashboard')
  }
  const openDelModal = () => {
    setVisibleDel(true)
  }
  const openEdit = () => {
    setVisible(true)
  }
  const openDeploy = () => {
    setVisiblePush(true)
  }
  const queryInfo = async () => {
    try {
      let res = await queryCollectionDetail(collectionId)
      setCollectionInfo(res)
      /* @ts-expect-error */
      if (res?.metadataUploaded) {
        setHadJsonUpload(true)
      }
    } catch (error) {
      history.push('/dashboard')
    }
  }
  const changeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNftForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handelSubmit = async () => {
    if (!selectedImage) {
      initMsg("Image is required", 'error')
      return false
    }
    if (!nftForm.name) {
      initMsg("Name is required", 'error')
      return false
    }
    if (!nftForm.description) {
      initMsg("Description is required", 'error')
      return false
    }
    // if (!nftForm.count) {
    //   initMsg("Total Supply is required", 'error')
    //   return false
    // }
    const formData = new FormData()
    let reg = /https:\/\//
    if (selectedImage && !reg.test(selectedImage)) {
      formData.append('image', selectedImage)
      formData.append('imageName', nftForm.imageName)
    }
    formData.append('name', nftForm.name)
    formData.append('description', nftForm.description)
    // formData.append('count', nftForm.count)

    try {
      arrts.map(item => {
        if (!item.name || !item.value) {
          initMsg("Please add properties", 'error')
          throw Error();
        }
      })
    } catch (error) {
      return false
    }
    setLoading(true)
    if (arrts.length > 0) {
      let obj = Object.fromEntries(arrts.map(item => [item.name, item.value]));
      formData.append('attributes', JSON.stringify(obj))
    } else {
      formData.append('attributes', JSON.stringify({}))
    }

    try {
      let res = await putOneMetadata(collectionId, nftForm.nftId, formData)
      initMsg('Success!', 'success')
      handleCancelNFT()
      setLoading(false)
      getNftList(pageNo)
      setNeedRefresh(nftForm.nftId)
      setNeedRefreshTime(Date.now())
    } catch (error) {
      setLoading(false)
      initMsg(error, 'error')
    }
  }
  const initMsg = (msg, status) => {
    setMsg(msg)
    setSeverity(status)
    setIsSnackbarOpen(true)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  const handleChangeArrt = (event, idx, type) => {
    let arr = [...arrts]
    arr[idx][type] = event.target.value
    setAttrs(arr)
  }
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setAttrs([])
      setSwitchCheck(false)
    } else {
      setAttrs([{
        name: '',
        value: ''
      }])
      setSwitchCheck(true)
    }
  }
  const openNFTEdit = (item) => {
    setVisibleNFT(true)
    setIsEditNFT(true)
    queryNFTDetail(item.collectionId, item.nftId)
  }
  const queryNFTDetail = async (collectionId, nftId) => {
    let res = await getOneMetadata(collectionId, nftId)
    setNftForm(res)
    // @ts-ignore
    setSelectedImage(res.image)
    // @ts-ignore
    if (!res.attributes) {
      setSwitchCheck(false)
      setAttrs([])
    } else {
      setSwitchCheck(true)
      // @ts-ignore
      setAttrs(res.attributes)
    }
  }

  const uploadJson = (e) => {
    const fileText = e.target.files[0];
    if (!fileText) {
      return;
    }

    setJsonLoading(true)
    let reader = new FileReader();
    reader.onload = () => {
      /* @ts-expect-error */
      const content = JSON.parse(reader.result);
      setJsonName(fileText.name)
      if (content.collection && content.collection.length > 0) {
        setJsonError(false)
        setJsonDataLength(content.collection.length);

        const formData = new FormData()
        formData.append('metadata', fileText)
        putFullMetadata(collectionId, formData).then(res => {
          if (res) {
            setMsg('success')
            setSeverity('success')
            setIsSnackbarOpen(true)
            setJsonLoading(false)
            setJsonUploaded(true)
            setCurrentStep(2)
            setImgsUploaded(false)
          }
        })
      } else {
        setJsonError(true)
        setJsonLoading(false)
      }
    }

    reader.readAsText(fileText, "UTF-8");
  }
  const uploadImgs = (e) => {
    let imgs = [...e.target.files]
    imgs = imgs.filter(item => {
      if (item.size < 10 * 1024 * 1024) {
        return /^image/.test(item.type)
      }
    });

    setImgsAmount(imgs.length)
    setImgLoading(true)

    const n = 4;
    let flag = imgs.length < n ? imgs.length : n;

    const uploadImgFun = (obj, index) => {
      const formData = new FormData()
      formData.append('imageName', obj.name);
      formData.append('image', obj)
      putNftImg(collectionId, formData).then(res => {
        if (res) {
          setImgsSowArr(old => {
            if (old.length < 4) {
              const arr = [...old];
              if (old.length === 3) {
                arr.push({})
              } else {
                arr.push(obj)
              }
              return arr
            } else {
              return old
            }
          })
          setImgsUploadedNum(old => old + 1)
        }
      }).finally(() => {
        if (imgs[index + n]) {
          uploadImgFun(imgs[index + n], index + n)
        } else {
          flag--;
          if (flag < 1) {
            setImgLoading(false)
            setImgsUploaded(true)
          }
        }
      })
    }

    for (let i = 0; i < n; i++) {
      if (imgs[i]) {
        uploadImgFun(imgs[i], i);
      }
    }
  }
  const tipAlert = (e) => {
    if (imgsUploaded || hadImgUpload) {
      setVisibleJsonReload(true)
    } else {
      document.getElementById('json-upload-input').click();
    }
  }
  const skipJson = () => {
    setCurrentStep(2)
  }
  const backAndUpdate = () => {
    setContentType('')
    getNftList()
  }
  const handleReloadCancel = () => {
    setVisibleJsonReload(false)
  }
  const handleContinue = () => {
    setVisibleJsonReload(false)
    document.getElementById('json-upload-input').click();
  }
  const getNftList = (pageNo = 1) => {
    getMetadataList(collectionId, true, pageNo, 19).then(res => {
      /* @ts-expect-error */
      setList(res.list);
      /* @ts-expect-error */
      setPageCount(Math.ceil(res.totalCount / res.pageSize))
      /* @ts-expect-error */
      if (res?.list?.length > 0) {
        setHadImgUpload(true)
      }
    })
    getMetadataList(collectionId, false, 1, 1000).then(res => {
      /* @ts-expect-error */
      setBadList(res.list);
    })
  }
  const pageNoChange = (e, pageNumber) => {
    setPageNo(pageNumber)
    getMetadataList(collectionId, true, pageNumber, 19).then(res => {
      /* @ts-expect-error */
      setList(res.list);
    })
  }
  const handelDelNFT = () => {
    setVisibleDelNFT(true)
  }
  const toDelNFT = () => {
    setVisibleDelNFT(false)
    setVisibleNFT(false)
    delOneMetadata(collectionId, nftForm.nftId).then(res => {
      getNftList()
    })
  }

  useEffect(() => {
    queryInfo()
    if (collectionId) {
      getNftList()
    }
  }, [collectionId])

  return (
    <>
      {
        !contentType ?
          <CollectionManage>
            <ManageHeader>
              <CollectionItem>
                <CollectionTitle>{collectionInfo.name ? collectionInfo.name : '--'}</CollectionTitle>
                <CollectionFunc>
                  <BtnMr variant="outlined" color="error" onClick={openDelModal}>Delete Collection</BtnMr>
                  <BtnMr variant="outlined" color="primary" onClick={openEdit}><IconEdit /> &nbsp;Edit</BtnMr>
                  <Button disabled={list.length === 0 || badList.length > 0} variant="contained" className='w160' color="primary" onClick={openDeploy}>Launch</Button>
                </CollectionFunc>
              </CollectionItem>
              <CollectionDes>{collectionInfo.description}</CollectionDes>
            </ManageHeader>
            {
              badList.length > 0 &&
              <BadBox>
                <div>Missing Information ({badList.length})</div>
                <BadListBox>
                  {
                    badList.map(cell => (
                      <BadItemBox key={cell.nftId}><BadItem onClick={() => { openNFTEdit(cell) }}>{cell.name}</BadItem></BadItemBox>
                    ))
                  }
                </BadListBox>
              </BadBox>
            }
            <ManageMain>
              <CreateBox>
                <CreateBoxMian onClick={openModal}>
                  <Card></Card>
                  <CardMain>
                    <IconCreate>+</IconCreate>
                    <div className='c_green mt20 fs18'>Create Batch</div>
                  </CardMain>
                </CreateBoxMian>
              </CreateBox>
              {
                list.map(item => (
                  <BadgeCard refresh={needRefresh === item.nftId} refreshTime={needRefreshTime} key={item.nftId} item={item} clickEvent={openNFTEdit} />
                ))
              }
            </ManageMain>
            {
              pageCount > 1 &&
              <div className='df_center'>
                <Pagination onChange={pageNoChange} count={pageCount} variant="outlined" shape="rounded" color="primary" />
              </div>
            }
          </CollectionManage> :
          <CollectionManage>
            <BulkBody>
              <div className='space-between-center '>
                <div className='title'>Bulk Create</div>
                <div onClick={backAndUpdate} className='back'>Back to Collection &gt;</div>
              </div>
              <div className='space-between-center-h5'>
                <StepBox active={currentStep === 1}>
                  <div className='step-item'>
                    <div className='step-title'>Step 1</div>
                    <CenterBox>
                      {
                        jsonUploaded ?
                          <>
                            <PrimaryTextDiv style={{ marginTop: 47, marginBottom: 16 }}>Upload Success!</PrimaryTextDiv>
                            <FileBox>
                              <IconJson className='mr16' />
                              <span>{jsonName}</span>
                            </FileBox>
                            <div style={{ fontSize: 14, marginTop: 16 }}>
                              <ColorGreenLight>Total Items: </ColorGreenLight>
                              <span>{formatAmount(jsonDataLength)}</span>
                            </div>
                          </> :
                          <>
                            <IconJson className='mt60 mb20' />
                            <ColorGreenLight>Download the template</ColorGreenLight>
                            <a className='mt12 mb50' href="/metadata.json" download>metadata.json ↓</a>
                          </>
                      }
                    </CenterBox>
                    <div>
                      {
                        jsonUploaded ?
                          <LoadingButton
                            loading={jsonLoading}
                            className='w180'
                            variant="outlined"
                            onClick={tipAlert}
                            color='secondary'
                          >
                            {jsonLoading ? 'Uploading' : 'Re-upload'}
                          </LoadingButton>
                          :
                          <LoadingButton
                            loading={jsonLoading}
                            className='w180 btn_themeColor'
                            onClick={tipAlert}
                          >
                            {jsonLoading ? 'Uploading' : 'Upload Metadata'}
                          </LoadingButton>
                      }
                      <input
                        disabled={jsonLoading}
                        id="json-upload-input"
                        style={{ display: 'none' }}
                        onChange={uploadJson}
                        type="file"
                        accept="application/json"
                      />
                      {
                        currentStep === 1 && !jsonUploaded && <Button onClick={skipJson} style={{ marginLeft: 20 }} className='w180' variant="outlined" color='secondary'>Skip</Button>
                      }
                    </div>
                    {
                      jsonError && <ErrorTextDiv>Incorrect format, please refer to the template and re-upload it.</ErrorTextDiv>
                    }
                  </div>
                </StepBox>
                <StepBox active={currentStep === 2}>
                  <div className='step-item'>
                    <div style={{ color: currentStep !== 2 ? '#7A9283' : '#fff' }} className='step-title'>Step 2</div>
                    <CenterBox>
                      {
                        (imgsUploaded || imgLoading) ?
                          <>
                            <PrimaryTextDiv style={{ marginTop: 47, marginBottom: 16 }}>{imgsUploaded ? 'Upload Success!' : ''}</PrimaryTextDiv>
                            <div className='df_center'>
                              {
                                imgsSowArr.map(item => {
                                  if (item.name) {
                                    return <ShowBlockImg src={window.URL.createObjectURL(item)} />
                                  } else {
                                    return <ShowBlockDiv>···</ShowBlockDiv>
                                  }
                                })
                              }
                            </div>
                            <div style={{ fontSize: 14, marginTop: 16 }}>
                              <span>{formatAmount(imgsUploadedNum)}</span>
                              <ColorGreenLight> items uploaded, Total upload file: </ColorGreenLight>
                              <span>{formatAmount(imgsAmount)}</span>
                            </div>
                          </> :
                          <>
                            <IconImg className='mt60 mb20'></IconImg>
                            <ColorGreenLight style={{ lineHeight: '27px' }} className='tac'>Supports jpg, png, gif, webp<br />Max size: 10MB</ColorGreenLight>
                          </>
                      }
                    </CenterBox>
                    {
                      !imgsUploaded && (
                        currentStep === 2 ?
                          <label htmlFor="img-upload-input">
                            <LoadingButton
                              loading={imgLoading}
                              className='w180 btn_themeColor'
                              component="span"
                            >
                              {imgLoading ? 'Uploading' : 'Choose file'}
                            </LoadingButton>
                          </label>
                          :
                          <DisabledBtn>After Step 1</DisabledBtn>
                      )
                    }
                    <input
                      id="img-upload-input"
                      style={{ display: 'none' }}
                      onChange={uploadImgs}
                      disabled={imgLoading}
                      type="file"
                      multiple
                      accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"
                      /* @ts-expect-error */
                      directory=""
                      webkitdirectory=""
                    />
                    {
                      imgsUploaded && <Button onClick={backAndUpdate} className='w180 btn_themeColor'>View in collection</Button>
                    }
                  </div>
                </StepBox>
              </div>
            </BulkBody>
          </CollectionManage>
      }
      {
        visible &&
        <CollectionModal visible={visible} closeModal={handleCancel} collectionInfo={collectionInfo}></CollectionModal>
      }
      {
        visiblePush &&
        <PushModal visiblePush={visiblePush} closePushModal={handleCancel2} collectionId={collectionInfo.id}></PushModal>
      }
      {
        <DeleteModal visible={visibleDel} closeDel={handelDel} delFunc={deleteCollection}></DeleteModal>
      }
      {
        <DeleteModal visible={visibleDelNFT} closeDel={() => { setVisibleDelNFT(false) }} delFunc={toDelNFT} text='NFT'></DeleteModal>
      }

      <Modal
        open={visibleJsonReload}
        onClose={handleReloadCancel}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 496,
            boxShadow: 24,
            border: '1px solid #4B5954 !important',
            padding: '50px 40px 30px',
            textAlign: 'center'
          }}
        >
          <span style={{ color: '#A5FFBE', fontSize: 20, fontWeight: 700, lineHeight: '26px' }}>If you want to re-upload the metadata, it will clear the uploaded NFT items, do you continue?</span>
          <div className='mt40'>
            <Button style={{ marginRight: 30 }} className='w160' variant="outlined" onClick={handleReloadCancel}>Cancel</Button>
            <Button className='w160 btn_themeColor' onClick={handleContinue}>Continue</Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={visibleNFT}
        onClose={handleCancelNFT}>
        <Box sx={{ ...style }}>
          <div className='mb20 space-between-center'>Edit NFT
            <CloseIcon onClick={handleCancelNFT} className='cp'></CloseIcon>
          </div>
          <CreateNftBaseBox>
            <UploadBox className='df_column_center cp' onClick={openFile}>
              {
                selectedImage ?
                  <ShowImg src={typeof selectedImage === 'object' ? window.URL.createObjectURL(selectedImage) : (selectedImage + '?t=' + needRefreshTime)}></ShowImg>
                  :
                  <div className='df_column_center'>
                    <IconCreate>+</IconCreate>
                    <div className='c_green mt20'>Upload Item</div>
                    <ColorGreenLight className='mt10'>Supported file types</ColorGreenLight>
                    <ColorGreenLight className='mt8'>include JPEG, PNG, and GIF.</ColorGreenLight>
                  </div>
              }
              <UploadInput ref={chooseImg} type='file' accept='image/*' onChange={changeFile}></UploadInput>
            </UploadBox>
            <div className='f1'>
              <TextInput fullWidth id="nft-name" label="NFT Name" name={'name'}
                placeholder={`e.g. "NFT name"`}
                variant="standard"
                value={nftForm.name}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }} />
              <TextInput fullWidth id="standard-helperText" name={'description'}
                label="Description"
                placeholder="Description"
                rows={6}
                multiline
                variant="standard"
                value={nftForm.description}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextInput fullWidth id="collection-name" label="Total Supply" name={'count'}
                placeholder={`e.g. "Total Supply"`}
                variant="standard"
                value={nftForm.count}
                onChange={handleChange}
                type='number'
                InputLabelProps={{
                  shrink: true,
                }} /> */}
            </div>
          </CreateNftBaseBox>
          <SwitchGroup >
            <FormControlLabel control={<GreenSwitch checked={switchCheck} defaultChecked onChange={handleSwitchChange} />} label="Properties" labelPlacement="start" />
          </SwitchGroup>
          <ArrtList>
            {
              arrts.map((item, index) => (
                <ArrtItem>
                  <ItemKey>
                    <TextInput fullWidth id="standard-helperText"
                      placeholder="Key"
                      multiline
                      variant="standard"
                      value={item.name}
                      onChange={(event) => { handleChangeArrt(event, index, 'name') }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                  </ItemKey>
                  <ItemVal>
                    <TextInput fullWidth id="standard-helperText"
                      placeholder="Value"
                      multiline
                      variant="standard"
                      value={item.value}
                      onChange={(event) => { handleChangeArrt(event, index, 'value') }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                    <ItemFunc>
                      {
                        <ItemAdd onClick={() => { removeItem(index) }}>-</ItemAdd>
                      }
                      {
                        index === (arrts.length - 1) &&
                        <ItemAdd onClick={addItem}>+</ItemAdd>
                      }
                    </ItemFunc>
                  </ItemVal>
                </ArrtItem>
              ))
            }
          </ArrtList>
          <div style={{ flexDirection: 'row-reverse' }} className='mt20 mb20 space-between-center'>
            <LoadingButton loading={loading} className='w180 btn_themeColor' onClick={handelSubmit}>{loading ? 'Loading' : 'Save'}</LoadingButton>
            {
              !hadJsonUpload && <Button onClick={handelDelNFT} className='w180' variant="outlined" color='error'>Delete</Button>
            }
          </div>
        </Box>
      </Modal>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
    </>
  )
}
