import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'
import { Button, Select, MenuItem } from "@mui/material";
import styled from 'styled-components/macro';

import { useActiveWeb3React } from "../../web3";
import { getChainType } from "../../web3/address";
import { chainArr, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { abbrTxHash } from "../../utils/format";
import { getSymbol } from "../../utils/symbol";
import { mainContext } from "../../reducer";
import { HANDLE_SHOW_CONNECT_MODAL, HANDLE_WRONG_NETWORK } from "../../const";
import logoFull from "assets/img/logoFull.svg";
import more from "assets/img/header/more.svg";
import moreG from "assets/img/header/more_g.svg";
import { BREAKPOINTS } from 'theme';

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 10;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 60px;
  }
`
const Box = styled.div`
  height: 100%;
  padding: 0 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const Logo = styled.img`
  height: 22px;
`
const NavLink = styled(Link) <{ active: boolean }>`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.active ? '#A5FFBE' : '#fff'};
  &:hover {
    color: #A5FFBE;
  }
`
const OptionImg = styled.img`
  display: inline-block;
  height: 16px;
  border-radius: 50%;
`
const OptionName = styled.span`
  margin-left: 8px;
  font-size: 14px;
`
const AccountBox = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #A5FFBE;
  height: 28px;
  padding: 0 18px;
  text-align: center;
  line-height: 28px;
  background-color: rgba(165, 255, 190, 0.1);
  border-radius: 50px;
`
const BoxH5 = styled.div`
  display: none;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const More = styled.img`
  width: 21px;
  margin-left: 20px;
`
const NavH5Body = styled.div`
  position: fixed;
  z-index: 11;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #131313;
`
const PopMyBox = styled.div`
  padding: 20px;
  text-align: center;
`
const PopMyItem = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
`
export const WrongNetwork = styled.div`
  color: #ff7d7d;
  font-size: 14px;
  font-weight: 700;
`

const Header = ({ currentRoute }) => {
  const [showBox, setShowBox] = useState('');
  const [chainName, setChainName] = useState('mainnet')
  const [bgOpacity, setBgOpacity] = useState(0)
  const { account, active, chainId } = useActiveWeb3React()
  const { state, dispatch } = useContext(mainContext);

  const cancel = () => {
    setShowBox('')
  }

  const handleSwitchChain = (event) => {
    const chain = event.target.value;

    if (chainFun[chain]) {
      chainFun[chain]()
      setChainName(chain);
    }
  }

  useEffect(() => {
    const changeBg = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 60) {
        setBgOpacity(1)
      } else if (scrollTop > 0 && scrollTop < 60) {
        setBgOpacity(scrollTop / 60)
      } else if (scrollTop === 0) {
        setBgOpacity(0)
      }
    }
    window.addEventListener('scroll', changeBg);

    return () => {
      window.removeEventListener('scroll', changeBg);
    }
  }, [])

  useEffect(() => {
    if (active && chainId) {
      setChainName(getChainType(chainId));
      dispatch({
        type: HANDLE_WRONG_NETWORK, isWrongNetwork: false
      });
    }
  }, [active, chainId])
  useEffect(() => {
    if (state.isWrongNetwork) {
      setChainName('wrongNetwork');
    }
  }, [state.isWrongNetwork])

  return (
    <>
      <Main style={{ background: `rgba(19, 19, 19, ${bgOpacity})` }}>
        <Box>
          <div className="df aic">
            <Link to="/"><Logo src={logoFull} /></Link>
            <NavLink to="/" active={currentRoute.parent === 'home'} className={`ml60`}>Home</NavLink>
            <NavLink to="/explore" active={currentRoute.parent === 'explore'} className={`ml60`}>Explore</NavLink>
            <NavLink to="/bridge" active={currentRoute.parent === 'bridge'} className={`ml60`}>Bridge</NavLink>
            <NavLink to="/dashboard" active={currentRoute.parent === 'dashboard'} className={`ml60`}>Dashboard</NavLink>
          </div>

          <div className="df aic">
            {
              (active || state.isWrongNetwork) &&
              <Select
                onChange={handleSwitchChain}
                value={chainName}
                renderValue={val => {
                  const item = chainArr.find(res => res.value === val)
                  if (item) {
                    return <>
                      <OptionImg src={item.icon} alt={item.name} />
                      <OptionName>{item.name}</OptionName>
                    </>
                  } else {
                    return <WrongNetwork>Wrong Network</WrongNetwork>
                  }
                }}
              >
                {
                  chainArr.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      <OptionImg src={item.icon} alt={item.name} />
                      <OptionName>{item.name}</OptionName>
                    </MenuItem>
                  ))
                }
              </Select>
            }

            {
              !(active || state.isWrongNetwork)
                ? <Button
                  onClick={() => {
                    dispatch({
                      type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
                    });
                  }}
                  className="btn_multicolour h40 w200"
                >Connect Wallet</Button>
                :
                state.isWrongNetwork ? '' :
                <AccountBox className="ml16" to="/collector">{abbrTxHash(account, 5, 4)}</AccountBox>
            }
          </div>
        </Box>

        <BoxH5>
          <Link onClick={cancel} to="/"><Logo src={logoFull} /></Link>
          <div className="df aic">
            <div className="df">
              <More onClick={() => { setShowBox(oldStr => oldStr === 'about' ? '' : 'about') }} src={moreG} />
            </div>
          </div>
        </BoxH5>
      </Main>

      {
        showBox && <NavH5Body>
          <PopMyBox>
            <PopMyItem>
              <NavLink onClick={cancel} to="/" active={currentRoute.parent === 'home'}>Home</NavLink>
            </PopMyItem>
            <PopMyItem>
              <NavLink onClick={cancel} to="/explore" active={currentRoute.parent === 'explore'}>Explore</NavLink>
            </PopMyItem>
            <PopMyItem>
              <NavLink onClick={cancel} to="/bridge" active={currentRoute.parent === 'bridge'}>Bridge</NavLink>
            </PopMyItem>
            <PopMyItem>
              <NavLink onClick={cancel} to="/dashboard" active={currentRoute.parent === 'dashboard'}>Dashboard</NavLink>
            </PopMyItem>
          </PopMyBox>
          {
            (active || state.isWrongNetwork) &&
            <PopMyBox>
              <Select
                onChange={handleSwitchChain}
                value={chainName}
                renderValue={val => {
                  const item = chainArr.find(res => res.value === val)
                  if (item) {
                    return <>
                      <OptionImg src={item.icon} alt={item.name} />
                      <OptionName>{item.name}</OptionName>
                    </>
                  } else {
                    return <WrongNetwork>Wrong Network</WrongNetwork>
                  }
                }}
              >
                {
                  chainArr.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      <OptionImg src={item.icon} alt={item.name} />
                      <OptionName>{item.name}</OptionName>
                    </MenuItem>
                  ))
                }
              </Select>
            </PopMyBox>
          }
          <PopMyBox>
            {
              !(active || state.isWrongNetwork) ?
                <Button
                  onClick={() => {
                    dispatch({
                      type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
                    });
                  }}
                  className="btn_multicolour"
                >Connect Wallet</Button>
                :
                state.isWrongNetwork ? '' :
                <AccountBox onClick={cancel} to="/collector">{abbrTxHash(account, 5, 4)}</AccountBox>
            }
          </PopMyBox>
        </NavH5Body>
      }
    </>
  )
}

export default Header;
