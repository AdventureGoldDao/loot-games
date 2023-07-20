import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from "web3";
import Contract from "web3-eth-contract";
import env from '../env';


const eth = {
    mainnet: "https://mainnet.infura.io/v3/efcd618d59564cf4a3d52938d7987ec9",
    rinkeby: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884",
    goerli: "https://goerli.infura.io/v3/a47173ca28c74f979d0e74b3f2d50c7c",
  };

export function getContract(library, abi, address,chainType) {
    if(library) {
        // console.log(abi);
        const web3 = new Web3(library.provider);
        return  new web3.eth.Contract(abi, address)
    }else {
        Contract.setProvider(eth[chainType]);
        return  new Contract(abi, address)
    }
}

export const useActiveWeb3React =() => {
    const context = useWeb3ReactCore()
    const contextNetwork = useWeb3ReactCore()
    return context.active ? context : contextNetwork
}

