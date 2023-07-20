import {Box, MenuItem, Modal, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BaseNFT, BrightField, MultiChainNFT} from "../../pages/Bridge";
import {ReactComponent as SearchIcon} from '../../assets/svg/nft-search.svg'
import {getUserTokenIds} from "../../utils/handleContract";
import {useActiveWeb3React} from "../../web3";
import http from "../../utils/http";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    boxShadow: 24,
    padding: '20px 16px'
};

const Search = styled(SearchIcon)`
  margin: auto;
`

const ModalContent = styled.div`
  border-radius: 10px;
  background: #1A1E1B;
  padding: 16px;
  max-height: 70vh;
  overflow: auto;
`

const Item = styled.div<{ selected: boolean }>`
  margin: 20px;
  border-radius: 10px;
  background: #282D29;
  padding: 10px;
  cursor: pointer;
  display: ${({selected}) => (selected ? 'flex' : 'block')};
`

const Cover = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 25px;
`

export interface NFT {
    id: string
}

const CollectionSelect = styled(Select)(()=>({
    '& fieldset': {
        border: "none"
    },
    '&.MuiInputBase-root': {
        background: "transparent",
        width: '100%'
    },
    '& .MuiMenu-list ': {
        background: '#fff'
    }
}))

const SelectContent = styled(Box)`
  width: 468px;
  height: 468px;
  background-color: #1A1E1B!important;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`

const Selected = styled.div`
  color: #7A9283;
  font-size: 14px;
  font-weight: 600;
  margin-right: 20px;
`

interface NFTSelectProps {
    isOpen: boolean
    auction: BrightField
    selectedMultiNFT: MultiChainNFT | undefined
    onMultiNFTSelect: (nft: MultiChainNFT) => void
    onDismiss: () => void
    list: MultiChainNFT[]
    selectedTokenId: string
    onSelectTokenId: (tokenId: string) => void
}

export default function NFTSelectModal({isOpen, auction, onDismiss, list, selectedMultiNFT, onMultiNFTSelect, selectedTokenId, onSelectTokenId}: NFTSelectProps) {

    const {account} = useActiveWeb3React()

    const [tokenIdList, setTokenIdList] = useState<string[]>()
    const [selectedNFT, setSelectedNFT] = useState<BaseNFT | undefined>()

    useEffect(()=>{
        if(!selectedNFT) return
        http.get(`https://test.adventuregold.org/api/nfts?chainType=${selectedNFT.chainId}&owner=${account}&contractAddress=${selectedNFT.address}&pageNo=1&pageSize=100`)
            .then((result)=>{
                // @ts-ignore
                console.log('result', result.list)
                // @ts-ignore
                setTokenIdList(result.list.map((item)=> item.id))
            })
    },[selectedNFT, account])

    // useEffect(() => {
    //     if (!library || !account || !selectedNFT) return
    //     console.log('query tokenid', selectedNFT.address)
    //     getUserTokenIds(library, selectedNFT.address, account).then((tokenIds) => {
    //         console.log('tokenIds', tokenIds)
    //         setTokenIdList(tokenIds)
    //     })
    // }, [account, library, selectedNFT])

    const nftList =  list.map(({l1, l2})=> auction === BrightField.DEPOSIT ? l1 : l2)
    return (
        <Modal
            sx={{'& .MuiBox-root': {background:'#242926'}}}
            open={isOpen}
            onClose={onDismiss}
        >
            <Box sx={{...style}}>
                <Typography color={'#7A9283'} mb={'18px'} fontSize={12}>{`SELECT COLLECTION & NFT`}</Typography>
                <ModalContent>
                    <CollectionSelect onChange={(e)=>{
                        setSelectedNFT(nftList[e.target.value as number])
                        onMultiNFTSelect(list[e.target.value as number])
                    }} displayEmpty={true} renderValue={value => (value || value === 0 || selectedNFT) ? nftList[value as number]?.name ?? selectedNFT.name : <Typography color={'#7A9283'}>Select a Collect</Typography>}>
                        {nftList.map((value, index)=>{
                            return (
                                <MenuItem key={index} value={index}>
                                    <Typography>{value.name}</Typography>
                                </MenuItem>
                            )
                        })}
                    </CollectionSelect>
                </ModalContent>
                <SelectContent style={{display: tokenIdList ? 'block' : 'flex'}}>
                    {tokenIdList?
                        tokenIdList.map((item: any) => (
                            <Item onClick={() => {
                                onSelectTokenId(item)
                            }} key={item}
                                  selected={selectedTokenId === item.id}>
                                <Box style={{border: "none", background: "transparent"}} display={"flex"} alignItems={"center"}>
                                    <Cover
                                        src={item.icon || 'https://define-art-static-prod.s3-ap-northeast-1.amazonaws.com/test/token/image/mumbai/0x34e91Bbcd9591D0Fe275f9B7a737D4b42617fa4c/5.png'}
                                        alt={item.name}/>
                                    <Typography color={'#EBEBEB'} fontSize={18}
                                                fontWeight={600}>{`${selectedNFT.name} ${item}`}</Typography>
                                </Box>
                                {
                                    item === selectedTokenId &&
                                    <Selected>current selection</Selected>
                                }
                            </Item>
                        )): <Search />
                    }
                </SelectContent>
            </Box>
        </Modal>
    )
}
