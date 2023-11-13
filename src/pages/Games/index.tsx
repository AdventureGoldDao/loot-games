import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Thumbs, FreeMode } from "swiper";
import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";

import { chainTypeImgObj, chainTxtObj, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { formatAmountWithDecimal } from '../../utils/format'
import { BREAKPOINTS } from 'theme';
import { gamesArr } from 'pages/GameDetail'
import upcoming from 'assets/img/home/icon_upcoming.png'
import bg from 'assets/img/games/bg.jpg'
// import arrowR from 'assets/img/games/arrowR.svg'
import { ReactComponent as ArrowR } from 'assets/img/games/arrowR.svg'
import { queryGameList,getMedium } from 'services/games'

const EnlargementBgBox = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.5s;
`
const Main = styled.div`
  position: relative;
  min-height: 100vh;
  /* padding: 102px 100px 70px 100px; */
  padding: 72px 0px 70px 0px;

  @media screen and (min-width: ${BREAKPOINTS.xxl}px) {
    /* padding-right: 150px; */
    padding: 0px;
  }
  @media screen and (min-width: ${BREAKPOINTS.xxxl}px) {
    padding: 0px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 0;
  }
`
const MainSwiper = styled.div`
  position: relative;
  margin-top: -72px;
`
const BgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  &::before {
    background-color: rgba(26, 30, 30, 0.50);
    backdrop-filter: blur(30px);
    display: block;
    content: "";
    width: 100%;
    height: 100%;
  }
`
const GamesBox = styled.div`
  display: flex;
`
const ShadeBox = styled.div`
  background: linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #131313 100%);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 59px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin: auto;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 70px 20px 20px;
  }
`
const ShadeBoxTitle = styled.div`
  margin-bottom: 20px;
  font-size: 46px;
  color: #A5FFBE;
  font-weight: 600;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
      font-size: 36px;
  }
`
const GameInfoBox = styled.div`
  position: relative;
  top: 0;
  transition: top 0.2s;
  flex: auto;
  margin-right: 35px;
  height: 495px;
  border-radius: 20px;
  overflow: hidden;
  &:hover {
    top: -5px;
  }
  &:hover ${EnlargementBgBox} {
    transform: scale(1.2, 1.2);
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 0;
  }
`
const GameInfoBoxSwiper = styled.div`
  position: relative;
  top: 0;
  transition: top 0.2s;
  flex: auto;
  min-height: 672px;
  height: 100%;
  overflow: hidden;
  &:hover {
    /* top: -5px; */
  }
  &:hover ${EnlargementBgBox} {
    transform: scale(1.2, 1.2);
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 0;
    min-height: 400px;
  }
`
const GamesRightBox = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const GamesRightBoxItem = styled.div`
  position: relative;
  top: 0;
  transition: top 0.2s;
  width: 140px;
  height: 70px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    /* top: -5px; */
    border: 1px solid #A5FFBE;
  }
  &:hover ${EnlargementBgBox} {
    transform: scale(1.2, 1.2);
  }
`
const ComingSoonBox = styled.div`
  position: relative;
  top: 0;
  width: 180px;
  height: 105px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
`
export const Tag = styled.div<{ status: string }>`
  height: 30px;
  line-height: 28px;
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid #4B5954;
  background: #000;
  color: ${props => props.status === 'yellow' ? `#FFF161` : props.status === 'blue' ? `#92D1FF` : `#A5FFBE`};
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
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -17px -13px;
`
const ContentItemBox = styled.div`
  width: 50%;
  padding: 17px 13px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    padding-bottom: 3px;
  }
`
const ContentItem = styled.div`
  position: relative;
  top: 0;
  transition: top 0.2s;
  padding-bottom: 50%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #4B5954;
  &:hover {
    top: -5px;
    border: 1px solid #A5FFBE;
    box-shadow: 0px 4px 24px 0px rgba(165, 255, 190, 0.40);
  }
  &:hover ${EnlargementBgBox} {
    transform: scale(1.2, 1.2);
  }
`
const ContentItemComingSoon = styled.div`
  position: relative;
  top: 0;
  transition: top 0.2s;
  padding-bottom: 50%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #4B5954;
`
const ShadeCard = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.88));
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 22px 27px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`
const NameTag = styled.div`
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
  background-color: #000;
  border-radius: 50px;
  color: #EBEBEB;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    font-size: 20px;
  }
`
const DetailLine = styled.div`
  line-height: 1.5;
  color: #EBEBEB;
  font-weight: 400;
  width: 100%;
`
const GamesHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
`
const GamesHeaderItem = styled.div`
  font-family: Inconsolata;
  font-size: 16px;
  color: #85A391;
  line-height: 24px;
  min-width: 120px;
`
const GamesContent = styled.div`
  
`
const GamesContentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
`
const GamesItemImg = styled.img`
  width: 126px;
  height: 76px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100px;
    height: 66px;
  }
`
const GamesItemNameBox = styled.div`
 padding-left: 20px;
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
const GamesItemStatus = styled.div<{ status: string }>`
  /* height: 30px; */
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #4B5954;
  background: #0E100F;
  font-size: 14px;
  color: ${props => props.status === 'yellow' ? `#FFF161` : props.status === 'blue' ? `#92D1FF` : `#A5FFBE`};
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
  border: 1px solid #4B5954;
  border-radius: 10px;
  background-color: #111211;
`
const StyledBodyTableRow = styled(TableRow)`
  display: flex !important;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #4B5954;
  border-radius: 10px;
  background-color: #111211;
  cursor: pointer;
`
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#111211',
    color: '#85A391',
    padding: '0',
    borderBottom: 'none',
    lineHeight: '24px',
  },
  [`&.${tableCellClasses.body}`]: {
    padding: '0',
    borderBottom: 'none',
    fontSize: 14,
  },
}));
const StyledTableSortLabel = styled(TableSortLabel)`
  color: #85A391;
`
const StyledSwiper = styled(Swiper)`
  position: absolute;
  right: 0;
  width: 600px;
  height: 100px;
  align-items: center;
  line-height: 80px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const WidthBoxSwiper = styled.div`
  position: absolute;
  bottom: 20px;
  left: calc((100vw - 1200px)/2);
  width: 1200px;
  height: 100px;
  text-align: right;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
  }

`
const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex ;
  align-items: center;
`
const WidthBox = styled.div`
  width: 1200px;
  margin: auto;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    padding: 20px;
  }
`
const NewsHead = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-top: 0px;

  }
`
const NewsBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    flex-direction: column;
  }
`
const MediumItem = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  margin-right: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #4B5954;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  overflow: hidden;
  cursor: pointer;
  :last-of-type {
    margin-right: 0px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    height: 180px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`
const MediumShadeItem = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  background: linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #131313 100%);
`
const BannerBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 80px;
`
const GettingStart = styled.div`
  color: #FFF;
  font-family: Inconsolata;
  font-size: 46px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px;
`
const MultBanner = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 268px;
  height: 56px;
  border-radius: 30px !important;
  border: 1px solid #01D3F0;
  background: linear-gradient(180deg, rgba(1, 211, 240, 1), rgba(0, 87, 255, 1));
  margin-right: 10px !important;
  position: relative;
  box-sizing: border-box;
  color: #FFF;
  /* border-radius: 25px; */
  &::after{
  content: "";
	position: absolute;
  z-index: -1;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  background: #000;
  
}
`
const TestBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 58px;
  /* padding: 0 18px 0 30px; */
  position: relative;
  box-sizing: border-box;
  color: #FFF;
  border-radius: 25px;
  font-family: 'IMFePIrm';
  z-index: 1;
	background: linear-gradient(130deg, rgba(1, 211, 240, 1), rgba(0, 87, 255, 1));
 

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
  background: #040821;
  
}`


export default function Games() {
  const [selectGame, setSelectGame] = useState<any>();
  const [gameList, setGameList] = useState([]);
  const [recommendList, setRecommendList] = useState(gamesArr[0]);
  const history = useHistory()
  const [order, setOrder] = useState<any>('twitterDesc');
  const [orderStatus, setOrderStatus] = useState<any>('desc');
  const [orderBy, setOrderBy] = useState('twitter');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [articlesList, setArticlesList] = useState([])

  const goGameWebsite = () => {
    history.push(`/games/${selectGame.gameId}`)
  }
  const goGameDetail = (item) => {
    history.push(`/games/${item.gameId}`)
  }
  const queryList = async (order) => {
    let data: any = await queryGameList('', false, 1, 999, order)
    setGameList(data.list)
    setSelectGame(data.list[0])
  }
  const queryRecommond = async () => {
    let data: any = await queryGameList('', true, 1, 5)
    setRecommendList(data.list)
    // setSelectGame(data.list[0])
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderStatus === 'asc';
    setOrderStatus(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    let order = 'twitterAsc'
    switch (property) {
      case 'twitter':
        if (isAsc) {
          order = 'twitterDesc'
        } else {
          order = 'twitterAsc'
        }
        break;
      case 'discord':
        if (isAsc) {
          order = 'discordDesc'
        } else {
          order = 'discordAsc'
        }
        break;
      case 'nftVolume':
        if (isAsc) {
          order = 'nftVolumeDesc'
        } else {
          order = 'nftVolumeAsc'
        }
        break;
      case 'status':
        if (isAsc) {
          order = 'statusDesc'
        } else {
          order = 'statusAsc'
        }
        break;
      default:
        if (isAsc) {
          order = 'twitterDesc'
        } else {
          order = 'twitterAsc'
        }
        break;
    }
    queryList(order)
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const queryMediums = async () => {
    let res = await getMedium()
    setArticlesList(res)
    console.log(res);
    
  }

  useEffect(() => {
    queryRecommond()
    queryList(order)
    queryMediums()
  }, [])

  return (
    <Main>
      {/* <BgBox style={{ backgroundImage: `url(${selectGame?.banner})` }} /> */}
      <MainSwiper className='pr'>
        <Swiper
          style={{
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {
            gameList.slice(1, 6).map(item =>
              <SwiperSlide key={item.gameId}>
                <GameInfoBoxSwiper>
                  <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
                  <ShadeBox>
                    <WidthBox>
                      <ShadeBoxTitle>{item.name}</ShadeBoxTitle>
                      <div className='df_align_center mb20'>
                        {
                          item.tags.map(tag => <Tag status=''>{tag}</Tag>)
                        }
                      </div>
                      <div className='text_hidden_3' style={{ color: '#EBEBEB', fontWeight: 400, marginBottom: 30, lineHeight: 1.5 }}>{item.description}</div>
                      <Button onClick={goGameWebsite} className='btn_themeColor' style={{ paddingLeft: 32, paddingRight: 32 }}>Learn More</Button>
                    </WidthBox>
                  </ShadeBox>
                </GameInfoBoxSwiper>
              </SwiperSlide>
            )
          }
        </Swiper>
        <WidthBoxSwiper>
          <StyledSwiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {
              gameList.slice(1, 6).map(item =>
                <StyledSwiperSlide key={item.banner}>
                  <GamesRightBoxItem onClick={() => { setSelectGame(item) }}>
                    <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
                  </GamesRightBoxItem>
                </StyledSwiperSlide>
              )
            }
          </StyledSwiper>
        </WidthBoxSwiper>
      </MainSwiper>
      {/* <WidthBox style={{backgroundImage:`url(${bg})`}}>
        <BannerBox>
          <GettingStart >GETTING STARTED</GettingStart>
          <div>
            <MultBanner>Claim our AWNS <ArrowR></ArrowR></MultBanner>
            <MultBanner>Enter the Loot Chain <ArrowR></ArrowR></MultBanner>
          </div>
          <TestBox><MultBanner>Claim our AWNS</MultBanner></TestBox>
        </BannerBox>
      </WidthBox> */}
      <WidthBox>
        <NewsHead className='space-between-center mt30 mb20'>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB' }}>Latest News</div>
          <div className='cp' onClick={()=> {window.open('https://medium.com/@aglddao')}}>View all &gt; </div>
        </NewsHead>
        <NewsBox>
          {
            articlesList.slice(1, 4).map(item =>
              <MediumItem key={item.title} style={{ backgroundImage: `url(${item.img})` }} onClick={()=> {window.open(item.link)}}>
                <MediumShadeItem>
                  <p>{item.title}</p>
                </MediumShadeItem>
              </MediumItem>
            )
          }
        </NewsBox>
        {/* <NewsHead className='space-between-center mt30 mb20'>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB' }}>Guides</div>
          <div className='cp' onClick={()=> {window.open('https://medium.com/@aglddao')}}>View all &gt; </div>
        </NewsHead>
        <NewsBox>
          {
            articlesList.slice(1, 4).map(item =>
              <MediumItem key={item.title} style={{ backgroundImage: `url(${item.img})` }} onClick={()=> {window.open(item.link)}}>
                <MediumShadeItem>
                  <p>{item.title}</p>
                </MediumShadeItem>
              </MediumItem>
            )
          }
        </NewsBox> */}
        <div className='df_align_center mt24 mb24' style={{ marginLeft: '-15px' }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB', marginLeft: 11 }}>All Games</div>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden', background: 'transparent' }}>
          <TableContainer >
            <Table stickyHeader aria-label="sticky table">
              <StyledTableHead>
                <StyledTableRow>
                  <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    {''}
                  </StyledTableCell>
                  <StyledTableCell className='f2' align={'left'} style={{ minWidth: '170px' }} >
                    {'Name'}
                  </StyledTableCell>
                  <StyledTableCell sortDirection={'asc'} className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    <TableSortLabel
                      active={orderBy === 'twitter'}
                      direction={orderBy === 'twitter' ? orderStatus : 'desc'}
                      onClick={createSortHandler('twitter')}
                    >
                      {'Twitter'}
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    <TableSortLabel
                      active={orderBy === 'discord'}
                      direction={orderBy === 'discord' ? orderStatus : 'desc'}
                      onClick={createSortHandler('discord')}
                    >
                      {'Discord'}
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    <TableSortLabel
                      active={orderBy === 'nftVolume'}
                      direction={orderBy === 'nftVolume' ? orderStatus : 'desc'}
                      onClick={createSortHandler('nftVolume')}
                    >
                      {'NFT Volume'}
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    {'Wallet address'}
                  </StyledTableCell>
                  <StyledTableCell className='f2' align={'center'} style={{ minWidth: '170px' }} >
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? orderStatus : 'desc'}
                      onClick={createSortHandler('status')}
                    >
                      {'Status'}
                    </TableSortLabel>
                  </StyledTableCell>
                </StyledTableRow>
              </StyledTableHead>
              <TableBody>
                {gameList
                  .map((row) => {
                    return (
                      <StyledBodyTableRow onClick={() => { goGameDetail(row) }} hover role="checkbox" tabIndex={-1} key={row.id}>
                        <StyledTableCell className='f1' align={'left'}>
                          <GamesItemImg src={row.banner}></GamesItemImg>
                        </StyledTableCell>
                        <StyledTableCell className='f2' align={'left'}>
                          <GamesItemNameBox>
                            <GamesItemName>{row.name}</GamesItemName>
                            <GamesItemNameBoxChain>
                              {
                                row.supportChains?.map(chain => (
                                  <ChainImg src={chainTypeImgObj[chain]} />
                                ))
                              }
                            </GamesItemNameBoxChain>
                          </GamesItemNameBox>
                        </StyledTableCell>
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.twitterFollowerCount ? formatAmountWithDecimal(row.twitterFollowerCount, 0, 0) : '--'}</div>
                        </StyledTableCell>
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.discordFollowerCount ? formatAmountWithDecimal(row.discordFollowerCount, 0, 0) : '--'}</div>
                        </StyledTableCell>
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.nftVolume ? row.nftVolume : '--'}</div>
                        </StyledTableCell>
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.walletAddressCount ? row.walletAddressCount : '--'}</div>
                        </StyledTableCell>
                        <StyledTableCell className='f2' key={row.id} align={'center'}>
                          <GamesItemStatus status={row.status === 'Beta' ? 'yellow' : row.status === 'In Development' ? 'blue' : ''}>{row.status}</GamesItemStatus>

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
      {/* <GamesHeader>
        <GamesHeaderItem className='f1'></GamesHeaderItem>
        <GamesHeaderItem className='f2 pl20'>Name</GamesHeaderItem>
        <GamesHeaderItem className='f1 tac'>Twitter</GamesHeaderItem>
        <GamesHeaderItem className='f1 tac'>Discord</GamesHeaderItem>
        <GamesHeaderItem className='f1 tac'>NFT voume</GamesHeaderItem>
        <GamesHeaderItem className='f1 tac'>Wallet address</GamesHeaderItem>
        <GamesHeaderItem className='f2 tac'>Status</GamesHeaderItem>
      </GamesHeader>
      <GamesContent>
        {
          gameList.map(item =>
            <GamesContentItem onClick={() => { goGameDetail(item) }}>
              <GamesItemImg className='f1' src={item.banner}></GamesItemImg>
              <GamesItemNameBox className='f2'>
                <GamesItemName>{item.name}</GamesItemName>
                <GamesItemNameBoxChain>
                  {
                    item.supportChains?.map(chain => (
                      <ChainImg src={chainTypeImgObj[chain]} />
                    ))
                  }
                </GamesItemNameBoxChain>
              </GamesItemNameBox>
              <div className='f1 tac'>{item.twitterFollowerCount ? item.twitterFollowerCount : '--'}</div>
              <div className='f1 tac'>{item.discordFollowerCount ? item.discordFollowerCount : '--'}</div>
              <div className='f1 tac'>{item.nftVolume ? item.nftVolume : '--'}</div>
              <div className='f1 tac'>{item.walletAddressCount ? item.walletAddressCount : '--'}</div>
              <div className='f2 tac'>
                <GamesItemStatus status={item.status === 'Beta' ? 'yellow' : item.status === 'In Development' ? 'blue' : ''}>{item.status}</GamesItemStatus>
              </div>
            </GamesContentItem>
          )
        }
      </GamesContent> */}
      <Content>
        {/* {
          gamesArr.map(item =>
            <ContentItemBox>
              <ContentItem onClick={() => { goGameDetail(item) }}>
                <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
                <ShadeCard>
                  <NameTag className='text_hidden_1'>{item.name}</NameTag>
                  <DetailLine className='ell'>{item.description}</DetailLine>
                </ShadeCard>
              </ContentItem>
            </ContentItemBox>
          )
        } */}
        {/* <ContentItemBox>
          <ContentItemComingSoon >
            <EnlargementBgBox style={{ backgroundImage: `url(${banner4})` }} />
            <ShadeCard>
              <NameTag>Coming Soon...</NameTag>
            </ShadeCard>
          </ContentItemComingSoon>
        </ContentItemBox> */}
      </Content>
    </Main>
  )
}
