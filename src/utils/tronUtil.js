import { formatUnits } from '@ethersproject/units'

export const formatAuctionPool = pool => {
  if (!pool) {
    return
  }
  pool.LastPrice = formatUnits(pool.LastPrice, 0)
  pool.amountMin1 = formatUnits(pool.amountMin1, 0)
  pool.amountMinIncr1 = formatUnits(pool.amountMinIncr1, 0)
  pool.closeAt = formatUnits(pool.closeAt, 0)
  pool.confirmTime = formatUnits(pool.confirmTime, 0)
  pool.index = formatUnits(pool.index, 0)
  pool.nftType = formatUnits(pool.nftType, 0)
  pool.tokenAmount0 = formatUnits(pool.tokenAmount0, 0)
  pool.tokenId = formatUnits(pool.tokenId, 0)
  pool.creator = window.tronWeb.address.fromHex(pool.creator)
  pool.token0 = window.tronWeb.address.fromHex(pool.token0)
  pool.token1 = window.tronWeb.address.fromHex(pool.token1)
  return pool
}

export const formatSwapPool = pool => {
  if (!pool) {
    return
  }
  pool.amountTotal0 = formatUnits(pool.amountTotal0, 0)
  pool.amountTotal1 = formatUnits(pool.amountTotal1, 0)
  pool.closeAt = formatUnits(pool.closeAt, 0)
  pool.index = formatUnits(pool.index, 0)
  pool.nftType = formatUnits(pool.nftType, 0)
  pool.startAt = formatUnits(pool.startAt, 0)
  pool.token0 = window.tronWeb.address.fromHex(pool.token0)
  pool.token1 = window.tronWeb.address.fromHex(pool.token1)
  pool.tokenId = formatUnits(pool.tokenId, 0)
  pool.creator = window.tronWeb.address.fromHex(pool.creator)

  return pool
}
