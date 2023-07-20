import { useState, useEffect } from 'react';
import http from '../utils/http';

export const fetchDefaultAccount = (account) => {
  return http.post(`/users/${account}/default`)
}

export const recordWalletType = () => {
  if (!window.sessionStorage.getItem('wallet')) {
    let wallet = 'other'
    if (window.navigator.userAgent.indexOf('imToken') >= 0) {
      wallet = 'imtoken'
    }
    window.sessionStorage.setItem('wallet', wallet);
    http.post(`/wallet/connect?wallet=${wallet}`);
  }
}