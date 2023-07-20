export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
  var context = "";
  if (r != null)
    context = r[2];
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined" ? "" : context;
}

export const isMobile = () => {
  const sUserAgent = window.navigator.userAgent;
  if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
    return true
  }
}

export const uniqByKeepLast = (data, key) => {
  return [
    ...new Map(
      data.map(x => [key(x), x])
    ).values()
  ]
}

export const dealUrl = (str) => {
  str = str.toLowerCase()

  if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
    return str
  } else {
    return ''
  }
}

export const isSelf = (address, account, tronAccount) => {
  if (!address) {
    return false
  }

  if (account) {
    return address.toLowerCase() === account.toLowerCase()
  }

  if (tronAccount) {
    return address.toLowerCase() === tronAccount.toLowerCase()
  }

  return false
}

const setAuction = (item) => {
  item.pool = item.auctionInfo
  item.pool.type = 'bid'
  if (item.pool.closeAt > parseInt(new Date().getTime() / 1000)) {
    item.pool.status = 'live'
  } else {
    item.pool.status = 'closed'
  }

  if (item.pool.bidHistories && item.pool.bidHistories.length !== 0) {
    let length = item.pool.bidHistories.length - 1
    item.pool.LastPrice = item.pool.bidHistories[length].amount1
    item.pool.currentPrice = item.pool.bidHistories[length].amount1
    item.pool.currentBidderAmount = item.pool.bidHistories[length].amount1
    item.pool.bidder = true
  } else {
    item.pool.LastPrice = item.pool.amountMin1
    item.pool.currentPrice = item.pool.amountMin1
    item.pool.currentBidderAmount = item.pool.amountMin1
    item.pool.bidder = false
  }
  item.pool.token1Info = item.pool.token1Metadata
  if (!item.pool.token1Info) {
    item.pool.token1Info = {
      name: 'Unknown',
      decimal: 18
    }
  } else {
    item.pool.token1Info.name = item.pool.token1Info.symbol
    item.pool.token1Info.decimal = item.pool.token1Info.decimals
  }
}

const setSwap = (item) => {
  item.pool = item.swapInfo
  item.pool.type = 'swap'
  item.pool.startAt = item.swapInfo.startAt
  if (item.pool.closeAt > parseInt(new Date().getTime() / 1000)) {
    item.pool.status = 'live'
  } else {
    item.pool.status = 'closed'
  }
  item.pool.price = item.pool.amountTotal1
  item.pool.token1Info = item.pool.token1Metadata
  if (!item.pool.token1Info) {
    item.pool.token1Info = {
      name: 'Unknown',
      decimal: 18
    }
  } else {
    item.pool.token1Info.name = item.pool.token1Info.symbol
    item.pool.token1Info.decimal = item.pool.token1Info.decimals
  }
}

export const loadPoolInfo = (list) => {
  if (list) {
    list.map(item => {
      if (item.auctionInfo && item.swapInfo) {
        if (item.swapInfo.closeAt > item.auctionInfo.closeAt) {
          setSwap(item)
        } else {
          setAuction(item)
        }
      } else if (item.auctionInfo) {
        setAuction(item)
      } else if (item.swapInfo) {
        setSwap(item)
      }

      if (item.pool?.token1Info?.address) {
        item.pool.token1 = item.pool.token1Info.address
      }
    })
    return list
  }
}

export const twitterUtil = (type, option, url) => {
  if (type === 'auth') {
    window.open(
      `https://twitter.com/i/oauth2/authorize?client_id=emRIN2k2X0wxRTJ1RlZCcFUwaW86MTpjaQ&redirect_uri=https%3A%2F%2F${window.location.host}%2Fauth&response_type=code&scope=tweet.read+users.read+like.read+follows.read+offline.access&code_challenge=Q8pLt1gq7Y1jyznD0_wHCnAU2MkZLyzeHKewxVoMSL8&code_challenge_method=S256&state=twitter`,
      '_blank', 'width=800,height=600'
    );
  } else if (type === 'follow_on_twitter') {
    window.open(
      'https://twitter.com/intent/follow?screen_name=' + option,
      '_blank', 'width=800,height=600'
    );
  } else if (type === 'retweet') {
    window.open(
      'https://twitter.com/intent/retweet?tweet_id=' + option,
      '_blank', 'width=800,height=600'
    );
  } else if (type === 'like_tweet') {
    window.open(
      'https://twitter.com/intent/like?tweet_id=' + option,
      '_blank', 'width=800,height=600'
    );
  } else if (type === 'tweet') {
    window.open(
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(option),
      '_blank', 'width=800,height=600'
    );
  } else if (type === 'quote_tweet') {
    window.open(
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(option + '\n' + url),
      '_blank', 'width=800,height=600'
    );
  }
}