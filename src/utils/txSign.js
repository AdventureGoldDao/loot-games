import Web3 from "web3";

export const clearLocalStorage = (type) => {
  window.sessionStorage.removeItem('wallet')
  if (type === 'trx') {
    window.localStorage.removeItem('tron_address')
    window.localStorage.removeItem('tron_signatureResult')
    window.localStorage.removeItem('tron_signatureMessage')
  } else {
    window.localStorage.removeItem('address')
    window.localStorage.removeItem('signatureResult')
    window.localStorage.removeItem('signatureMessage')
  }
}

const personalSign = (provider, msg, fromAddress, pwd) => {
  msg = 'Welcome to Adventure Gold!\n' +
  'Account address: ' + fromAddress + '\n' +
  'Nonce: ' + msg;

  const web3 = new Web3(provider);
  return new Promise((resolve, reject) => {
    web3.eth.personal.sign(msg, fromAddress, () => {
    }).then(res => {
      window.localStorage.setItem('address', fromAddress)
      window.localStorage.setItem('signatureResult', res)
      window.localStorage.setItem('signatureMessage', msg)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const tronSign = async (msg, fromAddress) => {
  msg = 'Welcome to Adventure Gold!\n' +
  'Account address: ' + fromAddress + '\n' +
  'Nonce: ' + msg;

  const signature = await window.tronWeb.trx.sign(Web3.utils.utf8ToHex(msg).substr(2))
  window.localStorage.setItem('tron_address', fromAddress)
  window.localStorage.setItem('tron_signatureResult', signature)
  window.localStorage.setItem('tron_signatureMessage', msg)
  return signature;
}

export const handleIsSignExpired = (type) => {
  type = type || window.localStorage.getItem('now_selected_chain');
  let nowTime = Date.now();
  let address, signature, signatureMessage;

  if (type && type !== 'trx') {
    address = window.localStorage.getItem('address')
    signature = window.localStorage.getItem('signatureResult')
    signatureMessage = window.localStorage.getItem('signatureMessage')
  }

  if (type === 'trx') {
    address = window.localStorage.getItem('tron_address')
    signature = window.localStorage.getItem('tron_signatureResult')
    signatureMessage = window.localStorage.getItem('tron_signatureMessage')
  }

  if (!signature || !signatureMessage) {
    return
  }

  const signTime = signatureMessage.split('DeFine Nonce:\n')[1];

  if (nowTime - signTime > 604800000) {
    clearLocalStorage(type)
    window.location.reload()
  }

  return { address, signature, signatureMessage }
}

export const getSign = async (library, account, force) => {
  let signature, signatureMessage, address, storedSignature
  if (!force) {
    if (library === 'TRON') {
      storedSignature = handleIsSignExpired('trx')
    } else {
      storedSignature = handleIsSignExpired('web3')
    }
  }

  if (!storedSignature || (account !== storedSignature.address)) {
    signatureMessage = Date.now()
    if (library === 'TRON' && window.tronWeb) {
      signature = await tronSign(signatureMessage.toString(), account)
    }

    if (library?.provider && window.ethereum) {
      signature = await personalSign(library.provider, signatureMessage.toString(), account, '')
    }
  } else {
    signature = storedSignature.signature
    signatureMessage = storedSignature.signatureMessage
    address = storedSignature.address
  }

  return { signature, signatureMessage, address: account }
}