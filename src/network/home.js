import { request } from './request'

//搜索
export function search(keywords, offset, limit) {
  return request({
    url: '/search',
    params: {
      keywords, offset, limit
    }
  })
}
//获取音乐url
export function songUrl(id){
  return request({
    url:'/song/url',
    params:{
      id
    }
  })
}
//音乐是否可用
export function checkMusic(id){
  return request({
    url:'/check/music',
    params:{
      id
    }
  })
}
//歌曲评论
export function commentMusic(id,limit,offset){
  return request({
    url:'/check/music',
    params:{
      id,limit,offset
    }
  })
}
//获取MV数据
export function mvDetail(mvid){
  return request({
    url:'/mv/detail',
    params:{
      mvid
    }
  })
} 