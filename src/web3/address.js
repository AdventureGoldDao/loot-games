// English Auction NFT
export function getEnglishAuctionNFTAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0xaE2C96d0643180aEd6dc16192b6E1a0113b156cF'
        case 3:
            return '0x4737d9097aF0741dbe7Fb8794f450fdA3782e9eE'
        case 4:
            return '0xe4f9783cc2E4FEf6ef3353826C03aEd9b68E796F'
        case 5:
            return '0x8802c0046C69154D4E63e3091B3D444f46B7F4eA'
        case 56:
            return '0x0686B6FB55DBAaFeA62D2b6670aC861B27a423c0'
        case 97:
            return '0xa6AF6BF08d0B2C04b5d1FE20ACb976E4Bd7e3cBA'
        case 137:
            return '0xbFE0006b2D9995753aE9B3a17ee1110747aE644A'
        case 1001:
            return '0x4BA62E17d4dFC9860f7140295a68e37d6e784db5'
        case 8217:
            return '0x255db90292aeade09108e9fe77ac34af46242a42'
        case 80001:
            return '0xda159FFfa937353D4F7B1027a5bE35af641cE5fA'
        case 'tron':
            return 'TRGpg7hcycTmHRH44igNbyW1HzDfH6A9cx'
        case 'shasta':
            return 'TSASRJLBbEiZ1ehWAfhdc6iwbsMfwmFpKC'
        default:
            return '0xaE2C96d0643180aEd6dc16192b6E1a0113b156cF'
    }
}

export function getFixswapAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x53ec32583177ac5b2331ea7d1c11685317c03cdc'
        case 3:
            return '0x3a21868Bc1E9f0c12783E019C61E8cf7514B60C1'
        case 4:
            return '0x8204830081443A28254aB9E4F3c1c848BFD1d6d6'
        case 5:
            return '0x60f9BB85af34278B7ae7b6e1911Bd9EC053d7926'
        case 56:
            return '0xf0eE5907701cb55E2aBD9dC9ebC7BDA43bC43305'
        case 97:
            return '0x2D150254b15e10E0C893d1F280DD8a978cd3d75b'
        case 137:
            return '0x37694B4A18E0eE7057161E7393d7534eF8441FA9'
        case 1001:
            return '0x45CF68F7F6dA88ea1d2Db34C237E74dceb58Fe64'
        case 8217:
            return '0x3bfb1109423b37b1ddf2ae6162710bd0ebc9f96d'
        case 80001:
            return '0x02d66b124ce186e5CfF0C2f4567E53d9a0B4B604'
        case 'tron':
            return 'TPUGEyLnhm8xmh5LwvHDJ2dhYcHatsjQff'
        case 'shasta':
            return 'TXwrYo3XsrF25Gfg86E7M7fNjEwfcneS82'
        // return 'TW3Mw12DDcvht3YQmSyazF2D4RALK7RKXb'
        default:
            return '0x53ec32583177ac5b2331ea7d1c11685317c03cdc'
    }
}

export function getNFT721Address(chainId) {
    switch (chainId) {
        case 1:
            return '0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7'
        case 3:
            return '0x51c4E4f973839BCB67B9Aad83A82Ef9Cdd86b176'
        case 4:
            return '0x19fA204A7fE8E97F900f1B6099FE4137B261fDd9'
        case 5:
            return '0x35E40E342e2d90B09D6fDf200F587466a2D8bb8a'
        case 56:
            return '0x1E48072f9D9479c3741Ab4ef0962a495f462F8c9'
        case 97:
            return '0xDC2F987ACC4B1dd820f019bAad4a1f38767a2439'
        case 137:
            return '0xf0eE5907701cb55E2aBD9dC9ebC7BDA43bC43305'
        case 1001:
            return '0x1b62c3b00bdDB3CaeaC3BEFA1a993CAd9Ecf694B'
        case 8217:
            return '0xf0ee5907701cb55e2abd9dc9ebc7bda43bc43305'
        case 80001:
            return '0xDC2F987ACC4B1dd820f019bAad4a1f38767a2439'
        case 'tron':
            return 'TN9LZcdvBvDnF1jVVHf91dFSvHvGwjaduu'
        case 'shasta':
            return 'TLs3GGcSvaUUHNJ8UcSwwMUPQaHmibm5ko'
        default:
            return '0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7'
    }
}

export function getBlindNFT721Address(chainId) {
    switch (chainId) {
        case 1:
            return '0x0Bef69A2C5323d03E980CD8988f747c0FC2dA74A'
        case 4:
            return '0x61be589bd939f8e98fea0c73aed76a6f98d46838'
        default:
            return '0x0Bef69A2C5323d03E980CD8988f747c0FC2dA74A'
    }
}

export function getNFT1155Address(chainId) {
    switch (chainId) {
        case 1:
            return '0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7'
        case 4:
            return '0xF74016bC500926fBEFb7b162DFe53D5F0BfaD6ae'
        case 56:
            return '0x6aE020d89a7Ec2a4867c84f72882FaDa245c9080'
        case 97:
            return '0x5854739FE3AfDFD78add50b09F1b02F1D052dFC6'
        default:
            return '0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7'
    }
}

export function getChainType(chainId) {
    switch (chainId) {
        case 1:
            return 'mainnet'
        case 3:
            return 'ropsten'
        case 4:
            return 'rinkeby'
        case 5:
            return 'goerli'
        case 10:
            return 'optimism'
        case 56:
            return 'bsc'
        case 97:
            return 'bsctestnet'
        case 137:
            return 'polygon'
        case 280:
            return 'zksynceratest'
        case 324:
            return 'zksyncera'
        case 420:
            return 'optimisticgoerli'
        case 1001:
            return 'baobab'
        case 8217:
            return 'klaytn'
        case 42161:
            return 'arbitrum'
        case 80001:
            return 'mumbai'
        case 84531:
            return 'basegoerli'
        case 421613:
            return 'nitrogoerli'
        case 5151706:
            return 'loot'
        case 9088912:
            return 'loottest'
        case 'tron':
            return 'tron'
        case 'shasta':
            return 'shasta'
        default:
            return ''
    }
}

export function getChainId(chainType) {
    switch (chainType) {
        case 'mainnet':
            return 1
        case 'ropsten':
            return 3
        case 'rinkeby':
            return 4
        case 'goerli':
            return 5
        case 'optimism':
            return 10
        case 'bsc':
            return 56
        case 'bsctestnet':
            return 97
        case 'polygon':
            return 137
        case 'zksynceratest':
            return 280
        case 'zksyncera':
            return 324
        case 'optimisticgoerli':
            return 420
        case 'baobab':
            return 1001
        case 'klaytn':
            return 8217
        case 'arbitrum':
            return 42161
        case 'mumbai':
            return 80001
        case 'basegoerli':
            return 84531
        case 'nitrogoerli':
            return 421613
        case 'loot':
            return 5151706
        case 'loottest':
            return 9088912
        case 'tron':
            return 'tron'
        case 'shasta':
            return 'shasta'
        default:
            return ''
    }
}

export function getNFTIndexerAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x639636207a5db7322d007c9035ea0f29edc21b82'
        case 3:
            return '0x28Ef1cE5f519cF227Da1C8E34fa551Aae0407D29'
        case 4:
            return '0x8c7296Eb70479812CF3Aaa48C583Ea21F8290E9D'
        case 5:
            return '0x97bB866F735f53D6C9F2E1a75FF16FA90B8EA017'
        case 56:
            return '0x5BAe56Ca055500e77E0d66550fE341721b93d24C'
        case 97:
            return '0xBAe3519b40173449FE6C67Ad7EF7379D2465cB7C'
        case 137:
            return '0x262EA9c02dafdEf01D1A770a232Fef99AcF5B403'
        case 1001:
            return '0x06dC11Be25D1669696699a130047358A8789A0c4'
        case 8217:
            return '0x4b5ab4805353f698e3099163c51872881578d81a'
        case 80001:
            return '0x5F44461DB44f3c4AD34Bc3334522450A636489a6'
        case 'tron':
            return 'TLwt2jx6V8J9zFB5EvkqE8LAgXqSvwKvYX'
        case 'shasta':
            return 'TQ4CLtduGBqKHn9R547Bp4KyDNvDRSK4uV'
        default:
            return '0x639636207a5db7322d007c9035ea0f29edc21b82'
    }
}

export function getNFTTokenAddress(chainId) {
    return getNFT721Address(chainId)
}

export function getTokenContracts(chainId) {
    switch (chainId) {
        case 1:
            return { "0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7": "DFA" }
        case 4:
            return { "0xdABA2428579673bedA404B3D9707Edc43C24f143": "DFA" }
        case 56:
            return { "0x1E48072f9D9479c3741Ab4ef0962a495f462F8c9": "DFA" }
        case 97:
            return {}
        default:
            return { "0x70A76282752b5D2F09f81fe86D49d80ED8B53DC7": "DFA" }
    }
}

export function getAmplAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0xF82d80Cbc62679021DbB63A64b662f3247D0060a'
        case 4:
            return '0xefce54fcd67aa102fde2d29fa46c3a14a0b4b8f6'
        default:
            return '0xF82d80Cbc62679021DbB63A64b662f3247D0060a'
    }
}

// export function getSypoolAddress(chainId) {
//     switch (chainId) {
//         case 56:
//             return '0xE580d5D0dfb1ec14326c336516DDEe85E9Ff0730'
//         case 97:
//             return '0x500ecAfdDB676144e6BaA6bb0F520442BFd2c92D'
//         default:
//             return '0xE580d5D0dfb1ec14326c336516DDEe85E9Ff0730'
//     }
// }

// export function getSypoolUsdtAddress(chainId) {
//     switch (chainId) {
//         case 56:
//             return '0x55d398326f99059ff775485246999027b3197955'
//         case 97:
//             return '0xc6b09a55bed9131ee6625219d79b564b482f7140'
//         default:
//             return '0x55d398326f99059ff775485246999027b3197955'
//     }
// }
export function getSypoolRedeemAddress(chainId) {
    switch (chainId) {
        case 56:
            return '0xec2e6e9C9D87fB86ed6f953365764c2EB3BeA9a3'
        case 97:
            return '0x0b0e81F6F1AbF41D06641FD1212D4763001D3f25'
        default:
            return '0xec2e6e9C9D87fB86ed6f953365764c2EB3BeA9a3'
    }
}
export function getSandboxAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0xD1F5c6B10B99B22a91F2db9eB848f1b9f28E2b01'
        case 4:
            return '0xE02b7886371fba944Bb2502d90fd5Dbec1E825d0'
        default:
            return '0xD1F5c6B10B99B22a91F2db9eB848f1b9f28E2b01'
    }
}
export function getDFAAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x62959c699a52ec647622c91e79ce73344e4099f5'
        case 4:
            return '0x1d5318b0914def8d91faa32ed704d692bbe57882'
        default:
            return '0x62959c699a52ec647622c91e79ce73344e4099f5'
    }
}
export function getVoteAddress(chainId) {
    switch (chainId) {
        case 1:
            // return '0xab8e8d9bb650a0c3f91bac1357f90d5efab0d5f7'
            return '0x1e2a9456e5f6b63b6b55232010b9ae9dcf22caaf'
        case 4:
            // return '0x09E5B8821869DD8DDD8d704F4271ec4c8Edc9Abe'
            // return '0x09f9F7c9684Cf0c2B543EAa2EB346C808d6f3e40'
            return '0xb298128923edc08f5542E9Db66e2515192c56a4b'
        default:
            return '0x1e2a9456e5f6b63b6b55232010b9ae9dcf22caaf'
    }
}
export function getContractVoteAddress(chainId) {
    switch (chainId) {
        case 1:
            // return '0x9b1DdF053136bC9710C81a2A89162B9Fa0A2640d'
            return '0x63124FF062881888B6fbc348E5932F74B7cF3AA0'
        case 4:
            // return '0x8A1bc81D1eA6e6072f565b825dAD9dD993E68eBc'
            // return '0xD4cDcb06e5ea215DdB943205fC100B32E1D3386F'
            return '0x0Cc1cBe4cDe1ebBE7789E95A50ef297Beb2dA413'
        default:
            return '0x63124FF062881888B6fbc348E5932F74B7cF3AA0'
    }
}
export function getContractClaimDfaAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0xfF969830Fea47c4505EF97f0c4cA8798e4545E48'
        case 4:
            return '0x0bceFe7a0B703faC8781CF1C0F99f749F9128774'
        default:
            return '0xfF969830Fea47c4505EF97f0c4cA8798e4545E48'
    }
}