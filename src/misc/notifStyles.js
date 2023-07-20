import { getTxUrl } from '../utils/bridge';

const submitted = (hash, rpcURL) => {
  return <a href={getTxUrl(hash, rpcURL)} rel="noreferrer" target={"_blank"}>Transaction submitted: {hash.slice(0, 6) + '...' + hash.slice(-4)}</a>;
};

const msg = {
  nonzero: 'Please enter a non-zero value',
  sig: 'There was an error signing the transaction',
  no_l1_addr: 'No L1 token address found',
  no_l2_addr: 'No L2 token address found',
  failed: 'Transaction failed',
  submitted,
  confirmed: 'Transaction confirmed',
};

const standard = {
  position: 'bottom-left',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export { msg, standard };
