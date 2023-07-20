import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Box, Button } from "@mui/material";
import styled from 'styled-components/macro';

import { mainContext } from "../../../reducer";
import { ReactComponent as SuccessIcon } from 'assets/img/success_icon.svg'
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
  padding: '50px 15px',
  textAlign: 'center'
};
const ViewNow = styled.div`
  display: inline-block;
  height: 20px;
  padding-bottom: 2px;
  color: #A5FFBE;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #A5FFBE;
  }
`
const CloseBox = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
`

export default function DeploySuccessModal({ visible, closeDep, viewCollection }) {

  const handleCancel = () => {
    viewCollection()
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
        <SuccessIcon />
        <Title style={{ color: '#A5FFBE' }}>SUCCESS</Title>
        <div style={{ color: '#76AB8B' }} className="mb20">The collection successfully launched</div>
        <ViewNow style={{ color: '#A5FFBE' }} onClick={viewCollection}> {`< View Now >`}</ViewNow>
      </Box>
    </Modal>
  );
};
