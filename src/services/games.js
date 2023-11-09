import { useState, useEffect } from 'react';
import http from 'utils/http'
import axios from "axios";
import env from '../env';

export const queryGameList= (chainType, recommend, pageNo, pageSize,order) => {
  return http.get(`/games`, {chainType, recommend, pageNo, pageSize,order })
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
export const getMedium = () => {
  return axios.get(`${env.API_URL}/medium/feed/@aglddao`).then(res => {
    const itemArr = [];
    const objArr = [];
    // const gamesArr = [];
    res.data.replace(/<item>[\s\S]*?<\/item>/g, word => {
      itemArr.push(word);
      return word;
    })
    let gamesArr = itemArr.filter(item => {
      //  return item.include(/<category><![CDATA[ loot-nft ]]></category>/)
      let str = item.toString()
       return str.includes('<category><![CDATA[blockchain]]></category>')
    })
    gamesArr.forEach(cell => {
      const obj = {};
      cell.replace(/<content:encoded><!\[CDATA\[<h3>[\s\S]*?<\/h3>/, word => {
        obj.title = word.replace('<content:encoded><![CDATA[<h3>', '').replace('</h3>', '').trim();
        return word;
      })
      if (!obj.title) {
        cell.replace(/<title>[\s\S]*?<\/title>/, word => {
          obj.title = word.replace('<title><![CDATA[', '').replace(']]></title>', '').trim();
          return word;
        })
      }
      cell.replace(/<guid isPermaLink="false">[\s\S]*?<\/guid>/, word => {
        obj.link = word.replace('<guid isPermaLink="false">', '').replace('</guid>', '').trim();
        return word;
      })
      cell.replace(/<img alt="" src="[\s\S]*? \/>/, word => {
        obj.img = word.replace('<img alt="" src="', '').replace('" />', '').trim();
        return word;
      })
      cell.replace(/<p>[\s\S]*?<\/p>/, word => {
        obj.content = word.replace('<p>', '').replace('</p>', '').trim();
        return word;
      })

      objArr.push(obj)
    })

    return objArr;
  })
}