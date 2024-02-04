import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import { Link, useLocation } from 'react-router-dom'
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
import bg from 'assets/img/games/bg.png'
import defaultNews from 'assets/img/games/defaultNews.jpg'
import defaultGuides from 'assets/img/games/defaultGuides.jpg'
import { ReactComponent as ArrowR } from 'assets/img/games/arrow.svg'
import { queryGameList,queryGameRecommend, getMedium, getMediumGuide } from 'services/games'

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

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 0;
  }
`
const NavBox = styled.div`
  position: absolute;
  top: 70px;
  width: 100%;
  margin: auto;
  padding: 0 60px;
  z-index: 2;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    top: 20px;
    padding: 0px;
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
    padding: 40px 0px 0;
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
    padding: 70px 0px 20px;
  }
`
const ShadeBoxTitle = styled.div`
  margin-bottom: 20px;
  font-size: 46px;
  color: #A5FFBE;
  font-weight: 600;
  font-family: 'IMFePIrm';
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    font-size: 36px;
  }
`
const ShadeBoxDes = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  color: #EBEBEB;
  font-weight: 400;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    font-size: 18px;
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
    min-height: 480px;
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
 padding-left: 10px;
`
const GamesItemName = styled.div`
  margin-bottom: 10px;
  color: #A5FFBE;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  font-family: 'IMFePIrm';
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
  font-family: 'IMFePIrm' !important;
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
  z-index: 99;
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
  align-items: center;
  justify-content: space-between;
  padding: 40px 70px;
  background-repeat: no-repeat;
  background-size: 100%;
  font-family: Ringbearer;
  background-image: url(${bg});
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 0;
    background-image: none;
    div {
      width: 100%;
    }
  }
`
const GettingStart = styled.div`
  color: #FFF;
  font-family: Ringbearer;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const MultBanner = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 30px !important;
  border-radius: 30px !important;
  border: 1px solid #01D3F0;
  background: linear-gradient(180deg, #07271D 39.06%, #02171A 100%);
  color: #FFF !important;
  font-family: Ringbearer !important;
  font-size: 20px !important;
  position: relative;
`
const GlowwormBox1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  pointer-events:none;
  & > div{
    position: absolute;
    left: 0;
    background-image: radial-gradient(rgba(167, 217, 232, 0.8), rgba(101, 194, 223, 0.6), rgba(63, 209, 255, 0.8));
    border-radius: 50%;
  }
  & > div:nth-child(1) {
    width: 5px;
    height: 5px;
    left: 10px;
    top: 2px;
    animation: shadow1 2s 0.3s infinite, move1 10s 2s infinite;
  }
  & > div:nth-child(2) {
    width: 8px;
    height: 8px;
    left: 50px;
    top: 60px;
    animation: shadow1 2s 1s infinite, move1 10s 4s infinite;
  }
  & > div:nth-child(3) {
    width: 6px;
    height: 6px;
    left: 110px;
    bottom: 0;
    animation: shadow1 2s 0.4s infinite, move1 10s 3.2s infinite;
  }
  & > div:nth-child(4) {
    width: 10px;
    height: 10px;
    left: 210px;
    top: 0;
    animation: shadow1 2s 0.1s infinite, move1 10s 3s infinite;
  }
  & > div:nth-child(5) {
    width: 5px;
    height: 5px;
    left: 70%;
    bottom: 20px;
    animation: shadow1 2s 0.9s infinite, move1 10s 1s infinite;
  }
  & > div:nth-child(6) {
    width: 8px;
    height: 8px;
    left: 200px;
    top: 80px;
    animation: shadow1 2s 1.3s infinite, move1 10s 4.3s infinite;
  }
  & > div:nth-child(7) {
    width: 8px;
    height: 8px;
    left: 0px;
    top: 30px;
    animation: shadow1 2s 1.3s infinite, move1 10s 1.5s infinite;
  }
  & > div:nth-child(8) {
    width: 8px;
    height: 8px;
    left: -20%;
    top: 80px;
    animation: shadow1 2s 1.3s infinite, move1 10s 2.5s infinite;
  }
  & > div:nth-child(9) {
    width: 8px;
    height: 8px;
    left: 80%;
    top: 10px;
    animation: shadow1 2s 1.3s infinite, move1 10s 3.5s infinite;
  }
  & > div:nth-child(10) {
    width: 8px;
    height: 8px;
    left: 90%;
    top: 130px;
    animation: shadow1 2s 1.3s infinite, move1 10s 2.2s infinite;
  }

  @keyframes shadow1 {
    0% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.1);
    }
    10% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.2);
    }
    20% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.4);
    }
    30% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.6);
    }
    40% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.8);
    }
    50% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 1);
    }
    60% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.8);
    }
    70% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.6);
    }
    80% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.4);
    }
    90% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.2);
    }
    100% {
      box-shadow: 0px 0px 5px 5px rgba(63, 209, 255, 0.1);
    }
  }

  @keyframes move1 {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-20px, 10px);
    }
    20% {
      transform: translate(10px, 10px);
    }
    30% {
      transform: translate(30px, -20px);
    }
    40% {
      transform: translate(10px, 0px);
    }
    50% {
      transform: translate(10px, -10px);
    }
    60% {
      transform: translate(10px, 10px);
    }
    70% {
      transform: translate(-10px, 20px);
    }
    80% {
      transform: translate(25px, 35px);
    }
    90% {
      transform: translate(10px, 20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`
const GlowwormBox2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  pointer-events:none;
  & > div{
    position: absolute;
    left: 0;
    background-image: radial-gradient(rgba(255, 255, 199, 0.8), rgba(203, 255, 138, 0.6), rgba(105, 193, 114, 0.8));
    border-radius: 50%;
  }
  & > div:nth-child(1) {
    width: 5px;
    height: 5px;
    left: 10px;
    top: 2px;
    animation: shadow2 2s 0.3s infinite, move2 10s 2s infinite;
  }
  & > div:nth-child(2) {
    width: 8px;
    height: 8px;
    left: 50px;
    top: 60px;
    animation: shadow2 2s 1s infinite, move2 10s 4s infinite;
  }
  & > div:nth-child(3) {
    width: 6px;
    height: 6px;
    left: 110px;
    bottom: 0;
    animation: shadow2 2s 0.4s infinite, move2 10s 3.2s infinite;
  }
  & > div:nth-child(4) {
    width: 10px;
    height: 10px;
    left: 210px;
    top: 0;
    animation: shadow2 2s 0.1s infinite, move2 10s 3s infinite;
  }
  & > div:nth-child(5) {
    width: 5px;
    height: 5px;
    left: 70%;
    bottom: 20px;
    animation: shadow2 2s 0.9s infinite, move2 10s 1s infinite;
  }
  & > div:nth-child(6) {
    width: 8px;
    height: 8px;
    left: 200px;
    top: 80px;
    animation: shadow2 2s 1.3s infinite, move2 10s 4.3s infinite;
  }
  & > div:nth-child(7) {
    width: 8px;
    height: 8px;
    left: 0px;
    top: 30px;
    animation: shadow2 2s 1.3s infinite, move2 10s 1.5s infinite;
  }
  & > div:nth-child(8) {
    width: 8px;
    height: 8px;
    left: -20%;
    top: 80px;
    animation: shadow2 2s 1.3s infinite, move2 10s 2.5s infinite;
  }
  & > div:nth-child(9) {
    width: 8px;
    height: 8px;
    left: 80%;
    top: 10px;
    animation: shadow2 2s 1.3s infinite, move2 10s 3.5s infinite;
  }
  & > div:nth-child(10) {
    width: 8px;
    height: 8px;
    left: 90%;
    top: 130px;
    animation: shadow2 2s 1.3s infinite, move2 10s 2.2s infinite;
  }

  @keyframes shadow2 {
    0% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.1);
    }
    10% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.2);
    }
    20% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.4);
    }
    30% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.6);
    }
    40% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.8);
    }
    50% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 1);
    }
    60% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.8);
    }
    70% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.6);
    }
    80% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.4);
    }
    90% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.2);
    }
    100% {
      box-shadow: 0px 0px 5px 5px rgba(105, 193, 114, 0.1);
    }
  }

  @keyframes move2 {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-20px, 10px);
    }
    20% {
      transform: translate(10px, 10px);
    }
    30% {
      transform: translate(30px, -20px);
    }
    40% {
      transform: translate(10px, 0px);
    }
    50% {
      transform: translate(10px, -10px);
    }
    60% {
      transform: translate(10px, 10px);
    }
    70% {
      transform: translate(-10px, 20px);
    }
    80% {
      transform: translate(25px, 35px);
    }
    90% {
      transform: translate(10px, 20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`
const TestBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 58px;
  margin-right: 20px;
  padding: 1px;
  position: relative;
  box-sizing: border-box;
  color: #FFF;
  border-radius: 35px;
  font-family: 'IMFePIrm';
  z-index: 1;
	background: linear-gradient(90deg,#A5FFBE 0%,#89EB5B 100%);

  &:last-of-type {
    margin-right: 0px;
  }

  &::after{
    content: "";
    position: absolute;
    z-index: -1;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 35px;
    background: #040821;
  }
  &:hover {
    ${GlowwormBox1} {
      opacity: 1;
    }
    ${GlowwormBox2} {
      opacity: 1;
    }
    top: -3px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 20px;
  }
`
const BlueTxt = styled.span`
  color: #3FD1FF;
  padding-left: 2px;
  padding-right: 10px;
`
const GreenTxt = styled.span`
  color: #A5FFBE;
  padding-left: 2px;
  padding-right: 10px;
`


export default function Games() {
  const [selectGame, setSelectGame] = useState<any>();
  const [gameList, setGameList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const history = useHistory()
  const [order, setOrder] = useState<any>('twitterDesc');
  const [orderStatus, setOrderStatus] = useState<any>('desc');
  const [orderBy, setOrderBy] = useState('twitter');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [articlesList, setArticlesList] = useState([])
  const [guideList, setGuideList] = useState([])
  const [currentRoute, setCurrentRoute] = useState<any>({})
  const location = useLocation();

  const goGameWebsite = () => {
    history.push(`/games/${selectGame.gameId}`)
  }
  const goGameDetail = (item) => {
    history.push(`/games/${item.gameId}`)
  }
  const queryList = async (order) => {
    let data: any = await queryGameList('',  1, 999, order)
    setGameList(data.list)
    setSelectGame(data.list[0])
  }
  const queryRecommond = async () => {
    let data: any = await queryGameRecommend( true, 1, 4)
    setRecommendList(data.list)
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
  }
  const queryGuides = async () => {
    let res = await getMediumGuide()
    setGuideList(res)
  }
  useEffect(() => {
    queryRecommond()
    queryList(order)
    queryMediums()
    queryGuides()
  }, [])

  return (
    <Main>
      {/* <BgBox style={{ backgroundImage: `url(${selectGame?.banner})` }} /> */}
      <MainSwiper className='pr'>
        <NavBox>
          <WidthBox>
            <MainHeader>
              <NavLink to='/games' active={location.pathname === '/games'}>Game</NavLink>
              <NavLink to='/nfts' active={location.pathname === '/nfts'}>NFTs</NavLink>
              {/* <div>NFTs</div> */}
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
        <Swiper
          style={{
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {
            recommendList.length>0 ? recommendList.map(item =>
              <SwiperSlide key={item.gameId}>
                <GameInfoBoxSwiper>
                  <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
                  <ShadeBox>
                    <WidthBox>
                      <ShadeBoxTitle>{item.name}</ShadeBoxTitle>
                      <div className='df_align_center mb20'>
                        {
                          item.tags && item.tags.map(tag => <Tag status=''>{tag}</Tag>)
                        }
                      </div>
                      <ShadeBoxDes className='text_hidden_3' style={{ color: '#EBEBEB', fontWeight: 400, marginBottom: 30, lineHeight: 1.5 }}>{item.description}</ShadeBoxDes>
                      <Button onClick={goGameWebsite} className='btn_themeColor' style={{ paddingLeft: 32, paddingRight: 32 }}>Learn More</Button>
                    </WidthBox>
                  </ShadeBox>
                </GameInfoBoxSwiper>
              </SwiperSlide>
            ):
            gamesArr.map(item =>(
              <SwiperSlide key={item.id}>
                <GameInfoBoxSwiper>
                  <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
                  <ShadeBox>
                    <WidthBox>
                      <ShadeBoxTitle>{item.name}</ShadeBoxTitle>
                      <div className='df_align_center mb20'>
                        {
                          item.tags?.map(tag => <Tag status=''>{tag}</Tag>)
                        }
                      </div>
                      <ShadeBoxDes className='text_hidden_3' style={{ color: '#EBEBEB', fontWeight: 400, marginBottom: 30, lineHeight: 1.5 }}>{item.description}</ShadeBoxDes>
                      <Button onClick={goGameWebsite} className='btn_themeColor' style={{ paddingLeft: 32, paddingRight: 32 }}>Learn More</Button>
                    </WidthBox>
                  </ShadeBox>
                </GameInfoBoxSwiper>
              </SwiperSlide>
            ))
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
              recommendList.map(item =>
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
      <WidthBox >
        <BannerBox>
          <GettingStart >GETTING STARTED</GettingStart>
          <div className='df_h5'>
            <TestBox>
              <MultBanner onClick={() => { window.open('https://awns.stp.network') }}>Claim your <BlueTxt> AWNS</BlueTxt> <ArrowR></ArrowR></MultBanner>
              <GlowwormBox1>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </GlowwormBox1>
            </TestBox>
            <TestBox>
              <MultBanner onClick={() => { window.open('https://bridge.lootchain.com/bridge') }}>Enter the <GreenTxt> Loot Chain</GreenTxt> <ArrowR></ArrowR></MultBanner>
              <GlowwormBox2>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </GlowwormBox2>
            </TestBox>
          </div>
        </BannerBox>
      </WidthBox>
      <WidthBox>
        <NewsHead className='space-between-center mt30 mb20'>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB' }}>Latest News</div>
          <div className='cp' onClick={() => { window.open('https://medium.com/@aglddao') }}>View all &gt; </div>
        </NewsHead>
        <NewsBox>
          {
            articlesList.map(item =>
              <MediumItem key={item.title} style={{ backgroundImage: `url(${item.img ? item.img : defaultNews})` }} onClick={() => { window.open(item.link) }}>
                <MediumShadeItem>
                  <p>{item.title}</p>
                </MediumShadeItem>
              </MediumItem>
            )
          }
        </NewsBox>
        <NewsHead className='space-between-center mt30 mb20'>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB' }}>Guides</div>
          <div className='cp' onClick={() => { window.open('https://medium.com/@aglddao') }}>View all &gt; </div>
        </NewsHead>
        <NewsBox>
          {
            guideList.map(item =>
              <MediumItem key={item.title} style={{ backgroundImage: `url(${item.img ? item.img : defaultGuides})` }} onClick={() => { window.open(item.link) }}>
                <MediumShadeItem>
                  <p>{item.title}</p>
                </MediumShadeItem>
              </MediumItem>
            )
          }
        </NewsBox>
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
                  <StyledTableCell className='f2 pl10' align={'left'} style={{ minWidth: '170px' }} >
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
                  {/* <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    <TableSortLabel
                      active={orderBy === 'nftVolume'}
                      direction={orderBy === 'nftVolume' ? orderStatus : 'desc'}
                      onClick={createSortHandler('nftVolume')}
                    >
                      {'NFT Volume'}
                    </TableSortLabel>
                  </StyledTableCell> */}
                  <StyledTableCell className='f1' align={'center'} style={{ minWidth: '120px' }} >
                    {'Active Holders'}
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
                        {/* <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.nftVolume ? row.nftVolume : '--'}</div>
                        </StyledTableCell> */}
                        <StyledTableCell className='f1' key={row.id} align={'left'}>
                          <div className='f1 tac c_f'>{row.walletAddressCount ? formatAmountWithDecimal(row.walletAddressCount, 0, 0) : '--'}</div>
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
