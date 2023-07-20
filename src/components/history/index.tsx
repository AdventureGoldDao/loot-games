import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react'
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import FromLogo from 'assets/img/chain/com_eth.svg'
import ToLogo from 'assets/img/chain/com_loot.svg'
import HistoryDetail from './Detail';
import {
  MessageDirection,
  MessageStatus,
  NFTBridgeMessage
} from "@constellation-labs/sdk";
import {ethers} from "ethers";
import {useActiveWeb3React} from "../../web3";
import {nft} from "../../pages/Bridge";
import moment from "moment";
import {defaultL1Provider, defaultL2Provider, useMessage} from "../../constants";
import {ReactComponent as Loading} from '../../assets/img/loading_icon.svg'
import NoData from "../NoData";

const StyledTableCell = styled(TableCell)(({small}:{small?:boolean}) => ({
    color: '#7A9283 !important',
    fontFamily: 'Inconsolata',
    fontSize: 16,
    lineHeight: '22px',
    letterSpacing: 0,
    '& img': {
      width: 26,
      height: 26
    },
    '& button': {
      width: 80,
      height: 36,
      backgroundColor: '#A5FFBE',
      color: '#000000'
    },
  [`&.${tableCellClasses.head}`]: {
    padding: 0,
    paddingLeft: small? 24: 40,
    height: '31px',
    backgroundColor: '#1A1E1B',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#3F5170',
    border: 'none',
    borderBottom: '1px solid #3C5141',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  [`&.${tableCellClasses.head}.firstColumn`]: {
    borderLeft: 'none',
    fontWeight: 300,

  },
  [`&.${tableCellClasses.body}`]: {
    padding: small? '0px 20px': '0px 40px',
    height: 84,
    fontFamily: 'Inter',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#3F5170',
    fontWeight: 300,

  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '& td': {
    border: 'none',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#151815'
  }
}))

const HistoryHome = styled('div')({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
})

const HistoryBox = styled('div')({
  margin: '0 auto',
  borderRadius: '20px',
  background: '#242926',
  textAlign: 'center',
  fontWeight: 600,
})

const HistoryTitle = styled('div')({
  fontSize: 24,
  color: '#A5FFBE',
  margin: 27
})

const LoadingView = styled(Loading)`
  margin: auto;
`
const LoadingContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export type RichBridgeMessage = {
  message: NFTBridgeMessage;
  status: MessageStatus;
  block: ethers.providers.Block;
};

export const statusToString = (status: number) => {
  /*
    UNCONFIRMED_L1_TO_L2_MESSAGE = 0,
    FAILED_L1_TO_L2_MESSAGE = 1,
    STATE_ROOT_NOT_PUBLISHED = 2,
    IN_CHALLENGE_PERIOD = 3,
    READY_FOR_RELAY = 4,
    RELAYED = 5
    */
  const statuses: { [key: number]: string } = {
    0: 'Unconfirmed Deposit',
    1: 'Failed Deposit',
    2: 'Awaiting state root',
    3: 'In challenge period',
    4: 'Ready for relay',
    5: 'Finalized',
  };
  if (status in statuses) {
    return statuses[status]!;
  } else {
    return 'Unknown';
  }
};

export const findNFT = (message:NFTBridgeMessage) =>{
  return nft.tokens.find((nft)=>{
    return (nft.l1.address.toLowerCase() === message.l1Token.toLowerCase() && nft.l2.address.toLowerCase() === message.l2Token.toLowerCase()) ||
        (nft.l1.address.toLowerCase() === message.l2Token.toLowerCase() && nft.l2.address.toLowerCase() === message.l1Token.toLowerCase())
  })
}

export default function History({ setAction }: {setAction: Dispatch<SetStateAction<boolean>>}) {
  const {library, account} = useActiveWeb3React()
  const [isHistoryDetailVisible, setIsHistoryDetailVisible] = useState(false)
  const [message, setMessage] = useState<RichBridgeMessage|undefined>()
  const [depositList, setDepositList] = useState<Array<RichBridgeMessage>>([])
  const [withdrawList, setWithdrawList] = useState<Array<RichBridgeMessage>>([])
  const [depositLoading, setDepositLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  const back = useCallback(() => setAction(false),[setAction])

  const messenger = useMessage()

  useEffect(()=>{
    if (!account) return
    setDepositLoading(true)
    setWithdrawLoading(true)
    messenger.getDepositsByAddress(account).then(async (result)=>{
      const deposits = await Promise.all(result.map(async (message)=>{
        const status = await messenger.getMessageStatus(message)
        const block = message.direction === MessageDirection.L1_TO_L2
            ? await defaultL1Provider.getBlock(message.blockNumber)
            : await defaultL2Provider.getBlock(message.blockNumber)
        return {message: message as NFTBridgeMessage, status, block}
      }))
      setDepositLoading(false)
      setDepositList(deposits)
    })
    messenger.getWithdrawalsByAddress(account).then(async (result)=>{
      const withdraws = await Promise.all(result.map(async (message)=>{
        const status = await messenger.getMessageStatus(message)
        const block = message.direction === MessageDirection.L1_TO_L2
            ? await defaultL1Provider.getBlock(message.blockNumber)
            : await defaultL2Provider.getBlock(message.blockNumber)
        return {message: message as NFTBridgeMessage, status, block}
      }))
      setWithdrawLoading(false)
      setWithdrawList(withdraws)
    })
  },[account, messenger])

  console.log('deposit', depositList)
  console.log('withdraw', withdrawList)

  const histories = useMemo(()=>{
    return withdrawList.concat(depositList)
  },[depositList, withdrawList])


  return (
    <>
    {isHistoryDetailVisible ? <HistoryDetail message={message} setAction={setIsHistoryDetailVisible}/> :
      <HistoryHome>
        <HistoryBox>
          <TableContainer sx={{ borderRadius: '12px', width: '100%', backgroundColor: '#1A1E1B',height: 465 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ height: 45 }}>
                <StyledTableCell className="firstColumn">Items</StyledTableCell>
                <StyledTableCell small>From</StyledTableCell>
                <StyledTableCell small>To</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            {(depositLoading || withdrawLoading) ? null:(
                <>{
                  histories.length === 0 ? null: (
                      <TableBody>
                        {histories.map((row, index)=>{
                          return (
                              <StyledTableRow key={index} onClick={() => {
                                setMessage(row)
                                setIsHistoryDetailVisible(true)
                              }}>
                                <StyledTableCell
                                    style={{
                                      width: 180,
                                      maxWidth: 180,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                >
                                  {findNFT(row.message)?.name}
                                  <Typography fontWeight={300}>#{row.message.tokenId.toString()}</Typography>
                                </StyledTableCell>
                                {row.message.direction === MessageDirection.L1_TO_L2? (
                                    <>
                                      <StyledTableCell small>
                                        <img
                                            src={FromLogo}
                                            alt=''
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell small>
                                        <img
                                            src={ToLogo}
                                            alt=''
                                        />
                                      </StyledTableCell>
                                    </>
                                ):(
                                    <>
                                      <StyledTableCell small>
                                        <img
                                            src={ToLogo}
                                            alt=''
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell small>
                                        <img
                                            src={FromLogo}
                                            alt=''
                                        />
                                      </StyledTableCell>
                                    </>
                                )}

                                <StyledTableCell style={{width:350,padding: '0 20px'}}>
                                  {moment.unix(row?.block?.timestamp).fromNow()}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.status === MessageStatus.READY_FOR_RELAY ? (<Button onClick={(e)=>{
                                    e.stopPropagation()
                                    messenger.finalizeMessage(row.message, {signer: library.getSigner()})
                                  }
                                  }>Claim</Button>):statusToString(row.status)}
                                </StyledTableCell>
                              </StyledTableRow>
                          )
                        })}
                      </TableBody>
                  )
                }</>

            )}
          </Table>
            {(depositLoading || withdrawLoading)? (
                <LoadingContainer>
                  <LoadingView />
                </LoadingContainer>
            ): histories.length === 0 ? (<LoadingContainer><Typography>NO HISTORY</Typography></LoadingContainer>): null}
        </TableContainer>
        </HistoryBox>
      </HistoryHome>}
    </>
  )
}
