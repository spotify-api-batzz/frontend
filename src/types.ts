export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export enum Endpoints {
  songs = "songs",
  albums = "albums",
  artists = "artists",
  thumbnails = "thumbnails",
  users = "users",
  recentListens = "recentListens",
  topSongs = "topSongs",
  topArtists = "topArtists",
}

export enum timePeriods {
  short = "short",
  medium = "medium",
  long = "long",
}

export type TimePeriods = timePeriods;

export interface EndpointResponses {
  songs: Songs;
  albums: {};
  artists: {};
  thumbnails: {};
  recentListens: RecentListens;
  topSongs: TopSongs;
  topArtists: TopArtists;
  users: Users;
}

export interface AlbumsEndpoint {
  name: string;
  artist?: ArtistsEndpoint;
  thumbnails?: ThumbnailsEndpoint[];
}

export interface ArtistsEndpoint {
  name: string;
  thumbnails?: ThumbnailsEndpoint[];
}

export interface ThumbnailsEndpoint {
  nodes: {
    url: string;
  }[];
}

export interface APIJoin {
  base: Endpoints;
  join?: Endpoints[];
}

export interface FetchAPIOptions {
  joins: APIJoin[];
}

export interface Album {
  name: string;
  createdAt: Date;
  thumbnails: NodeWrapper<ThumbnailNode>;
}

export interface Artist {
  name: string;
  id: string;
  thumbnails: NodeWrapper<ThumbnailNode>;
}

export type NodeWrapper<T> = { nodes: T[] };

export interface Meta {
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
  album: Album;
  artist: Artist;
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
  song: SongNode;
  playedAt: Date;
  user: User;
  id: string;
}

export interface TopSongsNode {
  id: string;
  createdAt: Date;
  user: User;
  topSongData: NodeWrapper<TopSongData>;
}

export interface TopArtistsNode {
  id: string;
  createdAt: Date;
  user: User;
  topArtistData: NodeWrapper<TopArtistData>;
}

export interface Songs {
  songs: NodeWrapper<SongNode> & Meta;
}

export interface Users {
  users: NodeWrapper<UserNode> & Meta;
}

export interface TopSongs {
  topSongs: NodeWrapper<TopSongsNode>;
}

export interface TopArtists {
  topArtists: NodeWrapper<TopArtistsNode>;
}

export interface RecentListens {
  recentListens: NodeWrapper<RecentListensNode> & Meta;
}

export interface User {
  username: string;
}

export interface Song {
  name: string;
  id: string;
  album?: Album;
  artist?: Artist;
}

export interface TopSongData {
  order: number;
  id: string;
  song: Song;
}

export interface TopArtistData {
  order: number;
  id: string;
  artist: Artist;
}
