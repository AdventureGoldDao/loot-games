import React, { useEffect, useState } from 'react'
import { Select, MenuItem, Button } from "@mui/material";
import styled from 'styled-components/macro';
import { Link, NavLink, useLocation, useHistory, useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { BREAKPOINTS } from 'theme';
import { chainTypeImgObj, chainFun, symbolImgObj } from '../../utils/networkConnect';
import logo1 from 'assets/img/games/logo1.jpg'
import logo2 from 'assets/img/games/logo2.png'
import logo3 from 'assets/img/games/logo3.png'
import logo4 from 'assets/img/games/logo4.png'
import logo5 from 'assets/img/games/logo5.png'
import logo6 from 'assets/img/games/logo6.png'
import banner1 from 'assets/img/games/banner1.jpg'
import banner2 from 'assets/img/games/banner2.jpg'
import banner3 from 'assets/img/games/banner3.png'
import banner4 from 'assets/img/games/banner4.png'
import banner5 from 'assets/img/games/banner5.jpg'
import banner6 from 'assets/img/games/banner6.jpg'
import collection from 'assets/img/games/collection.jpg'
import archlootCollection1 from 'assets/img/games/archloot_collection1.png'
import archlootCollection2 from 'assets/img/games/archloot_collection2.png'
import archlootCollection3 from 'assets/img/games/archloot_collection3.png'
import archlootCollection4 from 'assets/img/games/archloot_collection4.jpeg'
import screen1 from 'assets/img/games/screen1.jpg'
import screen2 from 'assets/img/games/screen2.jpg'
import archlootScreen1 from 'assets/img/games/archloot_screen1.jpeg'
import archlootScreen2 from 'assets/img/games/archloot_screen2.png'
import craftScreen1 from 'assets/img/games/craft_screen1.png'
import craftScreen2 from 'assets/img/games/craft_screen2.png'
import land1 from 'assets/img/games/land1.png'
import land2 from 'assets/img/games/land2.png'
import xland1 from 'assets/img/games/xland_screen1.jpg'
import xland2 from 'assets/img/games/xland_screen2.jpg'
import gabby1 from 'assets/img/games/gabby1.png'
import gabby2 from 'assets/img/games/gabby2.png'
import { ReactComponent as ShareIcon } from 'assets/img/games/share.svg'
import { ReactComponent as WebsiteIcon } from 'assets/img/games/website.svg'
import { ReactComponent as TwitterIcon } from 'assets/img/games/twitter.svg'
import { ReactComponent as DiscordIcon } from 'assets/img/games/discord.svg'
import { Tag } from 'pages/Games'
import BadgeCard from "components/BadgeCard";
import NoData from "../../components/NoData";

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
  padding-bottom: 50%;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  &::before {
    background: linear-gradient(rgba(19, 19, 19, 0.6), rgba(19, 19, 19, 1));
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding-bottom: 100%;
  }
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const HeaderImg = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 85px;
  margin-right: 30px;
  overflow: hidden;
`
const NameBox = styled.div`
  color: #FFF;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 12px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin: 12px 0;
    font-size: 26px;
  }
`
const ChainBox = styled.div`
  padding-right: 17px;
  margin-right: 17px;
  border-right: 1px solid rgba(75, 89, 84, 0.4);
  font-size: 14px;
  font-weight: 400;
  color: #EBEBEB;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    border-right: none;
    padding: 0;
    margin: 0 0 12px;
  }
`
const ChainImg = styled.img`
  width: 32px;
  border-radius: 32px;
  margin-left: 17px;
`
const LinkBox = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  background: #0E100F;
  margin-right: 20px;
  overflow: hidden;
  height: 40px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    border-right: none;
    padding: 0;
    margin: 12px 0;
  }
`
const LinkA = styled.a`
  display: block;
  padding: 10px 24px;
  svg {
    display: block;
  }
`
const BoxHr = styled.div`
  height: 30px;
  width: 1px;
  background: rgba(75, 89, 84, 0.4);
`
const ContentBox = styled.div`
  margin-top: 37px;
  padding: 25px 50px;
  border-radius: 20px;
  background: #0E100F;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 10px;
  }
`
const TabBox = styled.div`
  margin-bottom: 32px;
  overflow: auto;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 20px;
  }
`
const TabItem = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#A5FFBE' : '#7A9283'};
  margin-right: 27px;
  padding-right: 27px;
  border-right: 1px solid rgba(75, 89, 84, 0.4);
  text-align: center;
  span {
    cursor: pointer;
    font-weight: 600;
  }
  &:last-child {
    margin-right: 0;
    padding-right: 0;
    border-right: none;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 10px;
    padding-right: 10px;
  }
`
const ScreenBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -8px -8px 32px;
  .screen-item {
    width: calc(50% - 16px);
    margin: 8px;
    border-radius: 10px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 8px;
    .screen-item {
      width: calc(100% - 16px);
    }
  }
`
const CollectionBox = styled.div`
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  margin: -10px -10px 30px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin: -5px -5px 20px;
  }
`
AOS.init();
export const gamesArr = [
  {
    id: 'magic',
    name: 'Mighty Magic HEROES',
    description: `Welcome to the exciting world of "Mighty Magic"! In this captivating project, users have the opportunity to unleash their creativity and strategic prowess by participating in the minting and acquisition of unique Non-Fungible Tokens (NFTs) representing mighty heroes. These heroes are destined for epic battles, where their abilities, strengths, and weaknesses come into play. As a participant, you have the chance to mint your own personalized heroes as NFTs through the intuitive "Mighty Magic" platform. Each hero holds distinct attributes and powers, making them truly one-of-a-kind. Prepare to dive into a realm brimming with mystical creatures and legendary warriors. Once you have assembled your team of heroes, it's time to engage in exhilarating battles. Pit your NFT heroes against other participants' creations and witness intense clashes. Victory brings forth rewards in the form of gold, symbolizing your hero's triumph and dominance in the battlefield. However, it is crucial to bear in mind that defeat is also a possibility. If your hero falls in battle, they will be considered defeated, and the spoils of victory will be granted to the opposing side. Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!`,
    logo: logo1,
    banner: banner1,
    tags: ['ADV', 'Free Mint', 'Free to play'],
    supportChains: ['loot', 'zksyncera'],
    playLink: 'https://mighty-magic-dao.vercel.app/',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: '',
    discord: '',
    screenshots: [{ type: 'img', url: screen1 }, { type: 'img', url: screen2 }],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        mintStartTime: 0,
        mintEndTime: 0,
        chainType: 'loot'
      },
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        mintStartTime: 0,
        mintEndTime: 0,
        chainType: 'zksynceratest'
      },
    ]
  },
  {
    id: 'land',
    name: 'Land, Labor and Capitol (LLC)',
    description: `Tycoon style game where players can enjoy the gameplay with many different levels of involvement, from simply buying in-game stock in player-owned companies, to holding land in areas they think will appreciate in value, to actively managing a portfolio of firms and optimizing their operations based on their predictions of the macroeconomy.`,
    logo: logo2,
    banner: banner2,
    tags: ['Free to play'],
    supportChains: ['polygon', 'loot'],
    playLink: 'https://llcgame.io/',
    website: 'https://llcgame.io/',
    twitter: 'https://twitter.com/0xNetherGames',
    discord: 'http://discord.gg/PGdtwjqjuJ',
    screenshots: [{ type: 'img', url: land1 }, { type: 'img', url: land2 }],
    leaderboardLink: '',
    collections: []
  },
  {
    id: 'archloot',
    name: 'Archloot',
    description: `ArchLoot is a UGC P2E game that attempts to change the whole gamefi dynamics with its exceptional gameplay and unique infrastructure behind NFT assets.
    Basically a player assemble his/her own avatar with different parts (NFTs with a diversity of rarity, stats, looks and skills), then start the adventure.
    Game modes include PvE farm, group dungeons, 1 on 1 PvP, 3 on 3, clan wars, etc.
    The protocol behind the nft asset, EIP 4985 and BEP 129, which derives from loot, allows in game prop/parts level up, skill change, and interoperability of a single NFT.
    `,
    logo: logo3,
    comingSoon: true,
    banner: banner3,
    tags: ['Free to Play'],
    supportChains: ['bsc', 'mainnet', 'zksyncera'],
    playLink: 'https://archloot.com/',
    website: 'https://archloot.com/',
    twitter: 'https://twitter.com/archlootOS',
    discord: 'http://discord.gg/gPJwXJSFAc',
    screenshots: [{ type: 'img', url: archlootScreen1 }, { type: 'img', url: archlootScreen2 }],
    leaderboardLink: '',
    collections: [
      {
        name: 'ArchLoot Body Part NFT',
        image: archlootCollection4,
        collectionLink: 'https://archloot.com/blind-box/open-box/',
        mintStartTime: 0,
        mintEndTime: 0,
        chainType: 'bsc'
      },
      {
        name: 'ArchLoot Body Part NFT',
        image: archlootCollection4,
        collectionLink: 'https://archloot.com/blind-box/open-box/',
        mintStartTime: 0,
        mintEndTime: 0,
        chainType: 'zksyncera'
      },
    ]
  },
  {
    id: 'craft',
    name: 'LootCraft',
    description: `LootCraft is a fully on-chain 3D voxel autonomous world, where every block of the virtual space exists as part of the blockchain. Every action and interaction within the world, whether it's mining resources, crafting items, or building structures, occurs as a series of transactions on the Lootchain.

    LootCraft draws its inspiration from OPCraft, an iconic Autonomous World built on the OP Stack architecture. As a separate world, LootCraft preserves many of the key features found in OPCraft, but with a focus on optimizing for the LootChain, a blockchain designed to enrich Autonomous world. 
    
    Accessing Lootcraft is very simple - just open it up within any browser. Mining blocks, placing them in new locations, and creating items in the Lootcraft all generate transactions, so you need gas fee. Press ESC to make your mouse pointer visible, and click the Request Faucet button on the right to get your gas fee. Now you can mine, create, and leave your mark on Lootcraft with whatever you want. Every trace of your interaction with the world will remain permanently on the Lootchain.`,
    logo: logo4,
    banner: banner4,
    tags: ['Free to Play'],
    supportChains: ['loot'],
    playLink: 'https://lootcraft.buidl.day/',
    website: 'https://lootcraft.buidl.day/',
    twitter: 'https://twitter.com/Deplug_Studio?s=20',
    discord: '',
    screenshots: [{ type: 'img', url: craftScreen1 }, { type: 'img', url: craftScreen2 }],
    leaderboardLink: '',
    collections: []
  },
  {
    id: 'xLand',
    name: 'X Land',
    comingSoon: true,
    description: `X Land is a virtual world brimming with creativity and adventure. In this app, you'll embark on a marvelous journey through a variety of games and challenges.

    In this app, you'll not only immerse yourself in thrilling narratives but also build deep social connections by sharing your experiences with fellow adventurers.
    
    X Land is a world of boundless possibilities, waiting for you to explore and uncover.
    
    So, adventurer, are you ready to step into X Land and embark on an incredible journey? Here, you'll become your own hero and write your own legend. Join us now and explore this mysterious and wonderfully surprising world!`,
    logo: logo5,
    banner: banner5,
    tags: ['Free to Play'],
    supportChains: ['loot'],
    playLink: '',
    website: '',
    twitter: '',
    discord: '',
    screenshots: [{ type: 'img', url: xland1 }, { type: 'img', url: xland2 }],
    leaderboardLink: '',
    collections: []
  },
  {
    id: 'GabbyWorld',
    name: 'Gabby World',
    // comingSoon: true,
    description: `Gabby World is the first genAI-native autonomous world, where users can raise AI characters and create adventures through turning ideas into on-chain prompts, and permissionlessly bring any 3rd-party NFTs into the world to generate and capture value.
    Key highlights:
    First genAI-native FOCG experiment: all world logics written as on-chain prompts and run by decentrally-hosted LLM.
    Cross-context NFT metadata interpretation: natively interoperable with 3rd-party NFTs (e.g. Loot) to allow permissionless addition into world.
    UGC & modding in natural language: all contents, from AI characters to adventures, are generated by users through natural language prompts.`,
    logo: logo6,
    banner: banner6,
    tags: ['AIGC','AutonomousWorld'],
    supportChains: ['loot'],
    playLink: 'https://beta.gabby.world',
    website: 'https://gabby.world',
    twitter: 'https://twitter.com/gabby_world_',
    discord: '',
    screenshots: [{ type: 'img', url: gabby1 }, { type: 'img', url: gabby2 }],
    leaderboardLink: 'https://beta.gabby.world/leaderboard',
    collections: []
  },
]

const tabArr = ['Overview', 'Advanced Description', 'Collections', 'Leaderboard', 'Play']

export default function GameDetail() {
  // @ts-ignore
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState<any>({});
  const [currentTab, setCurrentTab] = useState(tabArr[0]);

  const goPlay = () => {
    window.open(gameInfo.website)
  }

  useEffect(() => {
    if (id) {
      setGameInfo(gamesArr.find(item => item.id === id))
      setCurrentTab(tabArr[0])
    }
  }, [id])

  return (
    <Main>
      <BgBox style={{ backgroundImage: `url(${gameInfo.banner})` }} />
      <PageHeader key={id} data-aos="ease-out" data-aos-duration={5000}>
        <div className="df_align_center_h5">
          <HeaderImg src={gameInfo.logo} />
          <div>
            <NameBox>{gameInfo.name}</NameBox>
            <div className="df_align_center_h5">
              <ChainBox className="df_align_center">
                <span>Support Chain</span>
                {
                  gameInfo.supportChains?.map(item => (
                    <ChainImg src={chainTypeImgObj[item]} />
                  ))
                }
              </ChainBox>
              <div className="df_align_center">
                <span className="mr17">Genres</span>
                {
                  gameInfo.tags?.map(item => <Tag>{item}</Tag>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="df_align_center_h5">
          <LinkBox>
            {
              gameInfo.website &&
              <LinkA href={gameInfo.website} target='_blank'><WebsiteIcon /></LinkA>
            }
            {
              gameInfo.twitter && <>
                <BoxHr />
                <LinkA href={gameInfo.twitter} target='_blank'><TwitterIcon /></LinkA>
              </>
            }
            {
              gameInfo.discord && <>
                <BoxHr />
                <LinkA href={gameInfo.discord} target='_blank'><DiscordIcon /></LinkA>
              </>
            }
          </LinkBox>
          <Button disabled={gameInfo.comingSoon} onClick={goPlay} style={{ height: 40 }} className="w180 btn_multicolour">
            {
              gameInfo.comingSoon ?
                <span>Coming Soon</span>
                :
                <span>Play Now<ShareIcon width={9} height={9} style={{ marginLeft: 8 }} /></span>
            }
          </Button>
        </div>
      </PageHeader>

      <ContentBox >
        <TabBox className="df_align_center">
          {
            tabArr.map(item => {
              if (item === 'Play' && gameInfo.comingSoon) {
                return ''
              }
              if (item === 'Advanced Description' && !gameInfo.advanced) {
                return ''
              }
              return <TabItem key={item} active={item === currentTab}><span onClick={() => { setCurrentTab(item) }}>{item}</span></TabItem>
            })
          }
        </TabBox>






        {
          currentTab === tabArr[0] && <div key={id} data-aos="fade-up" data-aos-duration={500}>
            <ScreenBox >
              {
                gameInfo.screenshots?.map(item => {
                  if (item.type === 'img') {
                    return <img className='screen-item' src={item.url} />
                  } else if (item.type === 'youtube') {
                    return <iframe className='screen-item' src={item.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  }
                })
              }
            </ScreenBox>
            <div style={{ color: '#ebebeb', fontWeight: 400, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{gameInfo.description}</div>
          </div>
        }
        {
          currentTab === tabArr[1] && <div key={id} data-aos="fade-up" data-aos-duration={500}>
            <div style={{ color: '#ebebeb', fontWeight: 400, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{gameInfo.advanced}</div>
          </div>
        }
        {
          currentTab === tabArr[2] && <CollectionBox>
            {
              gameInfo.collections?.map(item => (
                <BadgeCard key={item.name} item={item} type='game' />
              ))
            }
            {
              gameInfo.collections?.length === 0 && <NoData></NoData>
            }
          </CollectionBox>
        }
        {
          currentTab === tabArr[3] && <>
            {
              gameInfo.leaderboardLink ?
                <iframe width="100%" height="1000px" src={gameInfo.leaderboardLink} frameBorder="0"></iframe>
                :
                <CollectionBox>
                  <NoData></NoData>
                </CollectionBox>
            }
          </>
        }
        {
          currentTab === tabArr[4] &&
          <iframe width="100%" height="1000px" src={gameInfo.website} frameBorder="0"></iframe>
        }
      </ContentBox>
    </Main>
  )
}
