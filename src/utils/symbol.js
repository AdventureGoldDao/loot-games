export const getSymbol = (chainId) => {
  let symbol
  if (chainId === 56 || chainId === 97) {
    symbol = "BNB"
  } 

  if (chainId === 137 || chainId === 80001) {
    symbol = "MATIC"
  }

  if (chainId === 1001 || chainId === 8217) {
    symbol = "KLAY"
  }
  
  if (chainId === 1 || chainId === 3 || chainId === 4 || chainId === 5 || chainId === 10 || chainId === 280 || chainId === 324 || chainId === 420 || chainId === 42161 || chainId === 84531 || chainId === 421613){
    symbol = "ETH"
  }

  if (chainId === 'tron' || chainId === 'shasta'){
    symbol = "TRX"
  }

  return symbol
}