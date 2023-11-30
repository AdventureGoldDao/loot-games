import { useState, useEffect } from 'react';
import http from 'utils/http'
import axios from "axios";
import env from '../env';

export const queryGameList = (chainType, pageNo, pageSize, order) => {
  return http.get(`/games`, { chainType, pageNo, pageSize, order })
}
export const queryGameRecommend = ( recommend, pageNo, pageSize) => {
  return http.get(`/games`, { recommend, pageNo, pageSize })
}
export const queryNFTList = (chainType, recommend, pageNo, pageSize) => {
  return http.get(`/games/collections`, { chainType, recommend, pageNo, pageSize })
}
export const queryGameNFT = (gameId, pageNo, pageSize) => {
  return http.get(`/games/${gameId}/collections`, { pageNo, pageSize })
}
export const queryGameDetial = (gameId) => {
  return http.get(`/games/${gameId}`)
}
export const queryTweetList = async (userId) => {
  try {
    let res = await axios.get(`${env.API_URL}/twitter/users/${userId}/tweets?media.fields=preview_image_url,url&tweet.fields=created_at,attachments&expansions=attachments.media_keys`)
    return res.data
  } catch (error) {
  }

}
export const queryTweetUser = async (userId) => {
  try {
    let res = await axios.get(`${env.API_URL}/twitter/users/${userId}?user.fields=profile_image_url`)
    return res.data.data
  } catch (error) {
    console.log(error);
  }
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
      return str.includes('<category><![CDATA[news]]></category>')
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
export const getMediumGuide = () => {
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
      return str.includes('<category><![CDATA[loot-chain-guide]]></category>')
    })
    // console.log(gamesArr);
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