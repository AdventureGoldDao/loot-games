import React from "react";
import { ReactComponent as EmptyIcon } from 'assets/img/empty.svg';
import styled from 'styled-components/macro';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7A9283;
  width: 100%;
`

const NoData = ({ text = '' }) => {
  return (
    <Box>
      <EmptyIcon />
      <p className={`fw600 mt14 fs16`}>{text ? text : 'No Data'}</p>
    </Box>
  )
}

export default NoData;