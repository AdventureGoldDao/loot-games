import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Grid } from "@mui/material";
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { formatAmountWithDecimal } from '../../utils/format'
import { chainTypeImgObj, chainTxtObj, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { BREAKPOINTS } from 'theme';
import { gamesArr } from 'pages/GameDetail'
import { queryNFTList } from 'services/games'


const Main = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 72px 0px 70px 0px;

  @media screen and (min-width: ${BREAKPOINTS.xxl}px) {
    padding-right: 0px;
  }
  @media screen and (min-width: ${BREAKPOINTS.xxxl}px) {
    padding-right: 0px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 0 16px 16px;
  }
`
const HomeSwiper = styled.div`
  position: relative;
  padding: 132px 100px 30px;
  margin-top: -72px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
    padding: 0;
  }

  .swiper-slide {
      padding: 20px 0px;
    }
    .swiper:hover {
      .swiper-button-next, .swiper-button-prev {
        display: flex;
      }
    }
    .swiper-button-next, .swiper-button-prev {
      display: none;
      width: 46px;
      height: 46px;
      border: 2px solid #EBEBEB;;
      border-radius: 50%;
      color: #fff;
      font-weight: 700;
      background: #131313;
    }
    
    .swiper-button-next:after, .swiper-button-prev:after {
      font-size: 18px;
    }
`
const NavBox = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  margin: auto;
  padding: 0 60px;
  z-index: 2;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    position: static;
    top: 0;
    padding: 0px;
  }
`
const WidthBox = styled.div`
  width: 1200px;
  margin: auto;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    padding: 20px;
  }
`
const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
  padding: 40px 0px 0px;
  border-bottom: 1px solid rgba(255,255,255,.4);
  font-family: 'Ringbearer';
  font-weight: 600;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    padding: 0px;
  }
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
const SwiperBg = styled.div`
  z-index: 1;
  position: absolute;
  inset: 0px 0px -1px;
  background-size: cover;
  transition: background 0.3s linear 0s;
  background-size: cover;
  &::after {
    backdrop-filter: blur(60px);
    background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, #131313 100%);
    pointer-events: none;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
const SwiperCover = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border: 1px solid #FDFFAC;
  /* box-shadow: 0px 4px 24px 1px rgba(253, 255, 172, 0.45); */
  border-radius: 20px;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
`
const HomeSwiperH5 = styled.div`
  position: relative;
  padding: 60px 100px;
  display: none;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: block;
    padding: 8px;
  }
`
const SwiperInfo = styled.div`
  margin-top: 20px;
`
const NftName = styled.div`
  font-size: 40px;
  font-weight: 600;
`
const NftDes = styled.div`
  margin-top: 20px;
  padding-right: 100px;
  font-size: 16px;
  line-height: 24px;
  color: #EBEBEB;
`
const MintBtn = styled.div`
  position: absolute;
  bottom: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    position: static;
    margin-top: 20px;
  }
`
export const Tag = styled.div`
  height: 30px;
  line-height: 28px;
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid #4B5954;
  background: #000;
  color: #A5FFBE;
  font-size: 16px;
  font-weight: 500;
  margin-right: 12px;
  :last-of-type {
    margin-right: 0px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 10px;
    padding: 0 14px;
  }
`

const GamesItemImg = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
`
const GamesItemNameBox = styled.div`
 padding-left: 0px;
`
const GamesItemName = styled.div`
  margin-bottom: 10px;
  color: #A5FFBE;
  font-family: Inconsolata;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`
const GamesItemNameBoxChain = styled.div`
  display: flex;
`
const ChainImg = styled.img`
  width: 32px;
  border-radius: 32px;
  margin-right: 17px;
`

const NFTsBox = styled.div`
  padding: 0 100px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 0 8px;
  }
`
const StyledTableHead = styled(TableHead)`
  display: flex !important;
  width: 100%;
  margin-bottom: 10px;
`
const StyledTableRow = styled(TableRow)`
  display: flex !important;
  width: 100%;
  padding: 0 10px;
  border: 1px solid #85A391;
  border-radius: 10px;
  background-color: #111211;
`
const StyledBodyTableRow = styled(TableRow)`
  display: flex !important;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #85A391;
  border-radius: 10px;
  background-color: #111211;
  cursor: pointer;
`
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#111211',
    color: '#85A391',
    padding: '0 10px',
    borderBottom: 'none',
    lineHeight: '24px',
  },
  [`&.${tableCellClasses.body}`]: {
    padding: '0',
    borderBottom: 'none',
    fontSize: 14,
  },
}));
const NavBoxH5 = styled.div`
  display: none;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: block;
    width: 100%;
    /* height: 200px; */
  }
`
export default function Games() {
  const [selectGame, setSelectGame] = useState(gamesArr[0]);
  const [NFTist, setNFTList] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0)
  const history = useHistory()
  const location = useLocation();

  const goGameDetail = (item) => {
    window.open(item.collectionLink)
  }
  const slideChange = (event) => {
    let a = countIndex(NFTist.length, event.activeIndex)
    setSwiperIndex(a - 1)
  }
  const countIndex = (a, b) => {
    if (a >= b) {
      return b;
    } else {
      let c = b - a;
      while (c > a) {
        c -= a;
      }
      return c;
    }
  }
  const queryList = async () => {
    let data: any = await queryNFTList('', false, 1, 999)
    setNFTList(data.list)
  }

  useEffect(() => {
    queryList()
  }, [])

  return (
    <Main>
      <NavBoxH5>
        <NavBox>
          <WidthBox>
            <MainHeader>
              <NavLink to='/games' active={location.pathname === '/games'}>Game</NavLink>
              <NavLink to='/nfts' active={location.pathname === '/nfts'}>NFTs</NavLink>
              <div className='cp' onClick={() => { window.open('https://forms.gle/eKeyD2VzRYKCMksM7') }}>Submit your game <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 1.5C4.64642 1.49986 4.78712 1.55682 4.89222 1.65877C4.99731 1.76072 5.0585 1.89964 5.0628 2.04599C5.0671 2.19235 5.01416 2.33461 4.91523 2.44256C4.8163 2.5505 4.67918 2.61561 4.533 2.62406L4.5 2.625H3C2.90539 2.62497 2.81427 2.6607 2.7449 2.72503C2.67553 2.78936 2.63303 2.87753 2.62594 2.97188L2.625 3V9C2.62497 9.09461 2.6607 9.18573 2.72503 9.2551C2.78936 9.32447 2.87753 9.36697 2.97188 9.37406L3 9.375H9C9.09461 9.37503 9.18573 9.3393 9.2551 9.27497C9.32447 9.21064 9.36697 9.12247 9.37406 9.02813L9.375 9V7.6875C9.37486 7.54108 9.43182 7.40038 9.53377 7.29528C9.63572 7.19019 9.77464 7.129 9.92099 7.1247C10.0674 7.1204 10.2096 7.17334 10.3176 7.27227C10.4255 7.3712 10.4906 7.50832 10.4991 7.6545L10.5 7.6875V9C10.5 9.38971 10.3483 9.76411 10.0771 10.0439C9.80587 10.3238 9.43639 10.4871 9.04688 10.4992L9 10.5H3C2.61029 10.5 2.23589 10.3483 1.95606 10.0771C1.67622 9.80587 1.51293 9.43639 1.50075 9.04688L1.5 9V3C1.5 2.6103 1.65168 2.23589 1.9229 1.95606C2.19413 1.67622 2.56361 1.51293 2.95312 1.50075L3 1.5H4.5ZM9 1.5C9.38971 1.5 9.76411 1.65168 10.0439 1.9229C10.3238 2.19413 10.4871 2.56361 10.4992 2.95313L10.5 3V4.875C10.5001 5.02142 10.4432 5.16212 10.3412 5.26722C10.2393 5.37231 10.1004 5.4335 9.95401 5.4378C9.80765 5.4421 9.66539 5.38916 9.55744 5.29023C9.4495 5.1913 9.38439 5.05418 9.37594 4.908L9.375 4.875V3.42038L4.89769 7.89788C4.79455 8.00162 4.65505 8.06109 4.50879 8.0637C4.36253 8.0663 4.221 8.01182 4.11424 7.91181C4.00748 7.8118 3.94387 7.67414 3.93692 7.52802C3.92997 7.3819 3.98021 7.23882 4.077 7.12913L4.10231 7.10231L8.57925 2.625H7.125C6.97858 2.62514 6.83788 2.56818 6.73278 2.46623C6.62769 2.36428 6.5665 2.22536 6.5622 2.07901C6.5579 1.93265 6.61084 1.79039 6.70977 1.68244C6.8087 1.5745 6.94582 1.50939 7.092 1.50094L7.125 1.5H9Z"
                  fill="#fff"
                />
              </svg></div>
            </MainHeader>
          </WidthBox>
        </NavBox>
      </NavBoxH5>
      {
        NFTist.length > 0 ?
          <HomeSwiper >
            <NavBox>
              <WidthBox>
                <MainHeader>
                  <NavLink to='/games' active={location.pathname === '/games'}>Game</NavLink>
                  <NavLink to='/nfts' active={location.pathname === '/nfts'}>NFTs</NavLink>
                  <div className='cp' onClick={() => { window.open('https://forms.gle/eKeyD2VzRYKCMksM7') }}>Submit your game <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 1.5C4.64642 1.49986 4.78712 1.55682 4.89222 1.65877C4.99731 1.76072 5.0585 1.89964 5.0628 2.04599C5.0671 2.19235 5.01416 2.33461 4.91523 2.44256C4.8163 2.5505 4.67918 2.61561 4.533 2.62406L4.5 2.625H3C2.90539 2.62497 2.81427 2.6607 2.7449 2.72503C2.67553 2.78936 2.63303 2.87753 2.62594 2.97188L2.625 3V9C2.62497 9.09461 2.6607 9.18573 2.72503 9.2551C2.78936 9.32447 2.87753 9.36697 2.97188 9.37406L3 9.375H9C9.09461 9.37503 9.18573 9.3393 9.2551 9.27497C9.32447 9.21064 9.36697 9.12247 9.37406 9.02813L9.375 9V7.6875C9.37486 7.54108 9.43182 7.40038 9.53377 7.29528C9.63572 7.19019 9.77464 7.129 9.92099 7.1247C10.0674 7.1204 10.2096 7.17334 10.3176 7.27227C10.4255 7.3712 10.4906 7.50832 10.4991 7.6545L10.5 7.6875V9C10.5 9.38971 10.3483 9.76411 10.0771 10.0439C9.80587 10.3238 9.43639 10.4871 9.04688 10.4992L9 10.5H3C2.61029 10.5 2.23589 10.3483 1.95606 10.0771C1.67622 9.80587 1.51293 9.43639 1.50075 9.04688L1.5 9V3C1.5 2.6103 1.65168 2.23589 1.9229 1.95606C2.19413 1.67622 2.56361 1.51293 2.95312 1.50075L3 1.5H4.5ZM9 1.5C9.38971 1.5 9.76411 1.65168 10.0439 1.9229C10.3238 2.19413 10.4871 2.56361 10.4992 2.95313L10.5 3V4.875C10.5001 5.02142 10.4432 5.16212 10.3412 5.26722C10.2393 5.37231 10.1004 5.4335 9.95401 5.4378C9.80765 5.4421 9.66539 5.38916 9.55744 5.29023C9.4495 5.1913 9.38439 5.05418 9.37594 4.908L9.375 4.875V3.42038L4.89769 7.89788C4.79455 8.00162 4.65505 8.06109 4.50879 8.0637C4.36253 8.0663 4.221 8.01182 4.11424 7.91181C4.00748 7.8118 3.94387 7.67414 3.93692 7.52802C3.92997 7.3819 3.98021 7.23882 4.077 7.12913L4.10231 7.10231L8.57925 2.625H7.125C6.97858 2.62514 6.83788 2.56818 6.73278 2.46623C6.62769 2.36428 6.5665 2.22536 6.5622 2.07901C6.5579 1.93265 6.61084 1.79039 6.70977 1.68244C6.8087 1.5745 6.94582 1.50939 7.092 1.50094L7.125 1.5H9Z"
                      fill="#fff"
                    />
                  </svg></div>
                </MainHeader>
              </WidthBox>
            </NavBox>
            <SwiperBg style={{ backgroundImage: `url(${NFTist[swiperIndex]?.image})` }}></SwiperBg>
            <WidthBox>
              <Swiper modules={[Navigation, Autoplay]}
                onSlideChange={slideChange}
                navigation={true}
                speed={500}
                autoplay={true}
                loop={true}
              >
                {
                  NFTist.map(item => (
                    <SwiperSlide key={item.name}>
                      <Grid container className={` pt20`}>
                        <Grid item xs={12} sm={12} md={4} lg={4} >
                          <SwiperCover>
                            <img src={item.image}></img>
                          </SwiperCover>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} className={`pl60`}>
                          <NftName className={`c_green mt10 text_hidden_1`}>{item.name}</NftName>
                          <NftDes className={`text_hidden_3`}>{item.description}</NftDes>
                          <div className='df_h5 mt30'>
                            <div className='f1 mt10'>
                              <div>Minted</div>
                              <div className='c_green fw600 mt10 fs24'>{item.listed ? item.listed : '--'}</div>
                            </div>
                            <div className='f1 mt10'>
                              <div className='mb10'>Network</div>
                              <ChainImg src={chainTypeImgObj[item.chainType]} />
                            </div>
                          </div>
                          <MintBtn>
                            <Button className={`w200 h40 btn_multicolour`} onClick={() => { goGameDetail(item) }}>View</Button>
                          </MintBtn>
                        </Grid>
                      </Grid>
                    </SwiperSlide>
                  ))

                }
              </Swiper>
            </WidthBox>
          </HomeSwiper> :
          <HomeSwiper>
            <NavBox>
              <WidthBox>
                <MainHeader>
                  <NavLink to='/games' active={location.pathname === '/games'}>Game</NavLink>
                  <NavLink to='/nfts' active={location.pathname === '/nfts'}>NFTs</NavLink>
                  <div className='cp' onClick={() => { window.open('https://forms.gle/eKeyD2VzRYKCMksM7') }}>Submit your game <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 1.5C4.64642 1.49986 4.78712 1.55682 4.89222 1.65877C4.99731 1.76072 5.0585 1.89964 5.0628 2.04599C5.0671 2.19235 5.01416 2.33461 4.91523 2.44256C4.8163 2.5505 4.67918 2.61561 4.533 2.62406L4.5 2.625H3C2.90539 2.62497 2.81427 2.6607 2.7449 2.72503C2.67553 2.78936 2.63303 2.87753 2.62594 2.97188L2.625 3V9C2.62497 9.09461 2.6607 9.18573 2.72503 9.2551C2.78936 9.32447 2.87753 9.36697 2.97188 9.37406L3 9.375H9C9.09461 9.37503 9.18573 9.3393 9.2551 9.27497C9.32447 9.21064 9.36697 9.12247 9.37406 9.02813L9.375 9V7.6875C9.37486 7.54108 9.43182 7.40038 9.53377 7.29528C9.63572 7.19019 9.77464 7.129 9.92099 7.1247C10.0674 7.1204 10.2096 7.17334 10.3176 7.27227C10.4255 7.3712 10.4906 7.50832 10.4991 7.6545L10.5 7.6875V9C10.5 9.38971 10.3483 9.76411 10.0771 10.0439C9.80587 10.3238 9.43639 10.4871 9.04688 10.4992L9 10.5H3C2.61029 10.5 2.23589 10.3483 1.95606 10.0771C1.67622 9.80587 1.51293 9.43639 1.50075 9.04688L1.5 9V3C1.5 2.6103 1.65168 2.23589 1.9229 1.95606C2.19413 1.67622 2.56361 1.51293 2.95312 1.50075L3 1.5H4.5ZM9 1.5C9.38971 1.5 9.76411 1.65168 10.0439 1.9229C10.3238 2.19413 10.4871 2.56361 10.4992 2.95313L10.5 3V4.875C10.5001 5.02142 10.4432 5.16212 10.3412 5.26722C10.2393 5.37231 10.1004 5.4335 9.95401 5.4378C9.80765 5.4421 9.66539 5.38916 9.55744 5.29023C9.4495 5.1913 9.38439 5.05418 9.37594 4.908L9.375 4.875V3.42038L4.89769 7.89788C4.79455 8.00162 4.65505 8.06109 4.50879 8.0637C4.36253 8.0663 4.221 8.01182 4.11424 7.91181C4.00748 7.8118 3.94387 7.67414 3.93692 7.52802C3.92997 7.3819 3.98021 7.23882 4.077 7.12913L4.10231 7.10231L8.57925 2.625H7.125C6.97858 2.62514 6.83788 2.56818 6.73278 2.46623C6.62769 2.36428 6.5665 2.22536 6.5622 2.07901C6.5579 1.93265 6.61084 1.79039 6.70977 1.68244C6.8087 1.5745 6.94582 1.50939 7.092 1.50094L7.125 1.5H9Z"
                      fill="#fff"
                    />
                  </svg></div>
                </MainHeader>
              </WidthBox>
            </NavBox>
            <SwiperBg style={{ backgroundImage: `url(${gamesArr[swiperIndex]?.banner})` }}></SwiperBg>
          </HomeSwiper>
      }
      {
        NFTist.length > 0 &&
        <HomeSwiperH5>
          <SwiperCover>
            <img src={NFTist[0]?.image}></img>
          </SwiperCover>
          <SwiperInfo>
            <NftName className={`c_green mt10 ell`}>{NFTist[0]?.name}</NftName>
            <NftDes className={`text_hidden_3`}>{NFTist[0]?.description}</NftDes>
            <div className='df_h5 mt30'>
              <div className='f2 mt10'>
                <div>Minted</div>
                <div className='c_green fw600 mt10 fs24'>{NFTist[0]?.listed ? NFTist[0]?.listed : '--'}</div>
              </div>
              <div className='f1 mt10'>
                <div>Network</div>
                <div className='c_green fw600 mt10 fs24'>{chainTxtObj[NFTist[0]?.chainType]}</div>
              </div>
            </div>
            <MintBtn>
              <Button className={`w200 h40 btn_multicolour`} onClick={() => { goGameDetail(NFTist[0]) }}>View</Button>
            </MintBtn>
          </SwiperInfo>
        </HomeSwiperH5>
      }
      <NFTsBox>
        <WidthBox>
          <div className='df_align_center mt24 mb24' style={{ marginLeft: '-15px' }}>
            {/* <img width={44} src={upcoming} /> */}
            <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB', marginLeft: 11 }}>All NFTs</div>
          </div>
          <Paper sx={{ width: '100%', overflow: 'hidden', background: 'transparent' }}>
            <TableContainer >
              <Table stickyHeader aria-label="sticky table">
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableCell className='w100' align={'center'} style={{ minWidth: '100px' }} >
                      {''}
                    </StyledTableCell>
                    <StyledTableCell className='f2' align={'left'} style={{ minWidth: '170px' }} >
                      {'Name'}
                    </StyledTableCell>
                    <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                      {'Floor Price'}
                    </StyledTableCell>
                    <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                      {'24H Volume'}
                    </StyledTableCell>
                    <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                      {'NFT sales'}
                    </StyledTableCell>
                    <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                      {'Holders'}
                    </StyledTableCell>
                    <StyledTableCell className='f2' align={'center'} style={{ minWidth: '170px' }} >
                      {'Listed'}
                    </StyledTableCell>
                  </StyledTableRow>
                </StyledTableHead>
                <TableBody>
                  {NFTist
                    .map((row) => {
                      return (
                        <StyledBodyTableRow onClick={() => { goGameDetail(row) }} hover role="checkbox" tabIndex={-1} key={row.id}>
                          <StyledTableCell className='w100' align={'left'} style={{ minWidth: '100px' }}>
                            <GamesItemImg src={row.image}></GamesItemImg>
                          </StyledTableCell>
                          <StyledTableCell className='f2' align={'left'}>
                            <GamesItemNameBox>
                              <GamesItemName>{row.name}</GamesItemName>
                              <GamesItemNameBoxChain>
                                <ChainImg src={chainTypeImgObj[row.chainType]} />
                              </GamesItemNameBoxChain>
                            </GamesItemNameBox>
                          </StyledTableCell>
                          <StyledTableCell className='f1' key={row.id} align={'left'}>
                            <div className='f1 tac c_f'>{row.floorPrice ? row.floorPrice : '--'}</div>
                          </StyledTableCell>
                          <StyledTableCell className='f1' key={row.id} align={'left'}>
                            <div className='f1 tac c_f'>{row.volume24h ? row.volume24h : '--'}</div>
                          </StyledTableCell>
                          <StyledTableCell className='f1' key={row.id} align={'left'}>
                            <div className='f1 tac c_f'>{row.sales24h ? formatAmountWithDecimal(row.sales24h, 0, 0) : '--'}</div>
                          </StyledTableCell>
                          <StyledTableCell className='f1' key={row.id} align={'left'}>
                            <div className='f1 tac c_f'>{row.holders ? formatAmountWithDecimal(row.holders, 0, 0) : '--'}</div>
                          </StyledTableCell>
                          <StyledTableCell className='f2' key={row.id} align={'center'}>
                            <div className='f1 tac c_f'>{row.listed ? row.listed : '--'}</div>
                          </StyledTableCell>
                          {/* );
                        })} */}
                        </StyledBodyTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </WidthBox>
      </NFTsBox>
    </Main>
  )
}
