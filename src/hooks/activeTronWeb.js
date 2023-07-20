import { useContext } from "react";

import { useActiveWeb3React } from "../web3"
import { HANDLE_SHOW_CONNECT_MODAL, HANDLE_TRON_WEB_INFO } from "../const";
import { injected } from "../utils/networkConnect";
import { mainContext } from "../reducer";

export const useActiveTronWeb = () => {
  const { state, dispatch } = useContext(mainContext);
  const { deactivate } = useActiveWeb3React()

  const tronActivate = async () => {
    const tronWeb = window.tronWeb;
    const tronWebInfo = {};

    if (tronWeb && !tronWeb.defaultAddress.base58) {
    }
    if (tronWeb && tronWeb.defaultAddress.base58) {
      if (deactivate) {
        deactivate(injected)
      }
      const isConnected = await tronWeb.isConnected()
      if (isConnected.fullNode && isConnected.eventServer) {
        if (tronWeb.fullNode.host.includes('shasta')) {
          tronWebInfo.tronChainId = 'shasta'
        } else {
          tronWebInfo.tronChainId = 'tron'
        }
        tronWebInfo.tronLibrary = 'TRON'
        tronWebInfo.tronAccount = tronWeb.defaultAddress.base58
        tronWebInfo.tronActive = true
        dispatch({ type: HANDLE_TRON_WEB_INFO, tronWebInfo });

        window.addEventListener('message', (e) => {
          if (e.data.message && e.data.message.action == "setNode") {
            console.log("setAccount event", e.data.message)
            console.log("current address:", e.data.message.data.address)
            window.location.reload()
          }
          // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support 
          if (e.data.message && e.data.message.action == "connect") {
            console.log("connect event", e.data.message.isTronLink)
          }

          // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support 
          if (e.data.message && e.data.message.action == "disconnect") {
            console.log("disconnect event", e.data.message.isTronLink)
          }

          // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support 
          if (e.data.message && e.data.message.action == "accountsChanged") {
            console.log("accountsChanged event", e.data.message)
            console.log("current address:", e.data.message.data.address)
            dispatch({
              type: HANDLE_TRON_WEB_INFO,
              tronWebInfo: { tronAccount: e.data.message.data.address }
            })
          }

          // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support  
          if (e.data.message && e.data.message.action == "connectWeb") {
            console.log("connectWeb event", e.data.message)
            console.log("current address:", e.data.message.data.address)
          }

          // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support      
          if (e.data.message && e.data.message.action == "acceptWeb") {
            console.log("acceptWeb event", e.data.message)
          }
          // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support      
          if (e.data.message && e.data.message.action == "disconnectWeb") {
            console.log("disconnectWeb event", e.data.message)
          }

          // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support     
          if (e.data.message && e.data.message.action == "rejectWeb") {
            console.log("rejectWeb event", e.data.message)
          }

        })
        return tronWebInfo;
      } else {
        console.log('connect tron api error')
      }
    } else {
      dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
    }
  }

  const tronDeactivate = async () => {
    const tronWebInfo = {};
    tronWebInfo.tronChainId = null
    tronWebInfo.tronLibrary = null
    tronWebInfo.tronAccount = null
    tronWebInfo.tronActive = false
    dispatch({ type: HANDLE_TRON_WEB_INFO, tronWebInfo });
    return tronWebInfo;
  }

  return {
    ...state.tronWebInfo,
    tronActivate,
    tronDeactivate
  }
}
