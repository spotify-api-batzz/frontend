import { Endpoints } from "types";

interface EndpointInformation {
  columns: string[];
  endpoint: Endpoints;
}

const timestamps = ["createdAt", "updatedAt"];

export const songs: EndpointInformation = {
  endpoint: Endpoints.songs,
  columns: ["id", "name", ...timestamps],
};

export const albums: EndpointInformation = {
  endpoint: Endpoints.albums,
  columns: ["id", "name", "spotifyId", ...timestamps],
};

export const artists: EndpointInformation = {
  endpoint: Endpoints.artists,
  columns: ["id", "name", "spotifyId", ...timestamps],
};

// export const Thumbnails: DBTable = {
//   endpoint: Endpoints.thumbnails,
//   columns: ["id", "name", "spotifyId", ...timestamps],
// };

export const allEndpoints = [songs, albums, artists];
