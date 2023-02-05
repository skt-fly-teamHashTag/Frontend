const ip = '52.78.34.240';

export const URL = {
  postLogin: `http://${ip}:8000/api/v1/auth/login`,
  postVideo: `http://${ip}:8000/api/v1/video/path`,
  postVideoTitle: `http://${ip}:8000/api/v1/video`,
  putLike: `http://${ip}:8000/api/v1/like`,
  getMyFeeds: `http://${ip}:8000/api/v1/user/feed/`,
  getAllFeeds: `http://${ip}:8000/api/v1/video/list`,
  getDetailFeed: `http://${ip}:8000/api/v1/video/detail/`,
  getSearchFeeds: `http://${ip}:8000/api/v1/search/video`
}