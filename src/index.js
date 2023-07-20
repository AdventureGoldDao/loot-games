import React from 'react';
import ReactDOM from 'react-dom';
import GA4React from "ga-4-react";
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { customTheme } from 'theme';

if (window.localStorage.getItem('wallet_type') === 'BitKeep' && window.bitkeep) {
  window.ethereum = window.bitkeep.ethereum;
}
if (window.localStorage.getItem('wallet_type') === 'Coinbase' && window.ethereum.providerMap) {
  window.ethereum = window.ethereum.providerMap.get('CoinbaseWallet')
}
if (window.localStorage.getItem('wallet_type') === 'MetaMask' && window.ethereum.providerMap) {
  window.ethereum = window.ethereum.providerMap.get('MetaMask')
}

// const ga4react = new GA4React("G-");

// (async () => {
//   const ga = await ga4react.initialize();
//   ga.pageview(window.location.pathname + window.location.search)

//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// })();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
