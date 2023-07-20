import ERC721 from "../web3/abi/ERC721.json";
import ERC1155 from "../web3/abi/ERC1155.json";
import DFA721 from "../web3/abi/DFA721NFT.json";
import DFA1155 from "../web3/abi/DFA1155NFT.json";
import EnglishAuctionNFT from "../web3/abi/EnglishAuctionNFT.json";
import FixedSwapNFT from "../web3/abi/FixedSwapNFT.json";
import NFTIndexer from "../web3/abi/NFTIndexer.json";
import DeFineAmpl from "../web3/abi/DeFineAmpl.json";
import DeFineLoot from "../web3/abi/DeFineLoot.json";
import DeFineBadgeBlindBox from "../web3/abi/DeFineBadgeBlindBox.json";
import ZKDeFineBadgeBlindBox from "../web3/zkAbi/DeFineBadgeBlindBox.json";
import ZKDeFineBadgeForBlindBox from "../web3/zkAbi/DeFineBadgeForBlindBox.json";
import ZKDFA721NFT from "../web3/zkAbi/DFA721NFT.json";
import DeFineBadgeForBlindBox from "../web3/abi/DeFineBadgeForBlindBox.json";
import DeFineStake from "../web3/abi/DeFineStakingPool.json";
import DeFineStakeLock from "../web3/abi/DeFineStakingPoolLongTime.json";
import DeFineSypoolRedeem from "../web3/abi/DeFineSypoolRedeem.json";
import ERC20 from "../web3/abi/ERC20.json";
import DeFineSypool from "../web3/abi/DeFineSypoolNFT.json";
import DeFineBlindBox from "../web3/abi/DeFineBlindBox.json";
import DeFinePuzzle from "../web3/abi/DeFinePuzzle.json";
import DeFineSeason from "../web3/abi/DeFineSeason.json";
import ClaimReward from "../web3/abi/ClaimReward.json";
import FreeMint721 from "../web3/abi/FreeMint721NFT.json";
import { abi as VaultRewardAbi } from "../web3/abi/VaultReward.json";
import { getToken, getTokenTron } from "../utils/tokenList";
import { getContract } from "../web3";
import {
    getSypoolRedeemAddress, getFixswapAddress, getNFTTokenAddress, getNFT721Address,
    getNFT1155Address, getEnglishAuctionNFTAddress, getNFTIndexerAddress, getAmplAddress,
    getSypoolAddress, getLootAddress
} from "../web3/address";
import {formatUnits} from "@ethersproject/units";
import {ContractFactory, Web3Provider} from "zksync-web3";


const ERC721Contract = (library, chainId) => {
    return getContract(library, ERC721.abi, getNFT721Address(chainId))
}

const ERC1155Contract = (library, chainId) => {
    return getContract(library, ERC1155.abi, getNFT1155Address(chainId))
}

const DFA721Contract = (library, chainId) => {
    return getContract(library, DFA721.abi, getNFT721Address(chainId))
}

const amplContract = (library, chainId) => {
    return getContract(library, DeFineAmpl.abi, getAmplAddress(chainId))
}
const lootContract = (library, contractAddress) => {
    return getContract(library, DeFineLoot.abi, contractAddress)
}
const blindBadgeContract = (library, contractAddress) => {
    return getContract(library, DeFineBadgeBlindBox.abi, contractAddress)
}
export const stakeContract = (library, contractAddress, chainType) => {
    return getContract(library, DeFineStake.abi, contractAddress, chainType)
}
export const stakeLockContract = (library, contractAddress, chainType) => {
    return getContract(library, DeFineStakeLock.abi, contractAddress, chainType)
}
const sypoolContract = (library, contractAddress) => {
    return getContract(library, DeFineSypool.abi, contractAddress)
}

export const getSypoolRedeemContract = (library, contractAddress) => {
    return getContract(library, DeFineSypoolRedeem.abi, contractAddress)
}

const DFA1155Contract = (library, chainId) => {
    return getContract(library, DFA1155.abi, getNFT1155Address(chainId))
}

export const getERC20Contract = (library, contractAddress, chainType) => {
    return getContract(library, ERC20.abi, contractAddress, chainType)
}

export const getERC721Contract = (library, contractAddress) => {
    return getContract(library, ERC721.abi, contractAddress)
}
export const getERC1155Contract = (library, contractAddress) => {
    return getContract(library, ERC1155.abi, contractAddress)
}

const EnglishAuctionNFTContract = (library, chainId) => {
    return getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
}

const FixedSwapNFTContract = (library, chainId) => {
    return getContract(library, FixedSwapNFT.abi, getFixswapAddress(chainId))
}

const NFTIndexerContract = (library, chainId) => {
    return getContract(library, NFTIndexer.abi, getNFTIndexerAddress(chainId))
}

export const createNFT = async (library, chainId, address, params, type) => {
    if (type === "ERC721") {
        return await DFA721Contract(library, chainId).methods.mint()
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    } else {
        return await DFA1155Contract(library, chainId).methods.mint(params.amount, params.data)
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    }
}

export const claimBadge = async (library, chainId, address, params) => {
    return await amplContract(library, chainId).methods.mint(
        params.id,
        params.rebaseDays,
        params.positive,
        params.nonce,
        params.signature,
        '0x'
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const claimLoot = async (library, contractAddress, address, params) => {
    return await lootContract(library, contractAddress).methods.mint(
        params.badgeType,
        params.nonce,
        params.signature
    ).send({
        from: address,
        gasPrice: contractAddress.toLowerCase() === '0xb318391a5989ef4a5eb740579ab3edac0bbfd615' ? '100' + '000000000' : undefined
    })
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const claimBlindBadge = async (library, contractAddress, address, params) => {
    return await blindBadgeContract(library, contractAddress).methods.mintBox(
        params.name,
        params.nonce,
        params.signature,
        params.maxCount,
    ).send({
        from: address,
        value: params.price,
        gasPrice: contractAddress.toLowerCase() === '0x04186ae21c010f0501f20367bb641bfd91ed1e19' ? '100' + '000000000' : undefined
    })
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const stakeDfa = async (library, contractAddress, address, params) => {
    return await stakeContract(library, contractAddress).methods.stake(
        params.poolId,
        params.amount
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const unstakeDfa = async (library, contractAddress, address, params) => {
    return await stakeContract(library, contractAddress).methods.withdraw(
        params.poolId,
        params.amount
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const claimEarn = async (library, contractAddress, address, params) => {
    return await stakeContract(library, contractAddress).methods.getReward(
        params.poolId
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const stakeBadge = async (library, contractAddress, address, params) => {
    return await stakeContract(library, contractAddress).methods.stakeBadge(
        params.poolId,
        params.badgeAddress,
        params.tokenId,
        params.badgeType
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const unstakeBadge = async (library, contractAddress, address, params) => {
    return await stakeContract(library, contractAddress).methods.unstakeBadge(
        params.poolId,
        params.badgeAddress,
        params.tokenId,
        params.badgeType
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const getEarn = async (library, contractAddress, address, params) => {
    // debugger;
    return await stakeContract(library, contractAddress).methods.earned(
        params.poolId,
        address,
    ).call()

}

export const reserveWithdrawDfa = async (library, contractAddress, address, params) => {
    return await stakeLockContract(library, contractAddress).methods.reserveWithdraw(
        params.poolId,
        params.amount
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const reserveReward = async (library, contractAddress, address, params) => {
    return await stakeLockContract(library, contractAddress).methods.getReward(
        params.poolId,
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const withdrawDfa = async (library, contractAddress, address, params) => {
    return await stakeLockContract(library, contractAddress).methods.withdraw(
        params.poolId,
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const cancelReserveWithdrawDfa = async (library, contractAddress, address, params) => {
    return await stakeLockContract(library, contractAddress).methods.cancelReserveWithdraw(
        params.poolId,
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}


export const sypoolMint = async (library, contractAddress, address, params) => {
    return await sypoolContract(library, contractAddress).methods.mint(
        params.poolId
    ).send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const sellNFT = async (type, address, params, library, chainId) => {
    if (type === 'ERC721') {
        return await FixedSwapNFTContract(library, chainId).methods.createErc721WithStartTime(
            params.name,
            params.token0,
            params.token1,
            params.tokenId,
            params.amountTotal1,
            params.duration,
            params.startTime,
            false)
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    } else {
        return await FixedSwapNFTContract(library, chainId).methods.createErc1155WithStartTime(
            params.name,
            params.token0,
            params.token1,
            params.tokenId,
            params.amountTotal0,
            params.amountTotal1,
            params.duration,
            params.startTime,
            false)
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    }
}

export const auctionNFT = async (type, address, params, library, chainId) => {
    if (type === 'ERC721') {
        return await EnglishAuctionNFTContract(library, chainId).methods.createErc721WithStartTime(
            params.name,
            params.token0,
            params.token1,
            params.tokenId,
            params.amountMin1,
            params.amountMinIncr1,
            params.confirmTime,
            params.addTime,
            params.startTime)
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    } else {
        return await EnglishAuctionNFTContract(library, chainId).methods.createErc1155WithStartTime(
            params.name,
            params.token0,
            params.token1,
            params.tokenId,
            params.amountMin1,
            params.amountMinIncr1,
            params.confirmTime,
            params.addTime,
            params.startTime)
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    }
}
export const transferNft = async (type, address, library, contractAddress, params) => {
    if (type === 'ERC721') {
        return await getERC721Contract(library, contractAddress).methods.safeTransferFrom(
            params.from,
            params.to,
            params.tokenId
        )
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    } else {
        return await getERC1155Contract(library, contractAddress).methods.safeTransferFrom(
            params.from,
            params.to,
            params.tokenId,
            params.ammount,
            params.data
        )
            .send({from: address})
            .on('transcationHash', params._onTranscationHash)
            .on('receipt', params._onReceipt)
            .on('error', params._onError)
    }
}

export const creatorClaimBeforeEnd = async (index, address, library, chainId, params) => {
    return await FixedSwapNFTContract(library, chainId).methods.creatorClaim(index)
        .send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const creatorClaimAfterEnd = async (index, address, library, chainId, params) => {
    return await EnglishAuctionNFTContract(library, chainId).methods._creatorClaim(index)
        .send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const fixedBuyNFT = async (index, amount, address, library, chainId, params) => {
    return await FixedSwapNFTContract(library, chainId).methods.swap(index, amount)
        .send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const bid = async (address, index, bidAmount, library, chainId, params) => {
    return await FixedSwapNFTContract(library, chainId).methods.swap(index, bidAmount)
        .send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const bidderClaim = async (address, index, library, chainId, params) => {
    return await EnglishAuctionNFTContract(library, chainId).methods.bidderClaim(index)
        .send({from: address})
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}

export const get721AuctionPoolId = async (tokenId, library, chainId, contractAddress) => {
    return await NFTIndexerContract(library, chainId).methods.get721Auction(contractAddress, tokenId).call()
}

export const get1155AuctionPoolId = async (token_owner_address, tokenId, chainId, library, contractAddress) => { //get 1155 auction pool id
    return await NFTIndexerContract(library, chainId).methods.get1155Auction(contractAddress, token_owner_address, tokenId).call()
}

export const get721SwapPoolId = async (tokenId, library, chainId, contractAddress) => {//get 721 swap pool id
    return await NFTIndexerContract(library, chainId).methods.get721Fixswap(contractAddress, tokenId).call()
}

export const get1155SwapPoolId = async (token_owner_address, tokenId, chainId, library, contractAddress) => {//get 1155 swap pool id
    return await NFTIndexerContract(library, chainId).methods.get1155Fixswap(contractAddress, token_owner_address, tokenId).call()
}

export const getAuctionPool = async (poolid, tokenId, address, library, chainId) => {
    const contract = EnglishAuctionNFTContract(library, chainId)
    const pool_count = await contract.methods.getPoolCount().call()
    if (pool_count == 0)
        return
    const pool = await contract.methods.pools(poolid).call()
    if (tokenId < 0 || pool.tokenId != tokenId) {
        return
    }
    if (poolid == 0 && pool && pool.tokenId != tokenId) {
        return
    }
    pool.index = poolid
    pool.isMine = pool.creator.toLowerCase() === address.toLowerCase()
    pool.currentPrice = await contract.methods.currentBidderAmount(poolid).call()
    pool.creatorClaimedP = await contract.methods.creatorClaimedP(poolid).call()
    pool.currentBidderAmount = await contract.methods.currentBidderAmount(poolid).call()
    const currentBider = await contract.methods.currentBidderP(poolid).call()
    const currentBidderAmount1P = await contract.methods.currentBidderAmount1P(poolid).call()
    const bidder = await contract.methods.currentBidderP(poolid).call()
    const token1 = await contract.methods.token1P(poolid).call()
    pool.isWinner = bidder.toLowerCase() === address.toLowerCase()
    pool.LastPrice = bidder !== "0x0000000000000000000000000000000000000000" ? currentBidderAmount1P : pool.currentPrice
    if (pool.LastPrice <= 0) {
        pool.LastPrice = pool.amountMin1
    }
    const start_time = await contract.methods.getStartTime(poolid).call()
    pool.startAt = start_time
    const date = new Date(pool.closeAt * 1000)
    const now = new Date()
    pool.amountTotal0 = 1
    pool.type = 'bid'
    pool.bidder = bidder !== "0x0000000000000000000000000000000000000000"
    pool.status = (date - now) > 0 ? 'live' : 'closed'
    pool.token1 = await contract.methods.token1P(poolid).call()
    pool.token1Info = getToken(pool.token1, chainId)
    if (!pool.token1Info) {
        return
    }
    const bid = await contract.methods.myBidderAmount1P(address, poolid).call()
    pool.bid = bid > 0
    return pool
}

export const getSwapPool = async (poolid, tokenId, address, library, chainId) => {
    const contract = FixedSwapNFTContract(library, chainId)
    const pool_count = await contract.methods.getPoolCount().call()
    if (pool_count == 0)
        return
    const pool = await contract.methods.pools(poolid).call()
    if (tokenId < 0 || pool.tokenId != tokenId) {
        return
    }
    if (poolid == 0 && pool && pool.tokenId != tokenId) {
        return
    }
    const swappedAmount0 = await contract.methods.swappedAmount0P(poolid).call()
    const start_time = await contract.methods.getStartTime(poolid).call()
    pool.index = poolid
    pool.isMine = pool.creator.toLowerCase() === address.toLowerCase()
    pool.type = 'swap'
    pool.price = pool.amountTotal1 / pool.amountTotal0;
    pool.amount0 = pool.amountTotal0 - swappedAmount0;
    pool.token1Info = getToken(pool.token1, chainId)
    if (!pool.token1Info) {
        return
    }
    const date = new Date(pool.closeAt * 1000)
    const now = new Date()
    pool.status = (date - now) > 0 ? 'live' : 'closed'
    pool.startAt = start_time
    return pool
}

export const getTronAuctionPool = async (poolid, tokenId, address, library, chainId) => {
    const contract = window.tronWeb.contract(EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    const pool_count = formatUnits(await contract.getPoolCount().call(), 0)

    if (pool_count == 0)
        return

    const pool = await contract.pools(poolid).call()
    if (tokenId < 0 || pool.tokenId != tokenId) {
        return
    }

    if (poolid == 0 && pool && pool.tokenId != tokenId) {
        return
    }

    pool.index = poolid
    pool.isMine = window.tronWeb.address.fromHex(pool.creator).toLowerCase() === address.toLowerCase()
    pool.currentPrice = formatUnits(await contract.currentBidderAmount(poolid).call(), 0)
    pool.creatorClaimedP = await contract.creatorClaimedP(poolid).call()
    pool.currentBidderAmount = formatUnits(await contract.currentBidderAmount(poolid).call(), 0)
    const currentBidderAmount1P = formatUnits(await contract.currentBidderAmount1P(poolid).call(), 0)
    let bidder = await contract.currentBidderP(poolid).call()
    bidder = window.tronWeb.address.fromHex(bidder)
    const token1 = await contract.token1P(poolid).call()
    pool.isWinner = bidder.toLowerCase() === address.toLowerCase()
    pool.LastPrice = bidder !== "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb" ? currentBidderAmount1P : formatUnits(pool.currentPrice, 0)

    if (pool.LastPrice <= 0) {
        pool.LastPrice = pool.amountMin1
    }
    const start_time = await contract.methods.getStartTime(poolid).call()
    pool.startAt = start_time
    const date = new Date(formatUnits(pool.closeAt, 0) * 1000)
    const now = new Date()
    pool.amountTotal0 = 1
    pool.type = 'bid'
    pool.bidder = bidder !== "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
    pool.status = (date - now) > 0 ? 'live' : 'closed'
    pool.token1 = await contract.token1P(poolid).call()
    pool.token1Info = getTokenTron(window.tronWeb.address.fromHex(pool.token1))
    if (!pool.token1Info) {
        return
    }
    const bid = await contract.myBidderAmount1P(address, poolid).call()
    pool.bid = bid > 0
    return pool
}

export const getTronSwapPool = async (poolid, tokenId, address, library, chainId) => {
    const contract = window.tronWeb.contract(FixedSwapNFT.abi, getFixswapAddress(chainId))
    const pool_count = formatUnits(await contract.getPoolCount().call(), 0)
    if (pool_count == 0)
        return
    const pool = await contract.pools(poolid).call()
    if (tokenId < 0 || pool.tokenId != tokenId) {
        return
    }
    if (poolid == 0 && pool && pool.tokenId != tokenId) {
        return
    }

    const swappedAmount0 = await contract.swappedAmount0P(poolid).call()
    const start_time = await contract.getStartTime(poolid).call()
    pool.index = poolid
    pool.isMine = window.tronWeb.address.fromHex(pool.creator).toLowerCase() === address.toLowerCase()
    pool.type = 'swap'
    pool.price = formatUnits(pool.amountTotal1, 0) / formatUnits(pool.amountTotal0, 0)
    pool.amount0 = pool.amountTotal0 - swappedAmount0;
    pool.token1Info = getTokenTron(window.tronWeb.address.fromHex(pool.token1))
    if (!pool.token1Info) {
        return
    }
    const date = new Date(formatUnits(pool.closeAt, 0) * 1000)
    const now = new Date()
    pool.status = (date - now) > 0 ? 'live' : 'closed'
    pool.startAt = start_time
    return pool
}

export const getTokenOwner = async (library, chainId, tokenId) => {
    return await ERC721Contract(library, getNFTTokenAddress(chainId)).methods.ownerOf(tokenId).call()
}

export const getTokenBalanceBeforeAuction = async (library, chainId, address, tokenId) => {
    return await ERC1155Contract(library, getNFTTokenAddress(chainId)).methods.balanceOf(address, tokenId).call()
}

export const mintBlindBox = async (library, contractAddress, address, params) => {
    let sendPar = {}
    if (params.mintType === 'approve') {
        sendPar = {from: address}
    } else {
        sendPar = {from: address, value: params.price}
    }
    return await getContract(library, DeFineBlindBox.abi, contractAddress).methods.mintBox(params.type)
        .send(sendPar)
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const mintPuzzleBox = async (library, contractAddress, address, params) => {
    let sendPar = {from: address, value: params.price}
    return await getContract(library, DeFinePuzzle.abi, contractAddress).methods.mintBox(params.boxName, params.amount)
        .send(sendPar)
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const compoundPuzzle = async (library, contractAddress, address, params) => {
    let sendPar = {from: address}
    return await getContract(library, DeFinePuzzle.abi, contractAddress).methods.compound(params.boxName)
        .send(sendPar)
        .on('transcationHash', params._onTranscationHash)
        .on('receipt', params._onReceipt)
        .on('error', params._onError)
}
export const getSeasonRedeemContract = (library, contractAddress) => {
    return getContract(library, DeFineSeason.abi, contractAddress)
}

export const getIsArtist = async (chainId, account, library) => {
    const nftAddress = getNFTTokenAddress(chainId)
    let isArtist;
    if (chainId === 'tron' || chainId === 'shasta') {
        const nft = await window.tronWeb.contract(DFA721.abi, nftAddress);
        isArtist = await nft.artist(account).call()
    } else {
        const nft = getContract(library, DFA721.abi, nftAddress)
        isArtist = await nft.methods.artist(account).call()
    }
    return isArtist;
}
export const getClaimContract = (library, contractAddress) => {
    return getContract(library, ClaimReward.abi, contractAddress)
}
export const getVaultRewardContract = (library, contractAddress) => {
    return getContract(library, VaultRewardAbi, contractAddress)
}
export const deployDeFineBadgeForBlindBox = (library, address, chainType) => {
    const data = {};

    if (library?._network?.chainId == 280 || library?._network?.chainId == 324) {
        const provider = new Web3Provider(window.ethereum);
        const contractFactory = new ContractFactory(ZKDeFineBadgeForBlindBox.abi, ZKDeFineBadgeForBlindBox.bytecode, provider.getSigner());
        return contractFactory.deploy(
            "DeFine Badge",
            "DFB",
            `https://api.de-fine.art/api/badges/${chainType}/`,
            "0x5b39a2ed502ab5ea5804d8db3e85e178c9e584ad"
        ).then(async contract => {
            const res = await contract.deployTransaction.wait();
            data.transactionHash = res.transactionHash
            data.address = res.contractAddress
            data.blockNumber = res.blockNumber
            return data;
        });
    }

    const myContract = getContract(library, DeFineBadgeForBlindBox.abi);

    return myContract.deploy({
        data: DeFineBadgeForBlindBox.bytecode,
        arguments: [
            "DeFine Badge",
            "DFB",
            `https://api.de-fine.art/api/badges/${chainType}/`,
            "0x5b39a2ed502ab5ea5804d8db3e85e178c9e584ad"
        ]
    }).send({from: address})
        .on('error', function (error) {
            // console.log('error___', error)
        })
        .on('receipt', function (receipt) {
            data.transactionHash = receipt.transactionHash
            data.address = receipt.contractAddress
            data.blockNumber = receipt.blockNumber
        })
        .then(function (a) {
            return data;
        });
}
export const getDeFineBadgeForBlindBoxContract = (library, contractAddress) => {
    return getContract(library, DeFineBadgeForBlindBox.abi, contractAddress)
}
export const getDeFineBlindBoxContract = (library, contractAddress) => {
    return getContract(library, DeFineBadgeBlindBox.abi, contractAddress)
}
export const deployDeFineBadgeBlindBox = (library, address) => {
    const signer = '0x5b39a2ed502ab5ea5804d8db3e85e178c9e584ad';
    const data = {};

    if (library?._network?.chainId == 280 || library?._network?.chainId == 324) {
        const provider = new Web3Provider(window.ethereum);
        const contractFactory = new ContractFactory(ZKDeFineBadgeBlindBox.abi, ZKDeFineBadgeBlindBox.bytecode, provider.getSigner());
        return contractFactory.deploy(signer).then(async contract => {
            const res = await contract.deployTransaction.wait();
            data.transactionHash = res.transactionHash
            data.address = res.contractAddress
            data.blockNumber = res.blockNumber
            return data;
        });
    }

    const myContract = getContract(library, DeFineBadgeBlindBox.abi);

    return myContract.deploy({
        data: DeFineBadgeBlindBox.bytecode,
        arguments: [
            signer
        ]
    }).send({from: address})
        .on('error', function (error) {
            // console.log('error___', error)
        })
        .on('receipt', function (receipt) {
            data.transactionHash = receipt.transactionHash
            data.address = receipt.contractAddress
            data.blockNumber = receipt.blockNumber
        })
        .then(function () {
            return data;
        });
}

export const deployNFT721 = (library, address, name, symbol, chainType) => {
    const data = {};

    if (library?._network?.chainId == 280 || library?._network?.chainId == 324) {
        const provider = new Web3Provider(window.ethereum);
        const contractFactory = new ContractFactory(ZKDFA721NFT.abi, ZKDFA721NFT.bytecode, provider.getSigner());
        return contractFactory.deploy(
            name,
            symbol,
            `https://api.de-fine.art/api/tokens/${chainType}/`
        ).then(async contract => {
            const res = await contract.deployTransaction.wait();
            data.transactionHash = res.transactionHash
            data.address = res.contractAddress
            data.blockNumber = res.blockNumber
            return data;
        });
    }

    const myContract = getContract(library, DFA721.abi);

    return myContract.deploy({
        data: DFA721.bytecode,
        arguments: [
            name,
            symbol,
            `https://api.de-fine.art/api/tokens/${chainType}/`
        ]
    }).send({from: address})
        .on('error', function (error) {
            // console.log('error___', error)
        })
        .on('receipt', function (receipt) {
            data.transactionHash = receipt.transactionHash
            data.address = receipt.contractAddress
            data.blockNumber = receipt.blockNumber
        })
        .then(function () {
            return data;
        });
}
export const getNFT721 = (library, contractAddress) => {
    return getContract(library, DFA721.abi, contractAddress)
}

export const getIsApprovedForAll = async (library, contractAddress, account, spender) => {
    console.log('getIsApprovedForAll', contractAddress, spender)
    const contract = await getNFT721(library, contractAddress)
    return await contract.methods.isApprovedForAll(account, spender).call()
}

export const getUserTokenIds = async (library, contractAddress, account) => {
    console.log('contractAddress', contractAddress)
    const contract = await getNFT721(library, contractAddress)
    console.log('contract', contract)
    const count = await contract.methods.balanceOf(account).call()
    console.log('count', count)
    return await Promise.all([...Array(parseInt(count)).keys()].map(async value=>{
        console.log('value', value)
        return await contract.methods.tokenOfOwnerByIndex(account, value.toString()).call()
    }))
}

export const approvedForAll = async (library, contractAddress, account, spender) => {
    const data = {};
    const contract = await getNFT721(library, contractAddress)
    return contract.methods.setApprovalForAll(spender, true).send({from: account})
        .on('receipt', function (receipt) {
            data.transactionHash = receipt.transactionHash
            data.address = receipt.contractAddress
            data.blockNumber = receipt.blockNumber
        })
        .then(function () {
            return data;
        });
  return getContract(library, DFA721.abi, contractAddress)
}
export const deployFreeMintNFT721 = (library, address, name, symbol, chainType,maxCount,startTime,endTime,userLimit,acceptCurrency,mintPrice) => {
  const data = {};
  
  const myContract = getContract(library, FreeMint721.abi);
  return myContract.deploy({
    data: FreeMint721.bytecode,
    arguments: [
      name,
      symbol,
      `http://13.229.74.96:8080/nftInfo/${chainType}/`,
      maxCount,
      startTime,
      endTime,
      userLimit,
      acceptCurrency,
      mintPrice
    ]
  }).send({ from: address })
    .on('error', function (error) {
      // console.log('error___', error)
    })
    .on('receipt', function (receipt) {
      data.transactionHash = receipt.transactionHash
      data.address = receipt.contractAddress
      data.blockNumber = receipt.blockNumber
    })
    .then(function () {
      return data;
    });
}
export const freeMintNFT721 = async(library,address,contractAddress,params) => {
  return await getContract(library, FreeMint721.abi, contractAddress).methods.mint()
  .send({from: address})
  .on('transcationHash', params._onTranscationHash)
  .on('receipt', params._onReceipt)
  .on('error', params._onError)
}