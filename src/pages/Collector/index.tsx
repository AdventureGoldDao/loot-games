import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { clearLocalStorage } from '../../utils/txSign'
import { useActiveWeb3React } from "../../web3"
import { useNFTList } from "../../services/createNFTManage"
import BadgeCard from "components/BadgeCard";
import { ReactComponent as DisconnectIcon } from 'assets/img/disconnect.svg'
import { abbrTxHash } from "../../utils/format";
import { BREAKPOINTS } from 'theme';
import bg from 'assets/img/explore_bg.svg'
import NoData from "../../components/NoData";

const Main = styled.div`
  min-height: 100vh;
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    padding: 16px;
  }
`
const Title = styled.div`
  font-size: 48px;
  font-weight: 600;
`
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  background-color: #000;
  border-radius: 40px;
  height: 40px;
  color: #A5FFBE;
  padding: 0 17px;
  margin-top: 15px;
  font-size: 18px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: auto;
  }
`
const H5Hide = styled.div`
  display: flex;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const H5Show = styled.div`
  display: none;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
  }
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px -10px;
`
const Text = styled.span`
  color: #FF7D7D;
  font-size: 14px;
  margin-right: 9px;
`
export const NoDataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: #111211;
  border-radius: 10px;
`

export default function Collector() {
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  const { list, total } = useNFTList(account, '', pageNo, 50, setLoading)
  const history = useHistory()

  const clearStorage = () => {
    clearLocalStorage(window.localStorage.getItem('now_selected_chain'))
    window.localStorage.removeItem('now_selected_chain')
    window.localStorage.removeItem('wallet_type')
  }

  const logOut = () => {
    clearStorage()
    history.push('/')
    window.location.reload()
  }

  useEffect(() => {
  }, [])
  return (
    <Main>
      <div className="space-between-center">
        <Title>Collector</Title>
      </div>
      <Box>
        <H5Hide>{account}</H5Hide>
        <H5Show>{abbrTxHash(account, 5, 4)}</H5Show>
        <div onClick={logOut} className="df_align_center cp">
          <Text>Disconnect</Text>
          <DisconnectIcon />
        </div>
      </Box>

      <Content>
        {
          list.map(item => (
            <BadgeCard key={item.project} item={item} type="collector" />
          ))
        }
        {
          list.length === 0 && <NoDataBox>
            <NoData></NoData>
          </NoDataBox>
        }
      </Content>
    </Main>
  )
}
