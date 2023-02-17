import { address } from "./Keys";

export const URL = {
  postLogin: `http://${address}:8000/api/v1/auth/login`,
  postTestVideo: `http://${address}:8000/api/v1/test/video/path/`,
  postVideo: `http://${address}:8000/api/v1/video/path/`,
  postVideoTitle: `http://${address}:8000/api/v1/video`,
  postComment: `http://${address}:8000/api/v1/video/comment`,
  putUserId: `http://${address}:8000/api/v1/video`,
  putLike: `http://${address}:8000/api/v1/like`,
  getMyFeeds: `http://${address}:8000/api/v1/user/feed/`,
  getAllFeeds: `http://${address}:8000/api/v1/video/list`,
  getDetailFeed: `http://${address}:8000/api/v1/video/detail/`,
  getSearchFeeds: `http://${address}:8000/api/v1/search/video`,
  eventSource: `http://${address}:8081/video/sse`,
}