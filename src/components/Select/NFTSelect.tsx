import {chainArr} from "../../utils/networkConnect";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import styled from "styled-components";

const Cover = styled.img`
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

const Name = styled.span`
  margin-left: 19px;
  font-size: 20px;
`

const CustomSelect = styled(Select)`
  width: 100%;
  border-radius: 12px !important;
  border: 1px solid #4B5954 !important;
  background: linear-gradient(180deg, #242926 0%, #0E110F 100%);
  box-shadow: 0 0 0 6px #2A312D;
`

export const NFTSelect = ({value, onChange}: { value: string, onChange: (event: SelectChangeEvent) => void }) => {
    return (
        <CustomSelect
            sx={{height: 70}}
            onChange={onChange}
            value={value}
        >
            {
                chainArr.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        <Cover src={item.icon} alt={item.name}/>
                        <Name>{item.name}</Name>
                    </MenuItem>
                ))
            }
        </CustomSelect>
    )
}