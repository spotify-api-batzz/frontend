import { ThumbnailNode } from "graphql/types";
import { APIJoin, ThumbnailsEndpoint } from "types";

export const smallestThumbnail = (thumbnails: ThumbnailNode[]) => {
  let chosen = thumbnails[0];
  for (let thumbnail of thumbnails) {
    if (thumbnail.height > chosen.height) {
      chosen = thumbnail;
    }
  }
  return chosen;
};
