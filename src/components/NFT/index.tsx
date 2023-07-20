import React from "react";
import styled from "styled-components";
import {Typography} from "@mui/material";

const CardFrame = styled.div`
  border-radius: 12px;
  border: 1px solid #3C5141;
  background: #1A1E1B;
  padding: 10px;
  margin: 23px 0 40px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  .name {
    
  }
`

const Cover = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 7px;
  margin-right: 40px;
`

export const NFTCard = ({onClick}: { onClick: () => void }) => {
    return (
        <CardFrame onClick={onClick}>
            <Cover
                src='https://define-art-static-prod.s3-ap-northeast-1.amazonaws.com/test/token/image/mumbai/0x34e91Bbcd9591D0Fe275f9B7a737D4b42617fa4c/5.png'/>
            <div>
                <Typography color={'#EBEBEB'} fontSize={18} fontWeight={600}>NFT #100</Typography>
            </div>
        </CardFrame>
    )
}