import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom'

import { BREAKPOINTS } from 'theme';
import { gamesArr } from 'pages/GameDetail'
import upcoming from 'assets/img/home/icon_upcoming.png'
import banner3 from 'assets/img/games/banner3.jpg'
import banner4 from 'assets/img/games/banner4.jpg'

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
  padding: 102px 100px 70px 145px;

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
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
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
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 20px;
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
  width: 180px;
  height: 105px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    top: -5px;
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
const ContentItemComingSoon =  styled.div`
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



export default function Games() {
  const [selectGame, setSelectGame] = useState(gamesArr[0]);
  const history = useHistory()

  const goGameWebsite = () => {
    history.push(`/games/${selectGame.id}`)
  }
  const goGameDetail = (item) => {
    history.push(`/games/${item.id}`)
  }

  useEffect(() => {
  }, [])

  return (
    <Main>
      <BgBox style={{ backgroundImage: `url(${selectGame.banner})` }} />
      <GamesBox>
        <GameInfoBox>
          <EnlargementBgBox style={{ backgroundImage: `url(${selectGame.banner})` }} />
          <ShadeBox>
            <div style={{ color: '#A5FFBE', fontSize: 46, fontWeight: 800, marginBottom: 20 }}>{selectGame.name}</div>
            <div className='df_align_center mb20'>
              {
                selectGame.tags.map(item => <Tag>{item}</Tag>)
              }
            </div>
            <div className='text_hidden_3' style={{ color: '#EBEBEB', fontWeight: 400, marginBottom: 30, lineHeight: 1.5 }}>{selectGame.description}</div>
            <Button onClick={goGameWebsite} className='btn_themeColor' style={{ paddingLeft: 32, paddingRight: 32 }}>Learn More</Button>
          </ShadeBox>
        </GameInfoBox>
        <GamesRightBox>
          {
            gamesArr.slice(0, 4).map(item =>
              <GamesRightBoxItem onClick={() => { setSelectGame(item) }}>
                <EnlargementBgBox style={{ backgroundImage: `url(${item.banner})` }} />
              </GamesRightBoxItem>
            )
          }
          <ComingSoonBox>
            <EnlargementBgBox style={{ backgroundImage: `url(${banner4})` }} />
          </ComingSoonBox>
        </GamesRightBox>
      </GamesBox>
      <div className='df_align_center mt24 mb24' style={{ marginLeft: '-15px' }}>
        <img width={44} src={upcoming} />
        <div style={{ fontSize: 30, fontWeight: 600, color: '#EBEBEB', marginLeft: 11 }}>Games</div>
      </div>

      <Content>
        {
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
        }
        <ContentItemBox>
          <ContentItemComingSoon >
            <EnlargementBgBox style={{ backgroundImage: `url(${banner4})` }} />
            <ShadeCard>
              <NameTag>Coming Soon...</NameTag>
            </ShadeCard>
          </ContentItemComingSoon>
        </ContentItemBox>
      </Content>
    </Main>
  )
}
