const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const erc20TokenList = [
  {
    'name': 'USDT',
    'address': '0xdac17f958d2ee523a2206206994597c13d831ec7',
    'decimal': 6,
    'chainIds': [1]
  },
  {
    'name': 'ETH',
    'address': '0x0000000000000000000000000000000000000000',
    'decimal': 18,
    'chainIds': [1, 3, 4, 5]
  },
  {
    'name': 'TUSDT',
    'address': '0x531D4d8e53eBb5ECC58F84448a558F4Da78e0479',
    'decimal': 6,
    'chainIds': [5]
  },
  {
    'name': 'TUSDT',
    'address': '0xd92e713d051c37ebb2561803a3b5fbabc4962431',
    'decimal': 6,
    'chainIds': [4]
  },
  {
    'name': 'USDK',
    'address': '0x3424b0088e52dd3f2529b0bc492bdbe27bddd1e7',
    'decimal': 6,
    'chainIds': [4]
  },
  // {
  //   'name': 'DFA',
  //   'address': '0x62959c699a52ec647622c91e79ce73344e4099f5',
  //   'decimal': 18,
  //   'chainIds': [1]
  // },
  // {
  //   'name': 'DTT',
  //   'address': '0x1d5318b0914def8d91faa32ed704d692bbe57882',
  //   'decimal': 18,
  //   'chainIds': [4]
  // },
  {
    'name': 'USDT',
    'address': '0x55d398326f99059ff775485246999027b3197955',
    'decimal': 18,
    'chainIds': [56]
  },
  {
    'name': 'TUSDT',
    'address': '0xc6b09a55bed9131ee6625219d79b564b482f7140',
    'decimal': 18,
    'chainIds': [97]
  },
  {
    'name': 'BNB',
    'address': '0x0000000000000000000000000000000000000000',
    'decimal': 18,
    'chainIds': [56, 97]
  },
  {
    'name': 'KLAY',
    'address': '0x0000000000000000000000000000000000000000',
    'decimal': 18,
    'chainIds': [1001, 8217]
  },
  {
    'name': 'MATIC',
    'address': '0x0000000000000000000000000000000000000000',
    'decimal': 18,
    'chainIds': [137, 80001]
  }
]

export const trc20TokenList = [
  {
    'name': 'TRX',
    'address': 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
    'decimal': 6,
    'chainIds': ['tron', 'shasta']
  },
  {
    'name': 'USDT',
    'address': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    'decimal': 6,
    'chainIds': ['tron', 'shasta']
  },
]

export const getDecimalByAddress = (address, list) => {
  let decimal
  list.forEach(item => {
    if (item.address.toLowerCase() === address.toLowerCase()) {
      decimal = item.decimal
    }
  })

  if (!decimal) {
    decimal = 18
  }
  return decimal
}

export const getDecimalByName = (name, list) => {
  let decimal
  list.forEach(item => {
    if (item.name === name) {
      decimal = item.decimal
    }
  })

  if (!decimal) {
    decimal = 18
  }
  return decimal
}

export const getTokenAddress = (value, list) => {
  let address
  list.forEach(item => {
      if (item.name === value) {
          address = item.address 
      }
  })
  return address
}

export const getTokenName = (address, chainId) => {
  let tokenName
  erc20TokenList.forEach(item => {
    if (item.chainIds.includes(chainId) && item.address === address.toLowerCase()) {
      tokenName = item.name
    }
  })

  if (address === ZERO_ADDRESS) {
    if(chainId === 1 || chainId === 4 || chainId === 3) {
      tokenName = 'ETH'
    } else {
      tokenName = 'BNB'
    }
  }

  return tokenName
}

export const getToken = (address, chainId) => {
  let token;
  erc20TokenList.forEach(item => {
    if (item.chainIds.includes(chainId) && item.address === address.toLowerCase()) {
      token = item;
    }
  })

  if (address === ZERO_ADDRESS && chainId === 56) {
    token = {
      'name': 'BNB',
      'address': '0x0000000000000000000000000000000000000000',
      'decimal': 18
    }
  }

  if (!token) {
      token = {
        'name': 'ETH',
        'address': '0x0000000000000000000000000000000000000000',
        'decimal': 18
      }
  }
  return token;
}

export const getTokenTron = (address) => {
  let token;
  trc20TokenList.forEach(item => {
    if (item.address.toLowerCase() === address.toLowerCase()) {
      token = item;
    }
  })

  if (!token) {
    token = {
      'name': 'TRX',
      'address': 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
      'decimal': 6
    }
  }

  return token;
}
