import { useState, useEffect } from 'react';
import { message } from "@mui/material";
import axios from "axios";

import { getSign } from 'utils/txSign';
import http from 'utils/http'
import env from '../env';
import { getChainType } from "web3/address";
import { celebrityList } from 'utils/twitterList';

export const postActivity = (library, account, content, permission, image) => {
  let formData = new FormData();
  formData.append('content', content)
  formData.append('permission', permission)
  if (image) {
    formData.append('image', image)
    formData.append('preview', image)
  }
  return http.post('/activities', formData, { library, account, forceSign: true });
}

export const postComment = (library, account, content, id, replyTo) => {
  let formData = new FormData();
  formData.append('content', content)
  if (replyTo) {
    formData.append('replyTo', replyTo)
  }
  return http.post(`/activities/${id}/comments`, formData, { library, account, forceSign: true });
}

export const useActivities = (pageNo, pageSize, force, { follower, creator, liker, sort, topic, home }, setLoading) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(1)

  const getMediaUrl = (id, media) => {
    const obj = media.find(item => {
      return item.media_key === id;
    });
    return obj.url || obj.preview_image_url;
  }

  const mergeAndSort = (arr) => {
    setList(old => {
      let index = arr.findIndex(item => {
        return item.createTime < old[old.length - 1].createTime
      });
      let newArr;
      let storageArr;
      if (index === -1) {
        newArr = old.concat(arr);
        storageArr = [];
      } else {
        newArr = old.concat(arr.slice(0, index));
        storageArr = arr.slice(index);
      }
      newArr.sort((a, b) => {
        return b.createTime - a.createTime;
      });
      window.sessionStorage.setItem('twitterList', JSON.stringify(storageArr));
      return newArr;
    })
  }

  const queryTwitter = () => {
    const arr = [];
    let l = celebrityList.length;
    celebrityList.forEach(item => {
      axios.get(`${env.API_URL}/twitter/users/${item.id}/tweets?expansions=attachments.media_keys&tweet.fields=created_at&media.fields=url,preview_image_url&exclude=replies`).then(res => {
        if (res.status === 200) {
          const data = res.data;
          data.data.forEach(cell => {
            const obj = {
              creator: item.address,
              creatorAvatar: item.image,
              creatorName: item.name,
              creatorUniqueName: item.uniqueName,
              createTime: new Date(cell.created_at).getTime()/1000,
              id: cell.id,
              content: cell.text,
              twitter: true
            };
            if (cell.attachments) {
              obj.image = getMediaUrl(cell.attachments.media_keys[0], data.includes.media);
            }
            arr.push(obj);
          })
        }
      }).finally(() => {
        l--;
        if (l <= 0) {
          arr.sort((a, b) => {
            return b.createTime - a.createTime;
          });
          mergeAndSort(arr);
        }
      })
    })
  }

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get('/activities', { pageNo, pageSize, follower, creator, liker, sort, topic }).then(res => {
      if (pageNo === 1) {
        setList(res.activities);
        if (home) {
          window.sessionStorage.removeItem('twitterList');
          queryTwitter();
        }
      } else {
        setList(oldList => [...oldList, ...res.activities]);
        if (home) {
          let twitterList = window.sessionStorage.getItem('twitterList');
          if (twitterList) {
            twitterList = JSON.parse(twitterList);
            if (twitterList.length > 0) {
              mergeAndSort(twitterList)
            }
          }
        }
      }
      
      setTotal(res.totalCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    queryData()
  }, [pageNo, pageSize, force, follower, creator, liker, sort,topic])

  return { list, total }
}

export const useComments = (id, pageNo, pageSize, parentCommentId, force) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(1)
  const queryData = () => {
    http.get(`/activities/${id}/comments`, { pageNo, pageSize, parentCommentId })
      .then(res => {
        if (pageNo === 1) {
          setList(res.list)
        } else {
          setList(oldList => [...oldList, ...res.list])
        }
        setTotal(res.totalCount)
      })
  }

  useEffect(() => {
    queryData()
  }, [id, pageNo, pageSize, parentCommentId, force])

  return { list, total }
}

export const deleteActivity = (activityId) => {
  return http.delete(`/activities/${activityId}`);
}

export const likeActivity = (library, account, activityId) => {
  return http.post(`/activities/${activityId}/like`, undefined, { library, account, forceSign: true })
}

export const unlikeActivity = (library, account, activityId) => {
  return http.delete(`/activities/${activityId}/like`, undefined, { library, account, forceSign: true })
}

export const getActivity = (activityId) => {
  return http.get(`/activities/${activityId}`);
}

export const likeComment = (library, account, activityId, commentId) => {
  return http.post(`/activities/${activityId}/comments/${commentId}/like`, undefined, { library, account, forceSign: true })
}

export const unlikeComment = (library, account, activityId, commentId) => {
  return http.delete(`/activities/${activityId}/comments/${commentId}/like`, undefined, { library, account, forceSign: true })
}

export const deleteComment = (activityId, commentId) => {
  return http.delete(`/activities/${activityId}/comments/${commentId}`);
}

export const useRecommendArtists = (pageNo, pageSize,setLoading) => {
  const [randomArtistList, setRandomArtistList] = useState([])

  const queryData = () => {
    setLoading(true)
    http.get(`/artists/recommend`, { pageNo, pageSize })
      .then(res => {
        setRandomArtistList(res.artists)
      setLoading(false)

      })
  }

  useEffect(() => {
    queryData()
  }, [pageNo, pageSize])

  return { randomArtistList }
}

export const followArtist = async (artistAddress) => {
  return http.post(`/artists/${artistAddress}/follow`)
}

export const unfollowArtist = async (artistAddress) => {
  return http.delete(`/artists/${artistAddress}/follow`)
}
export const getBannerList = async () => {
  return http.get(`/banners`)
}

export const getMedium = () => {
  return axios.get(`${env.API_URL}/medium/feed/@defineplatform`).then(res => {
    const itemArr = [];
    const objArr = [];
    res.data.replace(/<item>[\s\S]*?<\/item>/g, word => {
      itemArr.push(word);
      return word;
    })
    itemArr.forEach(cell => {
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

