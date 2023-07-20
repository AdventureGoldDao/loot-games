import React, { useEffect, useState } from 'react'
import { Button, Modal, Box, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useActiveWeb3React } from "../../../web3";
import { saveCollection } from "../../../services/createNFTManage"
import Snackbar from "components/SnackMessage"

import styled from 'styled-components/macro';
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
  color: #7A9283;
`
const TextInput = styled(TextField)`
  margin-top: 10px !important;
  .MuiInputLabel-root {
    color: #7A9283 !important;
  }
  .MuiInput-input {
    margin-top: 8px;
    padding: 18px;
    border: none;
    border-radius: 8px;
    background: #242926;
    color: #7A9283;
  }
`
export default function CollectionModal({ visible, closeModal, collectionInfo }) {
  const { account } = useActiveWeb3React()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('success')
  const [loading, setLoading] = useState(false)
  const [collectionForm, setCollectionForm] = useState<any>();
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    tokenSymbol: false,
  });

  const handleCancel = (refresh) => {
    console.log(refresh);
    
    closeModal(refresh)
  }
  const handleChange = (event) => {

    const { name, value } = event.target;

    setCollectionForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(collectionForm);

  };
  const handelSubmit = async () => {
    const formErrors = {
      name: collectionForm.name === '',
      description: collectionForm.description === '',
      tokenSymbol: collectionForm.tokenSymbol === '',
    };
    setErrors(formErrors);
    if (Object.values(formErrors).some((error) => error)) {
      return;
    }
    setLoading(true)
    let formData = new FormData();
    formData.append('name', collectionForm.name)
    formData.append('description', collectionForm.description)
    formData.append('tokenSymbol', collectionForm.tokenSymbol)
    formData.append('artistName', account)
    formData.append('category', 'gaming')
    if (collectionInfo) {
      formData.append('collectionId', collectionForm.id)
    }
    let res = await saveCollection(formData)
    console.log(res);
    initMsg('Success')
    closeModal(true)
    setLoading(false)
    setCollectionForm({
      name: '',
      description: '',
      tokenSymbol: ''
    })
  }
  const initMsg = (msg) => {
    setMsg(msg)
    setSeverity('success')
    setIsSnackbarOpen(true)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  useEffect(() => {
    if (collectionInfo) {
      setCollectionForm(collectionInfo)
    } else {
      setCollectionForm(
        {
          name: '',
          description: '',
          tokenSymbol: ''
        }
      )
    }
  }, [])

  return (
    <>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
      <Modal
        open={visible}
        onClose={()=>{handleCancel(false)}}
      >
        {
          collectionForm ?
            <Box sx={{ ...style }}>
              <div className='space-between-center'>
                Create Collection
                <CloseIcon onClick={()=>{handleCancel(false)}} className='cp'></CloseIcon>
              </div>
              <TextInput fullWidth id="collection-name" label="Collection Name" name={'name'}
                placeholder={`e.g. "Loot Collection"`}
                value={collectionForm.name}
                onChange={handleChange}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  maxLength: 200,
                }}
                error={errors.name}
                helperText={errors.name ? 'Collection name is required' : ''}
              />
              <TextInput fullWidth id="standard-helperText" label="Description" name={'description'}
                placeholder=""
                defaultValue={collectionForm.description}
                value={collectionForm.description}
                onChange={handleChange}
                rows={4}
                multiline
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  maxLength: 2000,
                }}
                error={errors.description}
                helperText={errors.description ? 'Description is required' : ''}
              />
              <TextInput fullWidth id="collection-name-1" label="TokenSymbol" name={'tokenSymbol'}
                placeholder={`e.g. "TokenSymbol"`}
                value={collectionForm.tokenSymbol}
                onChange={handleChange}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.tokenSymbol}
                helperText={errors.tokenSymbol ? 'TokenSymbol is required' : ''}
              />
              <div className='space-between mt20'>
                <ColorGreenLight className={`fs14`}>Token Standard</ColorGreenLight>
                <span>ERC-721</span>
              </div>
              <div className='mt20 mb20'>
                <LoadingButton loading={loading} className='wp100 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>{loading ? 'Loading' : 'Confirm'}</LoadingButton>
                {/* <Button className='wp100 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>Confirm</Button> */}
              </div>
            </Box> :
            <div></div>
        }
      </Modal>
    </>
  )
}
