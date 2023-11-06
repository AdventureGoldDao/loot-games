import { useState, useEffect } from 'react';
import http from 'utils/http'


export const queryGameList= (chainType, recommend, pageNo, pageSize) => {
  return http.get(`/games`, {chainType, recommend, pageNo, pageSize })
}
export const queryNFTList= (chainType, recommend, pageNo, pageSize) => {
  return http.get(`/games/collections`, {chainType, recommend, pageNo, pageSize })
}
export const queryGameNFT= (gameId, pageNo, pageSize) => {
  return http.get(`/games/${gameId}/collections`, { pageNo, pageSize })
}
export const queryGameDetial= (gameId) => {
  return http.get(`/games/${gameId}`)
}