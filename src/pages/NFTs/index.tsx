import React, { useEffect, useState } from 'react'
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

import { chainTypeImgObj, chainTxtObj, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { BREAKPOINTS } from 'theme';
import { gamesArr } from 'pages/GameDetail'
import { queryNFTList } from 'services/games'


const Main = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 72px 0px 70px 0px;

  @media screen and (min-width: ${BREAKPOINTS.xxl}px) {
    padding-right: 150px;
  }
  @media screen and (min-width: ${BREAKPOINTS.xxxl}px) {
    padding-right: 300px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 16px;
  }
`
const HomeSwiper = styled.div`
  position: relative;
  padding: 72px 100px 30px;
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
const SwiperBg = styled.div`
  z-index: 1;
  position: absolute;
  inset: 0px 0px -1px;
  background-size: cover;
  transition: background 0.3s linear 0s;
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
  box-shadow: 0px 4px 24px 1px rgba(253, 255, 172, 0.45);
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

export default function Games() {
  const [selectGame, setSelectGame] = useState(gamesArr[0]);
  const [NFTist, setNFTList] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0)
  const history = useHistory()

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
      {
        NFTist.length > 0 &&
        <HomeSwiper >
          <SwiperBg style={{ backgroundImage: `url(${NFTist[swiperIndex]?.image})` }}></SwiperBg>
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
                  <Grid container className={`pl30 pt20 pr30`}>
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
                          <div className='f1 tac c_f'>{row.sales24h ? row.sales24h : '--'}</div>
                        </StyledTableCell>
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.holders ? row.holders : '--'}</div>
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
      </NFTsBox>
    </Main>
  )
}
