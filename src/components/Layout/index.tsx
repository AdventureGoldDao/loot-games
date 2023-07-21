import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import styled from 'styled-components/macro';
import { Tooltip } from "@mui/material";

import { BREAKPOINTS } from 'theme';
import { mainContext } from "../../reducer";
import HeaderSpecial from '../HeaderSpecial'
import { WalletConnect } from '../WalletConnect'
import { gamesArr } from 'pages/GameDetail'
import comingSoon from '../../assets/img/games/logo.svg'
import {
  FailedTransactionModal, TransactionModal, WaitingWalletConfirmModal
} from '../Modals'

const GamesMain = styled.div`
  min-height: 100%;
`
const LeftNav = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  background-color: rgba(26, 30, 30, 0.50);
  border-right: 1px solid #4B5954;
  min-height: 100vh;
  backdrop-filter: blur(30px);
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const NavLink = styled(Link) <{ active: boolean }>`
  position: relative;
  top: 0;
  transition: top 0.2s;
  border-radius: 50%;
  overflow: hidden;
  width: 55px;
  height: 55px;
  margin-bottom: 30px;
  &:hover {
    top: -3px;
    border: 1px solid #A5FFBE;
    box-shadow: 0px 1px 10px 0px rgba(165, 255, 190, 0.50);
  }
  &>img {
    width: 100%;
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
`
const Main = styled.div`
  min-height: 100%;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding-top: 60px;
    padding-bottom: 70px;
  }
`
const ComingSoonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #85A391;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
`

const Layout = ({ children, routeArr }) => {
  const [currentRoute, setCurrentRoute] = useState<any>({})
  const [currentId, setCurrentId] = useState('')
  const { state, dispatch } = useContext(mainContext);
  const location = useLocation();

  useEffect(() => {
    // find current route
    routeArr.find(cell => {
      if (pathToRegexp(cell.path).test(location.pathname)) {
        setCurrentRoute(cell)
        return true
      }
    })
    setCurrentId(location.pathname.substring(7))
  }, [location.pathname])

  useEffect(() => {
    // if (currentRoute.special) {
    //   if (document.title !== 'Games') {
    //     document.title = 'Games'
    //   }
    // } else if (document.title !== 'Games-NFT') {
    //   document.title = 'Games-NFT'
    // }
  }, [currentRoute])

  return (
    <>
      <GamesMain>
        <LeftNav>
          {
            gamesArr.map(item =>
              <NavLink key={item.id} to={`/games/${item.id}`} active={currentId === item.id}>
                {/* {
                      item.comingSoon && <ComingSoonDiv>Coming<br />soon</ComingSoonDiv>
                    } */}
                <Tooltip title={item.name} placement="right" arrow>
                  <img src={item.logo} />
                </Tooltip>
              </NavLink>
            )
          }
          <Tooltip title={'Coming soon'} placement="right" arrow>
            <img src={comingSoon} />
          </Tooltip>
        </LeftNav>
        <HeaderSpecial />
        <Main>{children}</Main>
      </GamesMain>
      <WaitingWalletConfirmModal visible={state.showWaitingWalletConfirmModal.show} />
      <FailedTransactionModal visible={state.showFailedTransactionModal} />
      <TransactionModal visible={state.showTransactionModal} />
      <WalletConnect visible={state.showConnectModal} />
    </>
  )
}
export default Layout;
