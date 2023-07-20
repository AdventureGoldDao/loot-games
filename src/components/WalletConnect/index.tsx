import React, { useContext, useEffect, useState } from 'react';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { BscConnector } from '@binance-chain/bsc-connector';
import { Modal, Box } from "@mui/material";
import styled from 'styled-components/macro';

import { useActiveWeb3React } from "../../web3";
import { useActiveTronWeb } from "hooks/activeTronWeb";
import { getSign, handleIsSignExpired, clearLocalStorage } from '../../utils/txSign'
import { mainContext } from '../../reducer'
import { HANDLE_SHOW_CONNECT_MODAL, HANDLE_WRONG_NETWORK } from "../../const";
import { injected } from "../../utils/networkConnect";
import imTokenIcon from '../../assets/img/modal/imToken.png'
import metaMaskIcon from '../../assets/img/modal/MetaMask.png'
import tronLinkIcon from '../../assets/img/modal/TronLink.png'
import hyperPay from '../../assets/img/modal/HyperPay.png'
import universalIcon from '../../assets/img/modal/universal.svg'
import walletConnectIcon from '../../assets/img/modal/WalletConnect.svg'
import bitKeep from '../../assets/img/modal/BitKeep.svg'
import Coinbase from '../../assets/img/modal/Coinbase.svg'
import ledgerIcon from '../../assets/img/modal/Ledger.png'

const Title = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #76AB8B;
  margin-bottom: 20px;
`
const WalletItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 60px;
  background: #161616;
  border: 1px solid #4B5954;
  border-radius: 8px;
  padding-left: 20px;
  color: #EBEBEB;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 12px;
`
const WalletIcon = styled.div`
  display: inline-block;
  width: 38px;
  height: 38px;
  border: $hr;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  margin-right: 23px;
  background-color: #fff;

  img {
    width: 100%;
  }
`

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/efcd618d59564cf4a3d52938d7987ec9",
  4: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884",
  5: "https://goerli.infura.io/v3/a47173ca28c74f979d0e74b3f2d50c7c",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  137: "https://rpc-mainnet.maticvigil.com/",
  1001: "https://api.baobab.klaytn.net:8651/",
  8217: "https://public-node-api.klaytnapi.com/v1/cypress",
  80001: "https://polygon-mumbai.infura.io/v3/8cc40e46fe8b4dda82d076ddaf007419"
};
const walletConnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL
});

const bsc = new BscConnector({
  supportedChainIds: [56, 97]
})

const wallets = {
  MetaMask: injected,
  BitKeep: injected,
  Coinbase: injected,
  WalletConnect: walletConnect,
  Ledger: ledger,
  BinanceSmartChainWallet: bsc,
  //TrustWallet: injected,
  //Squarelink: squarelink,
  //Torus: torus,
  //Aut
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const WalletConnect = ({ visible }) => {
  const { dispatch, state } = useContext(mainContext);
  const [tipVisible, setTipVisible] = useState(false)
  const [tipInfo, setTipInfo] = useState({ name: '', url: '' })
  const [isMobile, setIsMobile] = useState(false);
  const [isImToken, setIsImToken] = useState(false);
  const { activate, deactivate, library, account, active, chainId } = useActiveWeb3React();
  const {
    tronLibrary, tronAccount, tronChainId, tronActive,
    tronActivate, tronDeactivate
  } = useActiveTronWeb();

  const handleCancel = () => {
    dispatch({
      type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false
    });
  }

  const handleTipCancel = () => {
    setTipVisible(false)
  }

  const activeWeb3 = (name) => {
    tronDeactivate();
    activate(wallets[name], undefined, true)
      .then((e) => {
        dispatch({
          type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false
        });
        dispatch({
          type: HANDLE_WRONG_NETWORK, isWrongNetwork: false
        });
      })
      .catch((error) => {
        console.log(error)
        if (/Unsupported chain id/i.test(error.message)) {
          dispatch({
            type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false
          });
          dispatch({
            type: HANDLE_WRONG_NETWORK, isWrongNetwork: true
          });
        }
      });
  }

  const activeTronLink = () => {
    tronActivate().then(() => {
      dispatch({
        type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false
      });
    })
  }

  const onConnect = (name) => {
    if (name === 'TronLink') {
      if (!window.tronWeb) {
        setTipInfo({ name, url: 'https://www.tronlink.org/' })
        setTipVisible(true);
        return;
      }

      activeTronLink()
      window.localStorage.setItem('now_selected_chain', 'trx')
      window.localStorage.setItem('wallet_type', name)
      return;
    }

    if (name === 'BitKeep') {
      if (!window.isBitKeep) {
        setTipInfo({ name, url: 'https://bitkeep.com/' })
        setTipVisible(true);
        return
      }
      window.ethereum = window.bitkeep && window.bitkeep.ethereum;
    }

    if (name === 'Coinbase') {
      if (!window.coinbaseWalletRequestProvider) {
        setTipInfo({ name, url: 'https://www.coinbase.com/wallet' })
        setTipVisible(true);
        return
      }
      if (!window.ethereum.isCoinbaseWallet && window.ethereum.providerMap) {
        window.ethereum = window.ethereum.providerMap.get('CoinbaseWallet')
      }
    }

    if (name === 'MetaMask') {
      if (!window.ethereum) {
        setTipInfo({ name, url: 'https://metamask.io' })
        setTipVisible(true);
        return
      }
      if (window.ethereum.providerMap) {
        window.ethereum = window.ethereum.providerMap.get('MetaMask')
      }
    }
    activeWeb3(name)
    window.localStorage.setItem('now_selected_chain', 'eth')
    window.localStorage.setItem('wallet_type', name)
  }

  useEffect(() => {
    if (window.navigator.userAgent.indexOf('imToken') >= 0) {
      setIsImToken(true)
    }
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)) {
      setIsMobile(true)
    }

    const wallet_type = window.localStorage.getItem('wallet_type')
    let tronTimer;
    let tronNum = 0;
    if (wallet_type === 'TronLink') {
      tronTimer = setInterval(() => {
        // timeout, clearInterval
        if (tronNum > 2000) {
          if (window.tronWeb && !window.tronWeb.defaultAddress.base58) {
          }
          clearInterval(tronTimer)
          return;
        }
        tronNum += 20
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(tronTimer)
          activeTronLink()
        }
      }, 20)
    } else if (wallet_type) {
      activeWeb3(wallet_type)
    }

    if (window.ethereum && window.ethereum.on) {
      // window.ethereum.on('accountsChanged', (accounts) => {
      //   if (accounts.length === 0) {
      //     deactivate()
      //   }
      // })

      // window.ethereum.on('disconnect', () => {
      //   console.log('disconnect')
      //   deactivate()
      // })

      // window.ethereum.on('close', () => {
      //   console.log('close')
      //   deactivate()
      // })

      window.ethereum.on('message', message => {
        console.log('message', message)
      })

      window.ethereum.on('chainChanged', message => {
        const wallet_type = window.localStorage.getItem('wallet_type')
        if (wallet_type) {
          onConnect(wallet_type)
        }
        console.log('chainChanged', message)
      })

    }

    return () => {
      clearInterval(tronTimer)
    }
  }, [])

  useEffect(() => {
    if (active && account && library) {
      const obj = handleIsSignExpired('web3');
      if (!obj || obj.address !== account) {
        clearLocalStorage('web3')
        // get and save sign info, reload
        getSign(library, account, true).then(res => {
          window.location.reload()
        }).catch(err => {
          console.log(err)
        })
      }
    } else if (tronActive && tronAccount) {
      const obj = handleIsSignExpired('trx');
      if (!obj || obj.address !== tronAccount) {
        clearLocalStorage('trx')
        // get and save sign info, reload
        getSign(tronLibrary, tronAccount, true).then(res => {
          window.location.reload()
        }).catch(err => {
          console.log(err)
        })
      }
    }

  }, [active, account, tronActive, tronAccount])

  return (
    <>
      <Modal
        open={visible}
        onClose={handleCancel}
      >
        <Box sx={{ ...style }}>
          <Title>Connect a wallet</Title>
          <WalletItem onClick={() => { onConnect('MetaMask') }}>
            <WalletIcon>
              <img src={isImToken ? imTokenIcon : metaMaskIcon} alt="" />
            </WalletIcon>
            <span>{isImToken ? 'imToken' : 'MetaMask'}</span>
          </WalletItem>

          <WalletItem onClick={() => { onConnect('Coinbase') }}>
            <WalletIcon>
              <img src={Coinbase} />
            </WalletIcon>
            <span>Coinbase</span>
          </WalletItem>

          <WalletItem onClick={() => { onConnect('BitKeep') }}>
            <WalletIcon>
              <img src={bitKeep} alt="" />
            </WalletIcon>
            <span>BitKeep</span>
          </WalletItem>

          <WalletItem onClick={() => { onConnect('TronLink') }}>
            <WalletIcon>
              <img src={tronLinkIcon} alt="" />
            </WalletIcon>
            <span>TronLink</span>
          </WalletItem>

          {
            isMobile && <WalletItem onClick={() => { onConnect('MetaMask') }}>
              <WalletIcon>
                <img src={hyperPay} alt="" />
              </WalletIcon>
              <span>HyperPay</span>
            </WalletItem>
          }

          {
            isMobile && <WalletItem onClick={() => { onConnect('MetaMask') }}>
              <WalletIcon>
                <img src={universalIcon} alt="" />
              </WalletIcon>
              <span>Universal Wallet</span>
            </WalletItem>
          }

          <WalletItem onClick={() => { onConnect('WalletConnect') }}>
            <WalletIcon>
              <img src={walletConnectIcon} alt="" />
            </WalletIcon>
            <span>WalletConnect</span>
          </WalletItem>
        </Box>
      </Modal>

      <Modal
        open={tipVisible}
        onClose={handleTipCancel}
      >
        <Box sx={{ ...style }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '10px'
          }}>Install {tipInfo.name}.</div>
          <div style={{
            boxSizing: 'border-box',
            marginTop: 0,
            display: 'grid',
            rowGap: '48px',
            columnGap: '48px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.7,
              textAlign: 'center',
            }}>Install {tipInfo.name} to connect to DeFine.</div>
            <a href={tipInfo.url} target="_blank" rel="noreferrer">
              <button style={{
                padding: '16px 24px 16px 24px',
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '6px',
                transitionDuration: "300ms",
                cursor: 'pointer',
                backgroundColor: '#000',
                minHeight: '60px',
                textAlign: 'center',
                color: '#fff',
                outlineStyle: 'none',
                border: 'none',
                width: '100%'
              }}>Go to {tipInfo.name}'s website</button>
            </a>
          </div>
        </Box>
      </Modal>
    </>
  )
}
