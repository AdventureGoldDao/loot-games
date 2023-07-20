import { InjectedConnector } from "@web3-react/injected-connector"

import env from '../env';
import eth from "../assets/img/chain/corner_eth.svg"
import bnb from "../assets/img/chain/corner_bnb.svg";
import polygon from "../assets/img/chain/corner_polygon.svg";
import klaytn from "../assets/img/chain/corner_klaytn.svg";
import tron from "../assets/img/chain/corner_tron.svg";
import base from "../assets/img/chain/corner_base.svg";
import op from "../assets/img/chain/corner_op.svg";
import arb from "../assets/img/chain/corner_arb.svg";
import zk from "../assets/img/chain/corner_zk.svg";
import polygonCom from "assets/img/chain/com_polygon.svg";
import klaytnCom from "assets/img/chain/com_klaytn.svg";
import ethCom from "assets/img/chain/com_eth.svg";
import bnbCom from "assets/img/chain/com_bnb.svg";
import tronCom from "assets/img/chain/com_tron.svg";
import baseCom from "assets/img/chain/com_base.svg";
import opCom from "assets/img/chain/com_op.svg";
import arbCom from "assets/img/chain/com_arb.svg";
import zkCom from "assets/img/chain/com_zk.svg";
// import loot from "assets/img/chain/loot.svg";
import loot from "assets/img/chain/com_loot.svg";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 56, 97, 137, 280, 324, 420, 1001, 42161, 8217, 80001, 84531, 421613, 5151706, 9088912]
});

export const symbolImgObj = {
  'ETH': eth,
  'BNB': bnb,
  'MATIC': polygon,
  'KLAY': klaytn,
  'TRX': tron,
}

export const chainTypeImgObj = {
  mainnet: eth,
  basegoerli: base,
  ropsten: eth,
  rinkeby: eth,
  goerli: eth,
  optimism: op,
  optimisticgoerli: op,
  arbitrum: arb,
  nitrogoerli: arb,
  zksyncera: zk,
  zksynceratest: zk,
  bsc: bnb,
  bsctestnet: bnb,
  polygon: polygon,
  mumbai: polygon,
  klaytn: klaytn,
  baobab: klaytn,
  loot: loot,
  loottest: loot,
  tron: tron,
  shasta: tron
}

export const chainTypeComImgObj = {
  mainnet: ethCom,
  basegoerli: baseCom,
  ropsten: ethCom,
  rinkeby: ethCom,
  goerli: ethCom,
  optimism: opCom,
  optimisticgoerli: opCom,
  arbitrum: arbCom,
  nitrogoerli: arbCom,
  zksyncera: zkCom,
  zksynceratest: zkCom,
  bsc: bnbCom,
  bsctestnet: bnbCom,
  polygon: polygonCom,
  mumbai: polygonCom,
  klaytn: klaytnCom,
  baobab: klaytnCom,
  tron: tronCom,
  shasta: tronCom,
  loot: loot,
  loottest: loot
}

export const chains = env.ENV === 'development' ? [
  { label: 'Ethereum', value: 'mainnet' },
  { label: 'Rinkeby', value: 'rinkeby' },
  { label: 'Goerli', value: 'goerli' },
  { label: 'Ropsten', value: 'ropsten' },
  { label: 'Base Goerli', value: 'basegoerli' },
  { label: 'Optimism', value: 'optimism' },
  { label: 'Optimism Goerli', value: 'optimisticgoerli' },
  { label: 'Arbitrum', value: 'arbitrum' },
  { label: 'Arbitrum Goerli', value: 'nitrogoerli' },
  { label: 'zkSync Era', value: 'zksyncera' },
  { label: 'zkSync Era Test', value: 'zksynceratest' },
  { label: 'BSC', value: 'bsc' },
  { label: 'Bsctestnet', value: 'bsctestnet' },
  { label: 'Polygon', value: 'polygon' },
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Klaytn', value: 'klaytn' },
  { label: 'Baobab', value: 'baobab' },
  { label: 'Tron', value: 'tron' },
  { label: 'Shasta', value: 'shasta' },
] : [
  { label: 'Ethereum', value: 'mainnet' },
  { label: 'Base Goerli', value: 'basegoerli' },
  { label: 'Optimism', value: 'optimism' },
  { label: 'Arbitrum', value: 'arbitrum' },
  { label: 'zkSync Era', value: 'zksyncera' },
  { label: 'BSC', value: 'bsc' },
  { label: 'Polygon', value: 'polygon' },
  { label: 'Klaytn', value: 'klaytn' },
  { label: 'Tron', value: 'tron' },
]

export const chainArr = [
  { name: 'Ethereum Goerli', icon: eth, value: 'goerli', chainId: 5 },
  { name: 'Loot Test', icon: loot, value: 'loottest', chainId: 9088912 },
  // { name: 'Base Goerli', icon: base },
  // { name: 'Optimism', icon: op },
  // { name: 'Arbitrum', icon: arb },
  // { name: 'zkSync Era', icon: zk },
  // { name: 'BSC', icon: bnb },
  // { name: 'Polygon', icon: polygon },
  // { name: 'Klaytn', icon: klaytn },
  // { name: 'Tron', icon: tron }
]

export const SUPPORTED_CHAINS = {
  5: {
    chainId: 5,
    name: 'Goerli Ethereum',
    icon: eth,
    value: 'goerli'
  },
  9088912: {
    chainId: 9088912,
    name: 'Loot Chain Testnet',
    icon: loot,
    value: 'loottest'
  }
}

export const chainTxtObj = {
  mainnet: "Ethereum",
  goerli: "Ethereum Goerli",
  loot: "Loot",
  loottest: "Loot Test",
  basegoerli: "Base Goerli",
  optimism: "Optimism",
  optimisticgoerli: "Optimism",
  arbitrum: "Arbitrum",
  nitrogoerli: "Arbitrum",
  zksyncera: "zkSync Era",
  zksynceratest: "zkSync Era",
  ropsten: "Ethereum ropsten",
  rinkeby: "Ethereum rinkeby",
  bsc: "BSC",
  bsctestnet: "BSC test",
  polygon: "Polygon",
  mumbai: "mumbai",
  klaytn: "Klaytn",
  baobab: "baobab",
  tron: "Tron",
  shasta: "shasta"
}

export const handleHistoryAddress = (chainType, address) => {
  switch (chainType) {
    case 'tron':
      return 'https://tronscan.io/#/contract/' + address
    case 'shasta':
      return 'https://shasta.tronscan.io/#/contract/' + address
    case 'mainnet':
      return 'https://etherscan.io/address/' + address
    case 'rinkeby':
      return 'https://rinkeby.etherscan.io/address/' + address
    case 'goerli':
      return 'https://goerli.etherscan.io/address/' + address
    case 'ropsten':
      return 'https://ropsten.etherscan.io/address/' + address
    case 'bsc':
      return 'https://bscscan.com/address/' + address
    case 'bsctestnet':
      return 'https://testnet.bscscan.com/address/' + address
    case 'polygon':
      return 'https://polygonscan.com/address/' + address
    case 'mumbai':
      return 'https://mumbai.polygonscan.com/address/' + address
    case 'klaytn':
      return 'https://scope.klaytn.com/account/' + address
    case 'baobab':
      return 'https://baobab.scope.klaytn.com/account/' + address
    case 'basegoerli':
      return 'https://goerli.basescan.org/address/' + address
    case 'optimism':
      return 'https://optimistic.etherscan.io/address/' + address
    case 'optimisticgoerli':
      return 'https://goerli-optimism.etherscan.io/address/' + address
    case 'arbitrum':
      return 'https://arbiscan.io/address/' + address
    case 'nitrogoerli':
      return 'https://goerli.arbiscan.io/address/' + address
    case 'zksyncera':
      return 'https://explorer.zksync.io/address/' + address
    case 'zksynceratest':
      return 'https://zksync2-testnet.zkscan.io/address/' + address
    case 'loottest':
      return 'https://loot.calderaexplorer.xyz/address/' + address
    default:
      return 'https://etherscan.io/address/' + address
  }
}

export const handleHistoryTx = (chainType, txHash) => {
  switch (chainType) {
    case 'tron':
      return 'https://tronscan.io/#/transaction/' + txHash
    case 'shasta':
      return 'https://shasta.tronscan.io/#/transaction/' + txHash
    case 'mainnet':
      return 'https://etherscan.io/tx/' + txHash
    case 'rinkeby':
      return 'https://rinkeby.etherscan.io/tx/' + txHash
    case 'goerli':
      return 'https://goerli.etherscan.io/tx/' + txHash
    case 'ropsten':
      return 'https://ropsten.etherscan.io/tx/' + txHash
    case 'bsc':
      return 'https://bscscan.com/tx/' + txHash
    case 'bsctestnet':
      return 'https://testnet.bscscan.com/tx/' + txHash
    case 'polygon':
      return 'https://polygonscan.com/tx/' + txHash
    case 'mumbai':
      return 'https://mumbai.polygonscan.com/tx/' + txHash
    case 'klaytn':
      return 'https://scope.klaytn.com/tx/' + txHash
    case 'baobab':
      return 'https://baobab.scope.klaytn.com/tx/' + txHash
    case 'basegoerli':
      return 'https://goerli.basescan.org/tx/' + txHash
    case 'optimism':
      return 'https://optimistic.etherscan.io/tx/' + txHash
    case 'optimisticgoerli':
      return 'https://goerli-optimism.etherscan.io/tx/' + txHash
    case 'arbitrum':
      return 'https://arbiscan.io/tx/' + txHash
    case 'nitrogoerli':
      return 'https://goerli.arbiscan.io/tx/' + txHash
    case 'zksyncera':
      return 'https://explorer.zksync.io/tx/' + txHash
    case 'zksynceratest':
      return 'https://zksync2-testnet.zkscan.io/tx/' + txHash
    default:
      return 'https://etherscan.io/tx/' + txHash
  }
}

export const handleHolders = (chainType, address) => {
  switch (chainType) {
    case 'tron':
      return 'https://tronscan.io/#/token721/' + address + '/holders'
    case 'shasta':
      return 'https://shasta.tronscan.io/#/token721/' + address + '/holders'
    case 'mainnet':
      return 'https://etherscan.io/token/' + address + '#balances'
    case 'rinkeby':
      return 'https://rinkeby.etherscan.io/token/' + address + '#balances'
    case 'goerli':
      return 'https://goerli.etherscan.io/token/' + address + '#balances'
    case 'ropsten':
      return 'https://ropsten.etherscan.io/token/' + address + '#balances'
    case 'bsc':
      return 'https://bscscan.com/token/' + address + '#balances'
    case 'bsctestnet':
      return 'https://testnet.bscscan.com/token/' + address + '#balances'
    case 'polygon':
      return 'https://polygonscan.com/token/' + address + '#balances'
    case 'mumbai':
      return 'https://mumbai.polygonscan.com/token/' + address + '#balances'
    case 'klaytn':
      return 'https://scope.klaytn.com/nft/' + address + '?tabId=nftHolder'
    case 'baobab':
      return 'https://baobab.scope.klaytn.com/nft/' + address + '?tabId=nftHolder'
    case 'basegoerli':
      return 'https://goerli.basescan.org/token/' + address + '#balances'
    case 'optimism':
      return 'https://optimistic.etherscan.io/token/' + address + '#balances'
    case 'optimisticgoerli':
      return 'https://goerli-optimism.etherscan.io/token/' + address + '#balances'
    case 'arbitrum':
      return 'https://arbiscan.io/token/' + address + '#balances'
    case 'nitrogoerli':
      return 'https://goerli.arbiscan.io/token/' + address + '#balances'
    case 'zksyncera':
      return 'https://explorer.zksync.io/token/' + address + '#balances'
    case 'zksynceratest':
      return 'https://zksync2-testnet.zkscan.io/token/' + address + '#balances'
    default:
      return 'https://etherscan.io/token/' + address + '#balances'
  }
}

export const setupEthMainnet = async (chainId) => {
  if (chainId === 1) {
    return
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x1`,
        }]
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupEthGoerli = async (chainId) => {
  if (chainId === 5) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x5`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x5`,
            chainName: 'Goerli test network',
            nativeCurrency: {
              name: 'GoerliETH',
              symbol: 'GoerliETH',
              decimals: 18,
            },
            rpcUrls: [
              "https://goerli.infura.io/v3/"
            ],
            blockExplorerUrls: ['https://goerli.etherscan.io']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupLootTest = async (chainId) => {
  if (chainId === 9088912) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x8aaf90`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x8aaf90`,
            chainName: 'Loot Chain Testnet',
            nativeCurrency: {
              name: 'AGLD',
              symbol: 'AGLD',
              decimals: 18,
            },
            rpcUrls: [
              "https://testnet.rpc.lootchain.com/http"
            ],
            blockExplorerUrls: ['https://testnet.explorer.lootchain.com/']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupLootMainnet = async (chainId) => {
  if (chainId === 5151706) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x4e9bda`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x4e9bda`,
            chainName: 'Loot Mainnet',
            nativeCurrency: {
              name: 'AGLD',
              symbol: 'AGLD',
              decimals: 18,
            },
            rpcUrls: [
              "https://rpc.lootchain.com/http"
            ],
            blockExplorerUrls: ['https://explorer.lootchain.com/']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupBscMainnet = async (chainId) => {
  if (chainId === 56) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x38`,
          chainName: 'Binance Smart Chain Mainnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: [
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed.binance.org"
          ],
          blockExplorerUrls: ['https://bscscan.com/']
        }]
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupPolygonMainnet = async (chainId) => {
  if (chainId === 137) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x89`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x89`,
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: [
              "https://polygon-rpc.com/",
              "https://rpc-mainnet.maticvigil.com/"
            ],
            blockExplorerUrls: ['https://polygonscan.com/']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupMumbai = async (chainId) => {
  if (chainId === 80001) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x13881`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x13881`,
            chainName: 'Polygon Mumbai',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: [
              "https://polygon-mumbai.infura.io/v3/8cc40e46fe8b4dda82d076ddaf007419",
            ],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupKlaytnMainnet = async (chainId) => {
  if (chainId === 8217) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x2019`,
          chainName: 'Klaytn Cypress',
          nativeCurrency: {
            name: 'KLAY',
            symbol: 'KLAY',
            decimals: 18,
          },
          rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
          blockExplorerUrls: ['https://scope.klaytn.com/']
        }]
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupBaseMainnet = async (chainId) => {
  if (chainId === 84531) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x14a33`,
          chainName: 'Base Goerli',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ["https://goerli.base.org"],
          blockExplorerUrls: ['https://goerli.basescan.org']
        }]
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupOptimismMainnet = async (chainId) => {
  if (chainId === 10) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0xa`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0xa`,
            chainName: 'Optimism',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ["https://mainnet.optimism.io"],
            blockExplorerUrls: ['https://explorer.optimism.io']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupArbitrumMainnet = async (chainId) => {
  if (chainId === 42161) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0xa4b1`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0xa4b1`,
            chainName: 'Arbitrum One',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ["https://arb1.arbitrum.io/rpc"],
            blockExplorerUrls: ['https://explorer.arbitrum.io']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const setupZkSyncEraMainnet = async (chainId) => {
  if (chainId === 324) {
    return;
  }
  try {
    await injected.getProvider().then(provider => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x144`
        }]
      }).catch(err => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x144`,
            chainName: 'zkSync Era Mainnet',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ["https://mainnet.era.zksync.io"],
            blockExplorerUrls: ['https://explorer.zksync.io']
          }]
        })
      })
      return true
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const chainFun = {
  'mainnet': setupEthMainnet,
  'goerli': setupEthGoerli,
  'loottest': setupLootTest,
  'loot': setupLootMainnet,
}


