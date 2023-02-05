import { address } from "./Keys";

export const URL = {
  postLogin: `http://${address}:8000/api/v1/auth/login`,
  postVideo: `http://${address}:8000/api/v1/video/path`,
  postVideoTitle: `http://${address}:8000/api/v1/video`,
  putLike: `http://${address}:8000/api/v1/like`,
  getMyFeeds: `http://${address}:8000/api/v1/user/feed/`,
  getAllFeeds: `http://${address}:8000/api/v1/video/list`,
  getDetailFeed: `http://${address}:8000/api/v1/video/detail/`,
  getSearchFeeds: `http://${address}:8000/api/v1/search/video`
}