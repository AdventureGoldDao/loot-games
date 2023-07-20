import React, { useContext } from "react";
import Lottie from "react-lottie";
import { Modal, Box } from "@mui/material";
import styled from 'styled-components/macro';

import { HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import { ReactComponent as LoadingIcon } from '../../assets/img/loading_icon.svg'
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
const CloseBox = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
`


export const WaitingWalletConfirmModal = ({ visible }) => {
  const { dispatch, state } = useContext(mainContext);
  const { showWaitingWalletConfirmModal } = state;

  const handleCancel = () => {
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: {
        show: false,
        title: "",
        content: ""
      }
    });
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
        <LoadingIcon />
        <Title style={{ color: '#A5FFBE' }}>{showWaitingWalletConfirmModal.title ? showWaitingWalletConfirmModal.title : 'Minting in progress'}</Title>
        <div style={{ color: '#76AB8B' }}>{showWaitingWalletConfirmModal.content ? showWaitingWalletConfirmModal.content : 'Please confirm the transaction with your wallet.'}</div>
      </Box>
    </Modal>
  );
};
