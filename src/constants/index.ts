import {SignerOrProviderLike} from "@constellation-labs/sdk/dist/interfaces";
import {ethers} from "ethers";
import {useMemo} from "react";
import {CrossChainMessenger, NFTBridgeAdapter} from "@constellation-labs/sdk";
import {predeploys} from "@constellation-labs/contracts";

export const defaultL1Provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/R-2IK-_U4uoJKpr3zO9VqUl3upMmZsPh')
export const defaultL2Provider = new ethers.providers.JsonRpcProvider('https://testnet.rpc.lootchain.com/http')

export function useMessage(l1Provider?: SignerOrProviderLike, l2Provider?: SignerOrProviderLike) {
    return  useMemo(() => {
        return new CrossChainMessenger({
            l1SignerOrProvider: l1Provider ?? defaultL1Provider,
            l2SignerOrProvider: l2Provider ?? defaultL2Provider,
            l1ChainId: 5,
            l2ChainId: 9088912,
            contracts: {
                l1: {
                    AddressManager: '0xfDf9cbDF4d6049C9f42Be3C84AA61Ffe2BF915f6',
                    L1CrossDomainMessenger: '0xF2aE2fb831a5c081cc64BCf4D3294025A71612e5',
                    L1StandardBridge: '0x7834750f243570093B72cB04dE00557250cea385',
                    L1ERC721Bridge: '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F',
                    StateCommitmentChain: '0x2a2FF5B0cCD4A1Eaf1B6eEA40EB827B0A7cf165d',
                    CanonicalTransactionChain: '0xAC97f6CCe8344C1d4953d7583Cb81eb909d7d5D3',
                    BondManager: '0x709cdeBA5441a1a1FD8506f7A2a59C4edE2E8A8c',
                }
            },
            bridges: {
                Standard: {
                    Adapter: NFTBridgeAdapter,
                    l1Bridge: '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F',
                    l2Bridge: predeploys.L2ERC721Bridge,
                }
            },
            depositConfirmationBlocks: 0,
            getLogsProvider: undefined
        })
    }, [])
}