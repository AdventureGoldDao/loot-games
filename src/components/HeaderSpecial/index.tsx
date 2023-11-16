import React, { useState, useEffect, useContext, useRef } from "react";
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
import { WrongNetwork } from '../Header'
import greenIcon from 'assets/img/games/greenIcon.png'
import iconDownload from 'assets/img/games/download.svg'
import blackIcon from 'assets/img/games/black-icon.svg'
import cexIcon0 from "assets/img/games/cex-icon0.png";
import cexIcon1 from "assets/img/games/cex-icon1.png";
import cexIcon2 from "assets/img/games/cex-icon2.png";
import cexIcon3 from "assets/img/games/cex-icon3.png";
import dexIcon0 from "assets/img/games/dex-icon0.png";
import dexIcon2 from "assets/img/games/dex-icon2.svg";
import { ReactComponent as IconDiscord } from "assets/svg/discord.svg";
import { ReactComponent as IconGithub } from "assets/svg/github.svg";
import { ReactComponent as IconMirror } from "assets/svg/mirror.svg";
import { ReactComponent as IconTwitter } from "assets/svg/twittter.svg";

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0px;
  right: 0;
  height: 82px;
  z-index: 10;
  font-size: 18px;
  /* border-bottom: 1px solid #4B5954; */
  /* backdrop-filter: blur(30px); */
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 60px;
    left: 0;
  }
`

const Box = styled.div`
  height: 100%;
  padding: 0 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const Logo = styled.img`
  width: 150px;
`
const NavLink = styled(Link) <{ active: boolean }>`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.active ? '#A5FFBE' : '#fff'};
  border-bottom: 2px solid ${props => props.active ? '#A5FFBE' : 'transparent'};
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
const GoogleForms = styled.a`
  display: inline-block;
  width: 120px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50px;
  background-color: rgba(165, 255, 190, 0.1);
  text-decoration: none;
  font-size: 14px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  height: 50px;
  padding: 0 18px 0 30px;
  position: relative;
  box-sizing: border-box;
  color: #FFF;
  border-radius: 25px;
  font-family: 'IMFePIrm';
  z-index: 1;
	background: linear-gradient(130deg, rgba(165, 255, 190, 1),rgba(29, 151, 129, 0),rgba(253, 255, 172, 1));
  font-size: 14px;
  &::after{
    content: "";
    position: absolute;
    z-index: -1;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    background: #000;
 
  
}
`
const SelectBox = styled.div`
    font-family: 'IMFePIrm';
    font-size: 14px;
    position: relative;
    cursor: pointer;
    /* &:hover ul{
      display: block;
    } */
`
const SelectTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 34px;
  cursor: pointer;
  & p {
  margin-top: 0;
  margin-right: 8px;
  // font-size: 1.2rem;
  font-family: 'IMFePIrm';
  font-size: 14px;
  color: rgba(var(--white), 1);
  @include mixin.from(media.$lg) {
    font-size: 18px;
  }
  }
  & img {
    width: 8px;
    height: 5px;
  }
  &:hover {
    color: #A5FFBE;
    opacity: 0.8;
  }
`
const Selector = styled.ul`
  position: absolute;
  border: 1px solid #FDFFAC;
  border-radius: 10px;
  width: 180px;
  top: 2.7rem;
  list-style-type: none;
  background-color: #4B5954;
 
  & a:hover {
    color: #fff;
    background-color: #191D1B;
  }
  & a:first-child {
    border-radius: 10px 10px 0 0;
  }
  & a:last-child {
    border-radius: 0 0 10px 10px;
  }
  & a {
    display: flex;
    align-items: center;
    width: 100%;
    font-weight: 500;
    padding: 14px 28px;
    color: #fff;
    background-color: #242926;
    font-size: 14px;
    line-height: 20px;
    list-style-type: none;
    text-decoration: none;
  }
`
const GetAGLD = styled.div`
  width: 140px;
  height: 34px;
  display: flex;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(90deg, #A5FFBE 0%, #89EB5B 100%);
  & p {
    margin-top: 0;
    margin-right: 8px;
    font-size: 0.875rem;
    font-family: 'IMFePIit';
    // font-style: italic;
    color: #213425;
    font-weight: 700;
    word-spacing: inherit;
    @include mixin.from(media.$lg) {
      font-size: 13px;
    }
  }
  & img {
    width: 8px;
    height: 5px;
  }
  &:hover {
    background: #5CDF80;
  }
`
const Exchanges = styled.div`
  width: 180px;
  position: absolute;
  top: 3.2rem;
  background-color: #1B1F1C;
  border: 1px solid #FDFFAC;
  border-radius: 10px;
  padding: 10px;
  ul {
    color: #7A9283;
    font-size: 14px;
    a {
      display: flex;
      align-items: center;
      padding: 10px 0;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      svg {
        margin-left: auto;
        path {
          fill: #fff;
        }
      }
    }
  }
  & img {
    margin-right: 8px;
  }
`
const NavBoxH5 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow: auto;
  background: #000;
  z-index: 99;
  ul {
    list-style-type: none;
    padding-left: 20px;
  }
`
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
`
const NavUl = styled.div`
  list-style-type: none;
  li {
    padding: 12px 10px 0;
    color: #a5ffbe;
    font-size: 16px;
    a {
      color: #a5ffbe;
    }
  }
`
const NavUlChild = styled.div`
  padding-left: 30px;
  list-style-type: none;
  li {
    padding: 12px 10px 0;
    color: #fff;
    font-size: 16px;
    a {
      color: #fff;
    }
  }
`
const dexList = [
  {
    icon: dexIcon0,
    text: "UniSwap",
    link: "https://app.uniswap.org/#/tokens/ethereum/0x32353a6c91143bfd6c7d363b546e62a9a2489a20",
  },
  {
    icon: dexIcon2,
    text: "Soswap",
    link: "https://soswap.rai.finance/#/swap",
  },
];
const cexList = [
  {
    icon: cexIcon0,
    text: "Binance",
    link: "https://www.binance.com/en/trade/AGLD_USDT?theme=dark&type=spot",
  },
  {
    icon: cexIcon1,
    text: "Coinbase",
    link: "https://exchange.coinbase.com/trade/AGLD-USD",
  },
  {
    icon: cexIcon2,
    text: "OKX",
    link: "https://www.okx.com/trade-spot/agld-usdt",
  },
  {
    icon: cexIcon3,
    text: "Upbit",
    link: "https://upbit.com/exchange?code=CRIX.UPBIT.BTC-AGLD",
  },
];
const SOCIAL = {
  Mirror: "https://mirror.xyz/agld.eth",
  Discord: "https://discord.com/invite/WMXwkcGnNk",
  Twitter: "https://twitter.com/GoldAdventure",
  Github: "https://github.com/AdventureGoldDao/loot-chain",
};
const SOCIALIcons = {
  Mirror: <IconMirror />,
  Discord: <IconDiscord />,
  Twitter: <IconTwitter />,
  Github: <IconGithub />,
};
const HeaderSpecial = ({ currentRoute }) => {
  const [showBox, setShowBox] = useState('');
  const [chainName, setChainName] = useState('mainnet')
  const [bgOpacity, setBgOpacity] = useState(0.5)
  const { account, active, chainId } = useActiveWeb3React()
  const { state, dispatch } = useContext(mainContext);
  const [isHover, setIshover] = useState(false);
  const [isDexHover, setIsDexhover] = useState(false);
  const [isHovered, setIshovered] = useState(false);
  const [isExploreHover, setIsExploreHover] = useState(false);
  const [isH5Nav, setIsH5Nav] = useState(false);
  const rotRef = useRef()
  const rootRef = useRef()
  const roootRef = useRef()
  const dexRef = useRef()

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
        setBgOpacity(scrollTop / 60 / 2 + 0.5)
      } else if (scrollTop === 0) {
        setBgOpacity(0.5)
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
      <Main>
        <Box>
          <div className="df aic">
            <Link to="/games"><Logo src={logoFull} /></Link>
          </div>
          <div className="pl40 pr20">
            <Wrapper>
              <a href="https://lootchain.com">Home</a>
              <p>Loot Console</p>

              <SelectBox
                onClick={() => {
                  setIshovered(false);
                  setIsDexhover(false);
                  setIsExploreHover(false);
                  setIshover(!isHover);
                }}
                ref={rootRef}
                onMouseEnter={() => {
                  setIsDexhover(false);
                  setIshovered(false);
                  setIsExploreHover(false);
                  setIshover(true);
                }}
                aria-hidden="true"
              >
                <SelectTitle>
                  <p>Loot Chain</p>
                  <img src={greenIcon} alt="icon" />
                </SelectTitle>
                {isHover && (
                  <Selector >
                    <a href="https://mainnet.lootchain.com/">Loot Chain</a>
                    <a href="https://explorer.lootchain.com">Loot Scan</a>
                    <a href="https://bridge.lootchain.com/bridge">Bridge</a>
                    <a href="https://soswap.rai.finance/#/swap">Soswap</a>
                    <a href="https://loot-chain.gitbook.io/loot-chain-documentation/getting-started/overview">
                      Documentation
                    </a>
                  </Selector>
                )}
              </SelectBox>
              <SelectBox
                onClick={() => {
                  setIshover(false);
                  setIsDexhover(false);
                  setIsExploreHover(false);
                  setIshovered(!isHovered);
                }}
                onMouseEnter={() => {
                  setIshover(false);
                  setIsExploreHover(false);
                  setIsDexhover(false);
                  setIshovered(true);
                }}
                ref={roootRef}
                aria-hidden="true"
              >
                <SelectTitle>
                  <p>More</p>
                  <img src={greenIcon} alt="icon" />
                </SelectTitle>
                {isHovered && (
                  <Selector>
                    <a href="https://staking.adventuregold.org">Staking</a>
                    <a href="https://loot-talk.com/">Governance</a>
                    <a href="/whitepaper/agld_whitepaper.pdf">Whitepaper</a>
                    <a href="https://www.certik.com/projects/adventure-gold">Audit</a>
                    <a href="https://www.lootproject.com/">Loot</a>
                    <a href="https://lootchain.com/ecosystem">Ecosystem</a>
                    <a href="/logo/AGLD-Loot-presskit.zip">
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        Press Kit <img src={iconDownload} alt="" />
                      </div>{" "}
                    </a>
                  </Selector>
                )}
              </SelectBox>
              <div
                onClick={() => {
                  setIshover(false);
                  setIsExploreHover(false);
                  setIshovered(false);
                  setIsDexhover(!isDexHover);
                }}
                onMouseEnter={() => {
                  setIshover(false);
                  setIsExploreHover(false);
                  setIshovered(false);
                  setIsDexhover(true);
                }}
                ref={dexRef}
                aria-hidden="true"
              >
                <GetAGLD>
                  <p>GET AGLD</p>
                  <img src={blackIcon} alt="icon" />
                </GetAGLD>
                {isDexHover && (
                  <Exchanges >
                    <ul style={{ padding: "8px 0" }}>DEX</ul>
                    <ul>
                      {dexList.map((item) => (
                        <a key={item.text} href={item.link}>
                          <img src={item.icon} width={20} alt="" />
                          {item.text}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 1.5C4.64642 1.49986 4.78712 1.55682 4.89222 1.65877C4.99731 1.76072 5.0585 1.89964 5.0628 2.04599C5.0671 2.19235 5.01416 2.33461 4.91523 2.44256C4.8163 2.5505 4.67918 2.61561 4.533 2.62406L4.5 2.625H3C2.90539 2.62497 2.81427 2.6607 2.7449 2.72503C2.67553 2.78936 2.63303 2.87753 2.62594 2.97188L2.625 3V9C2.62497 9.09461 2.6607 9.18573 2.72503 9.2551C2.78936 9.32447 2.87753 9.36697 2.97188 9.37406L3 9.375H9C9.09461 9.37503 9.18573 9.3393 9.2551 9.27497C9.32447 9.21064 9.36697 9.12247 9.37406 9.02813L9.375 9V7.6875C9.37486 7.54108 9.43182 7.40038 9.53377 7.29528C9.63572 7.19019 9.77464 7.129 9.92099 7.1247C10.0674 7.1204 10.2096 7.17334 10.3176 7.27227C10.4255 7.3712 10.4906 7.50832 10.4991 7.6545L10.5 7.6875V9C10.5 9.38971 10.3483 9.76411 10.0771 10.0439C9.80587 10.3238 9.43639 10.4871 9.04688 10.4992L9 10.5H3C2.61029 10.5 2.23589 10.3483 1.95606 10.0771C1.67622 9.80587 1.51293 9.43639 1.50075 9.04688L1.5 9V3C1.5 2.6103 1.65168 2.23589 1.9229 1.95606C2.19413 1.67622 2.56361 1.51293 2.95312 1.50075L3 1.5H4.5ZM9 1.5C9.38971 1.5 9.76411 1.65168 10.0439 1.9229C10.3238 2.19413 10.4871 2.56361 10.4992 2.95313L10.5 3V4.875C10.5001 5.02142 10.4432 5.16212 10.3412 5.26722C10.2393 5.37231 10.1004 5.4335 9.95401 5.4378C9.80765 5.4421 9.66539 5.38916 9.55744 5.29023C9.4495 5.1913 9.38439 5.05418 9.37594 4.908L9.375 4.875V3.42038L4.89769 7.89788C4.79455 8.00162 4.65505 8.06109 4.50879 8.0637C4.36253 8.0663 4.221 8.01182 4.11424 7.91181C4.00748 7.8118 3.94387 7.67414 3.93692 7.52802C3.92997 7.3819 3.98021 7.23882 4.077 7.12913L4.10231 7.10231L8.57925 2.625H7.125C6.97858 2.62514 6.83788 2.56818 6.73278 2.46623C6.62769 2.36428 6.5665 2.22536 6.5622 2.07901C6.5579 1.93265 6.61084 1.79039 6.70977 1.68244C6.8087 1.5745 6.94582 1.50939 7.092 1.50094L7.125 1.5H9Z"
                              fill="#7A9283"
                            />
                          </svg>
                        </a>
                      ))}
                    </ul>
                    <ul style={{ padding: "8px 0" }}>CEX</ul>
                    <ul>
                      {cexList.map((item) => (
                        <a key={item.text} href={item.link}>
                          <img src={item.icon} width={20} alt="" />
                          {item.text}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 1.5C4.64642 1.49986 4.78712 1.55682 4.89222 1.65877C4.99731 1.76072 5.0585 1.89964 5.0628 2.04599C5.0671 2.19235 5.01416 2.33461 4.91523 2.44256C4.8163 2.5505 4.67918 2.61561 4.533 2.62406L4.5 2.625H3C2.90539 2.62497 2.81427 2.6607 2.7449 2.72503C2.67553 2.78936 2.63303 2.87753 2.62594 2.97188L2.625 3V9C2.62497 9.09461 2.6607 9.18573 2.72503 9.2551C2.78936 9.32447 2.87753 9.36697 2.97188 9.37406L3 9.375H9C9.09461 9.37503 9.18573 9.3393 9.2551 9.27497C9.32447 9.21064 9.36697 9.12247 9.37406 9.02813L9.375 9V7.6875C9.37486 7.54108 9.43182 7.40038 9.53377 7.29528C9.63572 7.19019 9.77464 7.129 9.92099 7.1247C10.0674 7.1204 10.2096 7.17334 10.3176 7.27227C10.4255 7.3712 10.4906 7.50832 10.4991 7.6545L10.5 7.6875V9C10.5 9.38971 10.3483 9.76411 10.0771 10.0439C9.80587 10.3238 9.43639 10.4871 9.04688 10.4992L9 10.5H3C2.61029 10.5 2.23589 10.3483 1.95606 10.0771C1.67622 9.80587 1.51293 9.43639 1.50075 9.04688L1.5 9V3C1.5 2.6103 1.65168 2.23589 1.9229 1.95606C2.19413 1.67622 2.56361 1.51293 2.95312 1.50075L3 1.5H4.5ZM9 1.5C9.38971 1.5 9.76411 1.65168 10.0439 1.9229C10.3238 2.19413 10.4871 2.56361 10.4992 2.95313L10.5 3V4.875C10.5001 5.02142 10.4432 5.16212 10.3412 5.26722C10.2393 5.37231 10.1004 5.4335 9.95401 5.4378C9.80765 5.4421 9.66539 5.38916 9.55744 5.29023C9.4495 5.1913 9.38439 5.05418 9.37594 4.908L9.375 4.875V3.42038L4.89769 7.89788C4.79455 8.00162 4.65505 8.06109 4.50879 8.0637C4.36253 8.0663 4.221 8.01182 4.11424 7.91181C4.00748 7.8118 3.94387 7.67414 3.93692 7.52802C3.92997 7.3819 3.98021 7.23882 4.077 7.12913L4.10231 7.10231L8.57925 2.625H7.125C6.97858 2.62514 6.83788 2.56818 6.73278 2.46623C6.62769 2.36428 6.5665 2.22536 6.5622 2.07901C6.5579 1.93265 6.61084 1.79039 6.70977 1.68244C6.8087 1.5745 6.94582 1.50939 7.092 1.50094L7.125 1.5H9Z"
                              fill="#7A9283"
                            />
                          </svg>
                        </a>
                      ))}
                    </ul>
                  </Exchanges>
                )}
              </div>
            </Wrapper>
          </div>
          <div className="df aic">
            {
              ['Mirror', 'Discord', 'Twitter', 'Github'].map(item => (
                <a target="_blank" href={SOCIAL[item]} className="pr20">{SOCIALIcons[item]}</a>
              ))
            }
          </div>
        </Box>

        <BoxH5>
          <Link onClick={cancel} to="/games"><Logo src={logoFull} /></Link>
          <div onClick={()=> {setIsH5Nav(true)}}>
            <svg
              width={24}
              height={10}
              viewBox="0 0 24 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="currentColor" d="M0 0h24v1H0zM0 9h24v1H0z" />
            </svg>
          </div>
          {/* <GoogleForms target="_blank" href="https://forms.gle/eKeyD2VzRYKCMksM7">Submit Game</GoogleForms> */}
        </BoxH5>
      </Main>
      {
        isH5Nav && <NavBoxH5>
          <Close onClick={()=> {setIsH5Nav(false)}}><svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" d="M8.723 8.015L24.986 24.28l-.707.707L8.016 8.722z" />
            <path fill="currentColor" d="M24.984 8.721L8.721 24.985l-.707-.707L24.277 8.014z" />
          </svg></Close>
          <NavUl>
            <li><a href="https://lootchain.com">Home</a></li>
            <li><a href="/games">Loot Console</a></li>
            <li>Loot Chain</li>
            <NavUlChild>
              <li><a href="https://mainnet.lootchain.com/">Loot Chain</a></li>
              <li><a href="https://explorer.lootchain.com">Loot Scan</a></li>
              <li><a href="https://bridge.lootchain.com/bridge">Bridge</a></li>
              <li><a href="https://soswap.rai.finance/#/swap">Soswap</a></li>
              <li> <a href="https://loot-chain.gitbook.io/loot-chain-documentation/getting-started/overview">
                Documentation
              </a></li>
            </NavUlChild>
            <li>More </li>
            <NavUlChild>
              <li><a href="https://staking.adventuregold.org">Staking</a></li>
              <li><a href="https://loot-talk.com/">Governance</a></li>
              <li><a href="https://www.certik.com/projects/adventure-gold">Audit</a></li>
              <li><a href="https://www.lootproject.com/">Loot</a></li>
              <li><a href="https://lootchain.com/ecosystem">Ecosystem</a></li>
            </NavUlChild>
          </NavUl>
        </NavBoxH5>
      }

      {
        showBox && <NavH5Body>
          {
            (active || state.isWrongNetwork) &&
            <PopMyBox className="mt20">
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
          <PopMyBox>
            <GoogleForms target="_blank" href="https://forms.gle/eKeyD2VzRYKCMksM7">Submit Game</GoogleForms>
          </PopMyBox>
        </NavH5Body>
      }
    </>
  )
}

export default HeaderSpecial;
