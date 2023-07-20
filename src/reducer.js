import React, {useReducer} from "react";
import {
  HANDLE_CHANGE_USER_INFO,
  HANDLE_TRON_WEB_INFO,
  HANDLE_SHOW_CONNECT_MODAL,
  HANDLE_SHOW_CHANGE_CURRENCY_MODAL,
  SWITCH_PROMPT,
  HANDLE_WRONG_NETWORK,
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  HANDLE_SHOW_TRANSACTION_MODAL,
  HANDLE_SHOW_INSTALL_METAMASK_MODAL,
  HANDLE_SHOW_COMMENT_MODAL1, HANDLE_SHOW_COMMENT_MODAL2,
  HANDLE_HIDE_EVENT_MODAL,
  HANDLE_SHOW_EASTER_MODAL,
  HANDLE_NOTICE_NUM,
  // HANDLE_CHANGE_CREATEEVENTINFO
} from "./const";

const mainContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_HIDE_EVENT_MODAL:
      return {...state, hideEventModal: action.hideEventModal}
    case HANDLE_CHANGE_USER_INFO:
      return {...state, userInfo: {...action.userInfo}}
    case HANDLE_WRONG_NETWORK:
      return {...state, isWrongNetwork: action.isWrongNetwork}
    case HANDLE_TRON_WEB_INFO:
      return {...state, tronWebInfo: {...state.tronWebInfo, ...action.tronWebInfo}}
    case HANDLE_SHOW_CONNECT_MODAL:
      return {...state, showConnectModal: action.showConnectModal}
    case HANDLE_SHOW_CHANGE_CURRENCY_MODAL:
      return {...state, showChangeCurrencyModal: action.showChangeCurrencyModal}
    case SWITCH_PROMPT:
      return {...state, switchPromptVisible: action.switchPromptVisible}
    case HANDLE_SHOW_FAILED_TRANSACTION_MODAL:
      return { ...state, showFailedTransactionModal: action.showFailedTransactionModal };
    case HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL:
      return { ...state, showWaitingWalletConfirmModal: action.showWaitingWalletConfirmModal };
    case HANDLE_SHOW_TRANSACTION_MODAL:
      return { ...state, showTransactionModal: action.showTransactionModal };
    case HANDLE_SHOW_INSTALL_METAMASK_MODAL:
      return {...state, showInstallMetamaskModal: action.showInstallMetamaskModal};
    case HANDLE_SHOW_COMMENT_MODAL1:
      return {...state, showCommentModal1: action.showCommentModal1};
    case HANDLE_SHOW_COMMENT_MODAL2:
      return {...state, showCommentModal2: action.showCommentModal2};
    case HANDLE_SHOW_EASTER_MODAL:
      return {...state, showEasterModal: action.showEasterModal};
    case HANDLE_NOTICE_NUM:
      return {...state,noticeNum: action.noticeNum};
    // case HANDLE_CHANGE_CREATEEVENTINFO:
    //   return {...state,createEventForm: action.createEventForm};
    default:
      return state
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, {
    userInfo: {},
    tronWebInfo: {},
    isWrongNetwork: false,
    hideEventModal: true,
    showConnectModal: false,
    showChangeCurrencyModal: false,
    switchPromptVisible: false,
    showStakeModal: false,
    showUnstakeModal: false,
    showRewardModal: false,
    showStakedTokensModal: false,
    showUnstakedTokensModal: false,
    showFailedTransactionModal: false,
    showWaitingWalletConfirmModal: {show:false, title: "", content: ""},
    showTransactionModal: false,
    showInstallMetamaskModal: {show:false, title: "", content: ""},
    showCommentModal1: {show:false, activityId: "", replyTo: "", replyUser: ""},
    showCommentModal2: {show:false, activityId: "", replyTo: "", replyUser: ""},
    showEasterModal: false,
    noticeNum: {nftactivitynum: 0, commentnum: 0, likemenum: 0},
    // createEventForm: {},
  });
  return (
      <mainContext.Provider value={{state, dispatch}}>
        {props.children}
      </mainContext.Provider>
  );
};

export {reducer, mainContext, ContextProvider};
