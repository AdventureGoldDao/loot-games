import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Box } from "@mui/material";
import styled from 'styled-components/macro';

import { HANDLE_SHOW_FAILED_TRANSACTION_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import { ReactComponent as FailedIcon } from '../../assets/img/failed_icon.svg'
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

export const FailedTransactionModal = ({ visible }) => {
  const { dispatch } = useContext(mainContext);
  const { t } = useTranslation()

  const handleCancel = () => {
    dispatch({
      type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
      showFailedTransactionModal: false
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
        <FailedIcon />
        <Title style={{ color: '#FF7D7D' }}>Failed</Title>
        <div style={{ color: '#975D5D' }}>Transaction failed, please try again</div>
      </Box>
    </Modal>
  );
};
