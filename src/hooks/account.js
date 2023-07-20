import { useState, useEffect, useContext } from 'react';
import Web3 from "web3";

import { useActiveTronWeb } from "hooks/activeTronWeb";
import { formatAmountWithDecimal } from "../utils/format";
import { useActiveWeb3React } from "../web3";
import { mainContext } from "../reducer";
import { HANDLE_SHOW_CONNECT_MODAL } from "../const";


export const useBalance = (address, decimal = 2) => {
  const { account, active, library } = useActiveWeb3React()
  const {
    tronLibrary, tronAccount, tronChainId, tronActive,
    tronActivate, tronDeactivate
  } = useActiveTronWeb();
  const [balance, setBalance] = useState()

  useEffect(() => {
    if (window.ethereum && active) {
      const web3 = new Web3(library.provider);
      web3.eth.getBalance(address || account).then(res => {
        setBalance(formatAmountWithDecimal(res, 18, decimal))
      })
    } else if (window.tronWeb && tronActive) {
      window.tronWeb.trx.getBalance(address || tronAccount).then(res => {
        setBalance(formatAmountWithDecimal(res, 6, decimal))
      })
    }
  }, [active, account, tronActive, tronAccount])

  return { balance }
}

export const useNeedSign = () => {
  const { dispatch } = useContext(mainContext);
  const { active } = useActiveWeb3React()
  const { tronActive } = useActiveTronWeb();

  const needSign = (func) => {
    if (active || tronActive) {
      func && func()
    } else {
      dispatch({
        type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
      });
    }
  }

  return { needSign }
}

export const useAccountIsSign = () => {
  const { active } = useActiveWeb3React()
  const { tronActive } = useActiveTronWeb();
  
  if (active || tronActive) {
    return true
  } else {
    return false
  }
}
