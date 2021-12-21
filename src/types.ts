import { RecentListens, Songs, Users } from "graphql/types";

export enum Endpoints {
  songs = "songs",
  albums = "albums",
  artists = "artists",
  thumbnails = "thumbnails",
  users = "users",
  recentListens = "recentListens",
}

export interface EndpointTypes {
  songs: Songs;
  albums: {};
  artists: {};
  thumbnails: {};
  recentListens: RecentListens;
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
