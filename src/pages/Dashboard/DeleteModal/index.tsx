import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Box, Button } from "@mui/material";
import styled from 'styled-components/macro';

import { mainContext } from "../../../reducer";
import { ReactComponent as WarnIcon } from '../../../assets/img/warn_icon.svg'
import { ReactComponent as CloseIcon } from 'assets/img/icon_close.svg'

const Title = styled.div`
  margin: 20px 0 10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 496,
  boxShadow: 24,
  border: '1px solid #5E4848 !important',
  padding: '50px 15px',
  textAlign: 'center'
};
const CloseBox = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
`

export default function DeleteModal({ visible, closeDel, delFunc, text = 'collection' }) {

  const handleCancel = () => {
    closeDel()
  }

  return (
    <Modal
      open={visible}
      onClose={handleCancel}
    >
      <Box sx={{ ...style }}>
        <CloseBox>
          <CloseIcon onClick={handleCancel} className='cp'></CloseIcon>
        </CloseBox>
        <WarnIcon />
        <Title style={{ color: '#FF7D7D' }}>Do you want to delete this {text}?</Title>
        <div style={{ color: '#975D5D' }} className="mb20">It cannot be restored after being deleted</div>
        <Button variant="contained" color="error" onClick={delFunc}>Delete now</Button>
      </Box>
    </Modal>
  );
};
