import {
  request
} from './request'

//搜索
export function search(keywords, offset, limit) {
  return request({
    url: '/search',
    params: {
      keywords,
      offset,
      limit

    }
  })
}

//获取音乐完整信息
// export function getMusic(id) {
//   return request.all([
//     request({
//       url: '/song/url',
//       params: {
//         id
//       }
//     }),
//     request({
//       url: '/song/detail',
//       params: {
//         ids: id
//       }
//     }),
//     request({
//       url: '/lyric',
//       params: {
//         id
//       }
//     })
//   ])
// }

//获取音乐url
export function songUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
//获取音乐详情
export function songDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
//获取歌词
export function lyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

//歌曲评论
export function commentMusic(id, limit, offset) {
  return request({
    url: '/check/music',
    params: {
      id,
      limit,
      offset
    }
  })
}
//获取MV数据
export function mvDetail(mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}