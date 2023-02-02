const ip = 'localhost';

export const URL = {
  postLogin: `http://${ip}:8080/api/v1/auth/login`,
  postVideo: `http://${ip}:8081/api/v1/auth/video`,
  putLike: `http://${ip}:8082/api/v1/like`,
  getMyFeeds: `http://${ip}:8080/api/v1/user/feed/1`,
  getAllFeeds: `http://${ip}:8900/api/v1/video`,
  getSearchFeeds: `http://${ip}:8083/api/v1/search/video`
}