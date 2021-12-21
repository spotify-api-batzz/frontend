export interface AlbumByAlbumId {
  name: string;
  createdAt: Date;
  thumbnails: NodeWrapper<ThumbnailNode>;
}

export interface ArtistByArtistId {
  name: string;
}

export type RecentListenDataByRecentListenId = NodeWrapper<RecentListenedData>;

export type NodeWrapper<T> = { nodes: T[] };

interface Meta {
  pageInfo: PageInfo;
  totalCount: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
  endCursor: string;
}

export interface SongNode {
  name: string;
  id: string;
  albumByAlbumId: AlbumByAlbumId;
  artistByArtistId: ArtistByArtistId;
}

export interface ThumbnailNode {
  url: string;
  width: number;
  height: number;
}

export interface UserNode {
  id: string;
  username: string;
}

export interface RecentListensNode {
  recentListenDataByRecentListenId: RecentListenDataByRecentListenId;
  userByUserId: UserByUserId;
}

export interface Songs {
  allSongs: NodeWrapper<SongNode> & Meta;
}

export interface Users {
  allUsers: NodeWrapper<UserNode> & Meta;
}

export interface RecentListens {
  allRecentListens: NodeWrapper<RecentListensNode> & Meta;
}

export interface UserByUserId {
  username: string;
}

export interface RecentListenedData {
  songBySongId: SongNode;
  playedAt: Date;
}
