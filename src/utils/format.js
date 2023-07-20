import BigNumber from 'bignumber.js'
import Web3 from 'web3'

BigNumber.config({
  EXPONENTIAL_AT: [-20, 40],
  groupSeparator: ',',
  groupSize: 3,
})

export const formatCreateTime = (timestamp, t) => {
  const num = (Date.now() - timestamp) / 1000
  if (num < 60) {
    return t('just_now')
  }
  if (num < 3600) {
    return parseInt(num / 60) + ' ' + t('minutes_ago')
  }
  if (num < 3600 * 24) {
    return parseInt(num / 3600) + ' ' + t('hours_ago')
  }
  return new Date(timestamp).toLocaleString(window.localStorage.getItem('define_lang') || 'en')
}

export const formatAmount = (amount, decimal) => {
  if (!decimal) {
    return new BigNumber(amount).toFormat()
  }
  return new BigNumber(new BigNumber(amount).div(new BigNumber(10).pow(decimal))).dp(18)
}

export const formatAmountWithDecimal = (amount, decimal, place = 3) => {
  return new BigNumber(new BigNumber(new BigNumber(amount).div(new BigNumber(10).pow(decimal))).toFixed(6)).toFormat(place, 1)
}

export const weiPlus = (value1, value2) => {
  return new BigNumber(new BigNumber(value1 ? value1 : 0).plus(new BigNumber(value2 ? value2 : 0)).toFixed(6)).toNumber().toString()
}


export const weiDiv = (value1, value2) => {
  if (value1 == 0 || value2 == 0) {
    return 0
  }
  return new BigNumber(new BigNumber(value1).dividedBy(new BigNumber(value2)).toFixed(6)).multipliedBy(100).toString()
};

export const floatMul = (arg1, arg2) => {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

export const abbrTxHash = (value, startLength = 6, endLength = 6) => {
  if (!value) {
    return value
  }
  return value.substr(0, startLength) + '...' + value.substr(-endLength)
}

export const toChecksumAddress = (provider, address) => {
  const web3 = new Web3(provider);
  return web3.utils.toChecksumAddress(address)
}